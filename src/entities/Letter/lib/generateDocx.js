import {
	AlignmentType,
	Document,
	Footer,
	Header,
	ImageRun,
	Packer,
	PageOrientation,
	Paragraph,
	TabStopType,
	TextRun,
} from 'docx';
import saveAs from 'file-saver';

export const generateAndDownloadDocx = async ({ documentName, ...params }) => {
	const docxBlob = await generateDocx(params);

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
		date,
		companyLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Felis_silvestris_silvestris.jpg/500px-Felis_silvestris_silvestris.jpg',
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
		left: 1701, // 30mm
		header: 720,
		footer: 720,
		gutter: 0,
	};

	/* Company logo example */
	const response = await fetch(companyLogo);
	let imageBuffer = await response.arrayBuffer();
	let type = response.headers.get('Content-Type');

	const headerImage =
		imageBuffer &&
		new ImageRun({
			data: imageBuffer,
			type: type.split('/')[1],
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
					...(headerImage ? [headerImage] : []),
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

	const footer = new Footer({
		children: [
			new Paragraph({
				tabStops: [
					{
						type: TabStopType.RIGHT,
						position: 9072, // 160mm
					},
				],
				children: [
					new TextRun({
						text: personalPosition,
						font,
						size: fontSize * 2,
						bold: true,
					}),
					new TextRun({
						text: '\t',
					}),
					new TextRun({
						text: personalInitials,
						font,
						size: fontSize * 2,
						bold: true,
					}),
				],
				spacing: { after: 400 },
			}),

			new Paragraph({
				children: [
					new TextRun({
						text: personalPhone,
						font,
						size: fontSize * 2,
					}),
					new TextRun({
						text: date,
						font,
						size: fontSize * 2,
						break: 1,
					}),
				],
			}),
		],
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
			children: [new TextRun({ text: text, font, size: fontSize * 2 })],
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
