import { useMutation } from '@tanstack/react-query';
import { fileToBase64 } from 'shared/lib/file';

export const useFiletoBase64 = () =>
	useMutation({
		mutationFn: fileToBase64,
		mutationKey: ['file to base64 convert'],
	});
