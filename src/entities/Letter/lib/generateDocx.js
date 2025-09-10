import {
	AlignmentType,
	Document,
	Footer,
	Header,
	HorizontalPositionRelativeFrom,
	ImageRun,
	Packer,
	PageOrientation,
	Paragraph,
	Table,
	TableBorders,
	TableCell,
	TableRow,
	TextRun,
	TextWrappingType,
	VerticalAlign,
	VerticalPositionRelativeFrom,
	WidthType,
} from 'docx';
import saveAs from 'file-saver';

const mmToEMU = (mm) => Math.round(mm * 36000);

const loadImage = async (url) => {
	const response = await fetch(url);
	const data = await response.arrayBuffer();
	const type = response.headers.get('Content-Type');

	return { data, type };
};

export const generateAndDownloadDocx = async ({ documentName, ...params }) => {
	const companyLogo = await loadImage(params.companyLogo);
	const signature = await loadImage(params.signature);
	const print = await loadImage(params.print);
	const docxBlob = await generateDocx({
		...params,
		companyLogo,
		signature,
		print,
	});
	saveAs(docxBlob, `${documentName}.docx`);
};

export const generateDocx = async (params) => {
	const {
		companyName,
		companyAddress,
		companyPhone,
		companyEmail,
		topic,
		text,
		personalPosition,
		personalInitials,
		personalPhone,
		companyLogo,
		signature,
		print,
	} = params;

	const font = 'Times New Roman';
	const fontSize = 14;
	const lineSpacing = 1.5;
	const indent = 1.25 * 567; // 1.25cm

	// margins
	const pageMargin = {
		top: 1134, // 20mm in tweepes (1mm = 56.7tweepes)
		right: 1134, // 20mm
		bottom: 1134, // 20mm
		left: 1134, // 20mm
		header: 720,
		footer: 720,
		gutter: 0,
	};

	const companyLogoImage = new ImageRun({
		data: companyLogo.data,
		type: companyLogo.type.split('/')[1],
		transformation: {
			width: 100,
			height: 100,
		},
		floating: {
			behindDocument: true,
			horizontalPosition: {
				offset: 3597 * 80, // 80mm
			},
			verticalPosition: {
				offset: 3597 * 80, // 80mm
			},
		},
	});

	const header = new Header({
		children: [
			new Paragraph({
				alignment: AlignmentType.RIGHT,
				spacing: { after: 720 },
				children: [
					...(companyLogoImage ? [companyLogoImage] : []),
					new TextRun({
						text: companyName,
						font,
						size: fontSize * 2,
						allCaps: true,
					}),
					new TextRun({
						text: companyAddress,
						font,
						size: fontSize * 2,
						break: 1,
					}),
					new TextRun({
						text: companyPhone,
						font,
						size: fontSize * 2,
						break: 1,
					}),
					new TextRun({
						text: companyEmail,
						font,
						size: fontSize * 2,
						break: 1,
					}),
				],
			}),
		],
	});

	const signatureImage = new ImageRun({
		data: signature.data,
		type: signature.type.split('/')[1],
		transformation: { width: 100, height: 100 },
	});

	const printImage = new ImageRun({
		data: print.data,
		type: print.type.split('/')[1],
		transformation: { width: 120, height: 120 },
		floating: {
			horizontalPosition: {
				offset: -mmToEMU(25),
				relative: HorizontalPositionRelativeFrom.RIGHT_MARGIN,
			},
			verticalPosition: {
				offset: mmToEMU(4),
				relative: VerticalPositionRelativeFrom.BOTTOM_MARGIN,
			},
			wrap: { type: TextWrappingType.NONE },
			zIndex: 0,
			behindDocument: true,
			allowOverlap: true,
		},
	});

	const footerTable = new Table({
		width: {
			size: 100,
			type: WidthType.PERCENTAGE,
		},
		alignment: AlignmentType.LEFT,
		borders: TableBorders.NONE,
		rows: [
			new TableRow({
				children: [
					new TableCell({
						width: { size: 40, type: WidthType.PERCENTAGE },
						verticalAlign: VerticalAlign.TOP,
						children: [
							new Paragraph({
								children: [
									new TextRun({
										text: personalPosition,
										font,
										size: fontSize * 2,
										bold: true,
									}),
								],
							}),
							new Paragraph({
								children: [
									new TextRun({
										text: personalPhone,
										font,
										size: fontSize * 2,
									}),
								],
							}),
						],
					}),

					new TableCell({
						width: { size: 20, type: WidthType.PERCENTAGE },
						verticalAlign: VerticalAlign.CENTER,
						children: [
							new Paragraph({
								children: [signatureImage],
								alignment: AlignmentType.CENTER,
							}),
						],
					}),

					new TableCell({
						width: { size: 40, type: WidthType.PERCENTAGE },
						verticalAlign: VerticalAlign.TOP,
						children: [
							new Paragraph({
								children: [
									new TextRun({
										text: personalInitials,
										font,
										size: fontSize * 2,
										bold: true,
									}),
								],
								alignment: AlignmentType.RIGHT,
							}),
						],
					}),
				],
			}),
		],
	});

	const footer = new Footer({
		children: [footerTable, new Paragraph({ children: [printImage] })],
	});

	const content = [
		new Paragraph({
			alignment: AlignmentType.CENTER,
			children: [
				new TextRun({
					text: topic,
					font,
					size: fontSize * 2,
					bold: true,
				}),
			],
			spacing: { after: 200 },
		}),
		new Paragraph({
			alignment: AlignmentType.JUSTIFIED,
			children: [new TextRun({ text, font, size: fontSize * 2 })],
			indent: { firstLine: indent },
			spacing: { line: lineSpacing * 240 }, // 240 tweepes per pk
		}),
	];

	const doc = new Document({
		sections: [
			{
				properties: {
					page: {
						margin: pageMargin,
						size: {
							orientation: PageOrientation.PORTRAIT,
						},
					},
				},
				headers: {
					default: header,
				},
				footers: {
					default: footer,
				},
				children: content,
			},
		],
	});

	return await Packer.toBlob(doc);
};
