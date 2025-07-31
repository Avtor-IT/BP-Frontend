import { useMutation } from '@tanstack/react-query';
import uploadFile from '../api/uploadFile';

const useUploadFileMutation = () =>
	useMutation({
		mutationFn: async ({ name, base64 }) => await uploadFile(name, base64),
		mutationKey: ['upload file'],
	});

export default useUploadFileMutation;
