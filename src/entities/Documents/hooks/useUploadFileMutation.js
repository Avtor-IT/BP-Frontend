import { useMutation } from '@tanstack/react-query';
import uploadFile from '../api/uploadFile';

const useUploadFilesMutation = () =>
	useMutation({
		mutationFn: (files) =>
			Promise.allSettled(
				files.map((file) => uploadFile(file.name, file.content))
			),
		mutationKey: ['upload file'],
	});

export default useUploadFilesMutation;
