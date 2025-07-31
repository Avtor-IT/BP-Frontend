import { useMutation } from '@tanstack/react-query';
import { fileToBase64 } from '../lib/toBase64';

export const useFiletoBase64 = () =>
	useMutation({
		mutationFn: fileToBase64,
		mutationKey: ['file to base64 convert'],
	});
