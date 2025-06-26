import html2pdf from 'html2pdf.js';
import { generateHTML } from './generateHTML';

export const generatePdf = async (params) => {
	try {
		const htmlContent = generateHTML(params);

		const container = document.createElement('div');
		container.innerHTML = htmlContent;

		const pdfOptions = {
			margin: 0,
			filename: `${params.documentName || 'document'}.pdf`,
			image: { type: 'jpeg', quality: 0.99 },
			html2canvas: {
				scale: 2,
				useCORS: true,
				allowTaint: true,
			},
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
		};

		await html2pdf().from(container).set(pdfOptions).save();
	} catch (error) {
		console.error('Ошибка при генерации PDF:', error);
	}
};
