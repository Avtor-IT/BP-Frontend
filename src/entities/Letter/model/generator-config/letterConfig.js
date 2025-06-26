export const letter = {
	title: 'Обращение',
	fields: {
		topic: {
			label: 'Тема',
			type: 'text',
			required: true,
			validation: {
				required: 'Тема письма обязательна',
			},
		},
		text: {
			label: 'Текст письма',
			type: 'text',
			required: true,
			multiline: true,
			rows: 12,
			validation: {
				required: 'Содержимое письма обязательно',
			},
		},
	},
};
