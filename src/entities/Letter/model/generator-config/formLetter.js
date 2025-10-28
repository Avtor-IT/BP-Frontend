export const letterToServer = (clientLetter) => {
	Object.entries(clientLetter).forEach(([section, sectionValues]) => {
		Object.entries(sectionValues).forEach(([key, value]) => {
			if (!value) {
				delete clientLetter[section][key];
			}
		});
	});

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
