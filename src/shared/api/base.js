import axios from 'axios';
import { apiEndpoints } from 'shared/model';

const url = {
	testing: 'https://intizar.pythonanywhere.com',
	broadcast: 'http://0.0.0.0:8000',
	local: 'http://127.0.0.1:8000',
	vps: 'http://5.35.82.235',
};

const instance = axios.create({
	baseURL: url.vps,
});

// Add urlParams config property
instance.interceptors.request.use((config) => {
	if (!config.url) {
		return config;
	}

	const currentUrl = new URL(config.url, config.baseURL);

	// @ts-ignore
	Object.entries(config.urlParams || {}).forEach(([k, v]) => {
		currentUrl.pathname = currentUrl.pathname.replace(
			`:${k}`,
			encodeURIComponent(v)
		);
	});

	const authPart =
		currentUrl.username && currentUrl.password
			? `${currentUrl.username}:${currentUrl.password}`
			: '';
	return {
		...config,
		baseURL: `${currentUrl.protocol}//${authPart}${currentUrl.host}`,
		url: currentUrl.pathname,
	};
});

class Api {
	_ACCESS_SESSIONSTORAGE = 'access';
	_REFRESH_SESSIONSTORAGE = 'refresh';

	_SessionAccessToken = () =>
		sessionStorage.getItem(this._ACCESS_SESSIONSTORAGE);
	_SessionRefreshToken = () =>
		sessionStorage.getItem(this._REFRESH_SESSIONSTORAGE);
	_UpdateSessionRefreshToken = (newToken) =>
		sessionStorage.setItem(this._ACCESS_SESSIONSTORAGE, newToken);
	_RemoveSession = () => {
		sessionStorage.removeItem(this._ACCESS_SESSIONSTORAGE);
		sessionStorage.removeItem(this._REFRESH_SESSIONSTORAGE);
	};

	_AuthHeader = () => ({
		Authorization: 'Bearer ' + this._SessionAccessToken(),
	});

	_CheckAccessToken = async () => {
		const access = this._SessionAccessToken();

		if (access) {
			await instance.post(`${apiEndpoints.JWT_VERIFY}`, {
				token: access,
			});
		}
	};

	_ProccessAccessToken = async () => {
		try {
			await this._CheckAccessToken();
		} catch (e) {
			if (e.response.status === 401 && this._SessionRefreshToken()) {
				return await this._ProccessRefreshToken();
			}

			this._RemoveSession();
			return Promise.reject(e);
		}
	};

	_ProccessRefreshToken = async () => {
		try {
			const response = await instance.post(
				`${apiEndpoints.JWT_REFRESH}`,
				{
					refresh: this._SessionRefreshToken(),
				}
			);
			this._UpdateSessionRefreshToken(response.data.access);

			return response.data;
		} catch (e) {
			this._RemoveSession();
			return Promise.reject(e);
		}
	};

	Get = async (url, config = {}) => {
		await this._ProccessAccessToken();

		return instance
			.get(url, {
				...config,
				headers: {
					...config.headers,
					...this._AuthHeader(),
				},
			})
			.then((response) => {
				return Promise.resolve(response.data);
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};

	Post = async (url, body, config = {}) => {
		await this._ProccessAccessToken();

		return instance
			.post(url, body, {
				...config,
				headers: {
					...config.headers,
					...this._AuthHeader(),
				},
			})
			.then((response) => {
				return Promise.resolve(response.data);
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};

	GetBlob = async (url, config = {}) => {
		try {
			const response = await instance.get(url, {
				...config,
				headers: {
					...config.headers,
					...this._AuthHeader(),
				},
				responseType: 'arraybuffer',
			});

			return new Blob([response.data], {
				type:
					response.headers['content-type'] ||
					'application/octet-stream',
			});
		} catch (e) {
			throw Error(e?.response?.data?.error || e);
		}
	};

	WebSocket = async (uri, config = {}) => {
		await this._ProccessAccessToken();

		const base = new URL(instance.defaults.baseURL);
		const protocol = base.protocol === 'https:' ? 'wss:' : 'ws:';

		let path = uri;
		// urlParams
		if (config.urlParams) {
			Object.entries(config.urlParams).forEach(([k, v]) => {
				path = path.replace(`:${k}`, encodeURIComponent(v));
			});
		}

		const wsUrl = new URL(path, `${protocol}//${base.host}`);
		wsUrl.searchParams.append('token', this._SessionAccessToken());

		return new WebSocket(wsUrl.href);
	};
}

const api = new Api();

export default api;
