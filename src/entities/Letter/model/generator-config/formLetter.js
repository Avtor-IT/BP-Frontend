export const letterToServer = (clientLetter) => {
	return {
		title:
			clientLetter.destination.accountingNo ||
			clientLetter.destination.documentName,
		subject: clientLetter.letter.subject,
		address: clientLetter.sender.companyAddress,
		content: clientLetter,
		is_draft: false,
		signature: clientLetter.personal.signature,
		facsimile: clientLetter.personal.facsimile,
		logo: clientLetter.sender.companyLogo,
	};
};

export const letterToFields = (clientLetter) => {
	const result = {};

	Object.keys(clientLetter).forEach((section) => {
		Object.assign(result, clientLetter[section]);
	});

	return result;
};
