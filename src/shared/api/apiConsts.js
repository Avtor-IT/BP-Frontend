/**
 * API config
 **/
const version = 'v1';

export const apiEndpoints = {
	STATUS: `/api/${version}/auth/status/`,
	ME: `/api/${version}/auth/users/me/`,
	JWT_CREATE: `/api/${version}/auth/jwt/create/`,
	JWT_VERIFY: `/api/${version}/auth/jwt/verify/`,
	JWT_REFRESH: `/api/${version}/auth/jwt/refresh/`,
	MANAGER: `/api/${version}/hooks/users_me_manager/`,
	COMPANIES: `/api/${version}/hooks/user_me_company/`,
	DOCUMENTS: `/api/${version}/hooks/user_company_documents/`,
	USER_SERVICES: `/api/user-service/check-expiration/`,
	DOWNLOAD_FILE: `/api/${version}/hooks/downloadfile/`,
	UPLOAD_FILE: `/api/${version}/hooks/upload_user_file/`,
	CHAT_ROOM: `chat/${version}/:b24_user_id/`,
	CHAT_MESSAGES: `chat/${version}/:chat_room_id/messages/`,
	CHAT_IMPORTANT_MESSAGES: `chat/${version}/messages/important/`,
	CHAT_LIST: `chat/${version}/my-chats/`,
	MARK_DONE: `chat/${version}/messages/:message_id/done/`,
	ROOM_WEBSOCKET: '/ws/chat/:chat_id/',
	LOGOS_LIST: `api/${version}/letters/logos/`,
	SIGNS_LIST: `api/${version}/letters/signatures/`,
	LETTERS_LIST: `/api/${version}/letters/my-letters/`,
	FACSIMILE_LIST: `api/${version}/letters/facsimile/`,
	CREATE_LETTER: `/api/${version}/letters/create/`,
};
