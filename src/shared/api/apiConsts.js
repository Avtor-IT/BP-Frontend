/**
 * API config
 **/

export const apiEndpoints = {
	STATUS: `/api/auth/status/`,
	ME: `/api/auth/users/me/`,
	JWT_CREATE: `/api/auth/jwt/create/`,
	JWT_VERIFY: `/api/auth/jwt/verify/`,
	JWT_REFRESH: `/api/auth/jwt/refresh/`,
	MANAGER: `/api/hooks/users_me_manager/`,
	COMPANIES: `/api/hooks/user_me_company/`,
	DOCUMENTS: `/api/hooks/user_company_documents/`,
	USER_SERVICES: `/api/user-service/check-expiration/`,
	DOWNLOAD_FILE: `/api/hooks/downloadfile/` /* должны быть urlParams */,
	UPLOAD_FILE: `/api/hooks/upload_user_file/`,
	CHAT_ROOM: `/api/chat/:b24_user_id/` /* to edit */,
	CHAT_MESSAGES: `/api/chat/:chat_room_id/messages/ ` /* to edit */,
	CHAT_IMPORTANT_MESSAGES: `/api/chat/messages/important/` /* to edit */,
	CHAT_LIST: `/api/chat/my-chats/`,
	MANAGER_CHAT: `/api/chat/my-manager-chat/`,
	DEPARTMENT_CHAT: `/api/chat/chatrooms/department/:department_id/`,
	MARK_DONE: `/api/chat/messages/:message_id/done/`,
	ROOM_WEBSOCKET_DEPARTMENT: '/ws/chat/department/:chat_id/',
	ROOM_WEBSOCKET_MANAGER: '/ws/chat/manager/:chat_id/',
	LOGOS_LIST: `api/letters/logos/`,
	SIGNS_LIST: `api/letters/stamps/`,
	LETTERS_LIST: `/api/letters/my-letters/`,
	FACSIMILE_LIST: `api/letters/facsimile/`,
	CREATE_LETTER: `/api/letters/create/`,
	DELETE_LETTER: `/api/letters/:letter_id/`,
};
