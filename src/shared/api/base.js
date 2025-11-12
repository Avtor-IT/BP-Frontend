import instance from './lib';

// Add urlParams config property
instance.interceptors.request.use((config) => {
	if (!config.url) {
		return config;
	}

	const currentUrl = new URL(config.url, config.baseURL);

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
	Get = async (url, config = {}) => {
		return instance
			.get(url, config)
			.then((response) => {
				return Promise.resolve(response.data);
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};

	Post = async (url, body, config = {}) => {
		return instance
			.post(url, body, config)
			.then((response) => {
				return Promise.resolve(response.data);
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};

	Delete = async (url, config = {}) => {
		return instance
			.delete(url, config)
			.then((response) => {
				return Promise.resolve(response);
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};

	GetBlob = async (url, config = {}) => {
		try {
			const response = await instance.get(url, {
				...config,
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

	getWebSocketUrl = async (uri, config = {}) => {
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

		return wsUrl.href;
	};

	WebSocket = async (uri, config = {}) => {
		return new WebSocket(await this.getWebSocketUrl(uri, config));
	};
}

const api = new Api();

export default api;
