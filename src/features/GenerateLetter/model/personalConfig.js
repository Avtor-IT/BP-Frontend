export const personal = {
	title: 'Личные данные',
	fields: {
		personalPosition: {
			label: 'Должность',
			type: 'text',
		},
		personalInitials: {
			label: 'ФИО',
			type: 'text',
			required: true,
			validation: {
				required: 'Инициалы обязательны',
			},
		},
		personalPhone: {
			label: 'Телефон',
			type: 'tel',
			validation: {
				pattern: {
					value: /^[+]?[\d\s()-]+$/,
					message: 'Некорректный формат телефона',
				},
			},
		},
		date: { label: 'Дата письма', type: 'text' },
	},
};
