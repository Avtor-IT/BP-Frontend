// src/lib/api.ts
import axios from 'axios';
import { apiEndpoints } from 'shared/model';

const STORAGE = {
	ACCESS: 'access',
	REFRESH: 'refresh',
};

const baseUrls = {
	ssl: 'https://xn--24-6kcduamh0cckkold.xn--p1ai',
};

const baseURL = baseUrls.ssl;

const instance = axios.create({ baseURL });

class AuthStorage {
	constructor(storage) {
		this.storage = storage;
	}
	getAccess = () => this.storage.getItem(STORAGE.ACCESS);
	getRefresh = () => this.storage.getItem(STORAGE.REFRESH);
	setAccess = (t) => this.storage.setItem(STORAGE.ACCESS, t);
	setRefresh = (t) => this.storage.setItem(STORAGE.REFRESH, t);
	setSession = (a, r) => {
		this.storage.setItem(STORAGE.ACCESS, a);
		this.storage.setItem(STORAGE.REFRESH, r);
	};
	clearSession = () => {
		this.storage.removeItem(STORAGE.ACCESS);
		this.storage.removeItem(STORAGE.REFRESH);
	};
	checkSession = () => {
		return Boolean(this.getAccess());
	};
}

export const authStorage = new AuthStorage(localStorage);

// single-flight refresh state
let isRefreshing = false;
let refreshPromise = null;
let subscribers = [];

export const subscribeToken = (cb) => {
	subscribers.push(cb);
};
const notifySubscribers = (token) => {
	subscribers.forEach((cb) => cb(token));
	subscribers = [];
};

// attach access token to requests
instance.interceptors.request.use((config) => {
	const access = authStorage.getAccess();
	if (access) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${access}`;
	}
	return config;
});

// helper to call refresh endpoint (uses raw axios to avoid interceptor loop)
const raw = axios.create({ baseURL });

const refreshToken = async () => {
	const refresh = authStorage.getRefresh();
	if (!refresh) throw new Error('No refresh token');

	if (isRefreshing && refreshPromise) return refreshPromise;

	isRefreshing = true;
	refreshPromise = raw
		.post(apiEndpoints.JWT_REFRESH, { refresh })
		.then((r) => {
			const newAccess = r.data.access;
			authStorage.setAccess(newAccess);
			notifySubscribers(newAccess);
			return newAccess;
		})
		.catch((err) => {
			authStorage.clearSession();
			notifySubscribers(null);
			throw err;
		})
		.finally(() => {
			isRefreshing = false;
			refreshPromise = null;
		});

	return refreshPromise;
};

// response interceptor: on 401 try refresh then retry original requests
instance.interceptors.response.use(
	(res) => res,
	async (error) => {
		const originalRequest = error.config;
		if (!originalRequest) return Promise.reject(error);

		const status = error.response?.status;

		// If 401 and not already retried
		if (status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const newToken = await (isRefreshing
					? refreshPromise
					: refreshToken());
				if (!newToken) throw new Error('Refresh failed');

				// set header and retry
				originalRequest.headers = originalRequest.headers ?? {};
				originalRequest.headers.Authorization = `Bearer ${newToken}`;
				return instance(originalRequest);
			} catch (e) {
				// refresh failed -> clear session and reject
				authStorage.clearSession();
				return Promise.reject(e);
			}
		}

		return Promise.reject(error);
	}
);

export default instance;
