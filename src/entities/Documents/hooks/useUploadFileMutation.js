import { useMutation } from '@tanstack/react-query';
import uploadFile from '../api/uploadFile';
import { fileToBase64, incrementFileName } from 'shared/lib/file';
import { isDuplicateFileError } from 'shared/api';

const useUploadFileMutation = () =>
	useMutation({
		mutationFn: async ({ name, base64 }) => {
			let currentName = name;

			while (true) {
				try {
					return await uploadFile(currentName, base64);
				} catch (error) {
					if (!isDuplicateFileError(error)) {
						throw error;
					}

					currentName = incrementFileName(currentName);
				}
			}
		},
		mutationKey: ['upload file'],
	});

export const usePrepareAndUploadFile = (mutationParams) => {
	const uploadFileMutation = useUploadFileMutation();

	return useMutation({
		mutationFn: async ({ rawFile }) => {
			const preparedFile = {
				name: rawFile.name,
				base64: await fileToBase64(rawFile),
			};

			return await uploadFileMutation.mutateAsync(preparedFile);
		},
		...mutationParams,
	});
};

export default useUploadFileMutation;
