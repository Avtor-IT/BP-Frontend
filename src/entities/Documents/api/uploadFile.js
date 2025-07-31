import { api } from 'shared/api';
import { apiEndpoints } from 'shared/model';

const uploadFile = async (fileName, base64) => {
	// @FIXME: закомментил, чтобы работало хоть как то
	// const contentType = base64.split(';')[0].split(':')[1];
	// const fileContent = base64.split(',')[1];

	return await api.Post(apiEndpoints.UPLOAD_FILE, {
		fileName,
		fileContent: base64,
	});
};

export default uploadFile;
