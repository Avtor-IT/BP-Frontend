export const generateHTML = (params) => {
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
	const indent = 1.25; // in cm

	const pageMargin = {
		top: 10,
		right: 10,
		bottom: 20,
		left: 15,
	};
	const pageWidth = '210mm';
	const pageHeight = '296mm';

	const headerHtml = `
        <div style="
            margin-top: ${pageMargin.top}mm; 
            margin-left: ${pageMargin.left}mm; 
            margin-right: ${pageMargin.right}mm; 
            text-align: right; 
            font-family: '${font}'; 
            font-size: ${fontSize}px; 
            line-height: 1.5;
            margin-bottom: 20px;
        ">
            <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                <img 
					src="${companyLogo}" 
					style="
						width: 100px; 
						height: 100px; 
						margin-left: -${pageMargin.left - pageMargin.top}mm;
					" />
                <div style="text-align: right;">
                    <strong>${companyName}</strong><br>
                    ${companyAddress}<br>
                    ${companyPhone}<br>
                    ${companyEmail}
                </div>
            </div>
        </div>
    `;

	const contentHtml = `
        <div style="
			flex-grow: 1;
            margin-left: ${pageMargin.left}mm; 
            margin-right: ${pageMargin.right}mm; 
            font-family: '${font}'; 
            font-size: ${fontSize}px; 
            line-height: ${lineSpacing}; 
            margin-bottom: 40px;
        ">
            <h1 style="
                text-align: center; 
                font-size: ${fontSize * 1.5}px; 
                margin-bottom: 20px;
                font-weight: bold;
            ">${topic}</h1>
            <p style="
                text-align: justify;
                text-indent: ${indent}cm;
                margin: 0;
            ">${text}</p>
        </div>
    `;

	const footerHtml = `
        <div style="
            margin-left: ${pageMargin.left}mm; 
            margin-right: ${pageMargin.right}mm; 
            margin-bottom: ${pageMargin.bottom}mm;
            text-align: left; 
            font-family: '${font}'; 
            font-size: ${fontSize}px; 
            line-height: 1.5;
            position: relative;
        ">
            <div style="
                display: flex; 
                width: 100%; 
                justify-content: space-between; 
                margin-bottom: 5px; 
                position: relative; 
                z-index: 2; 
                font-weight: bold;
            ">
                <strong>${personalPosition}</strong> 
                <strong>${personalInitials}</strong>
            </div>
            <div>${personalPhone}</div>

            <img 
                src='${signature}' 
                style="
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    left: 50%;
                    top: -10px;
                    transform: translateX(-50%);
                "
            />

            <img 
                src='${print}' 
                style="
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    right: calc(${pageMargin.right}mm - 40px);
                    top: 15px;
                    z-index: 0;
                "
            />
        </div>
    `;

	const fullHtml = `
        <div 
            class="generated-document" 
            style="
                margin: 0;
                padding: 0;
                font-family: '${font}', serif;
                font-size: ${fontSize}px;
                line-height: ${lineSpacing};
                box-sizing: border-box;
                width: ${pageWidth}; 
				min-height: ${pageHeight}; 
				display: flex;
				flex-direction: column;
            "
        >
            ${headerHtml}
            ${contentHtml}
            ${footerHtml}
        </div>
    `;

	return fullHtml;
};
