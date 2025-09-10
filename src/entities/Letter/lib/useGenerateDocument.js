import { useMutation } from '@tanstack/react-query';
import { generateAndDownloadDocx } from './generateDocx';
import { generateHTML } from './generateHTML';
import { generatePdf } from './generatePdf';

export const useGenerateDocx = () =>
	useMutation({
		mutationFn: generateAndDownloadDocx,
		mutationKey: ['generate docx'],
	});

export const useGeneratePdf = () =>
	useMutation({
		mutationFn: generatePdf,
		mutationKey: ['generate pdf'],
	});

export const useGenerateHtml = () =>
	useMutation({
		mutationFn: generateHTML,
		mutationKey: ['generate html'],
	});
