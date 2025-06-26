export const destination = {
	title: 'Адресат',
	fields: {
		documentName: {
			label: 'Название документа',
			type: 'text',
			required: true,
			validation: { required: 'Название обязательно для заполнения' },
		},
		accountingNo: {
			label: 'Номер письма для учета',
			type: 'text',
		},
		answerNo: {
			label: 'Номер письма на которое отвечаете',
			type: 'text',
		},
		// date: {
		// 	label: 'Дата письма',
		// 	type: 'text',
		// },
		destinationJob: {
			label: 'Должность',
			type: 'text',
		},
		destinationInitials: {
			label: 'ФИО',
			type: 'text',
			required: true,
			validation: { required: 'Инициалы обязательны для заполнения' },
		},
	},
};
