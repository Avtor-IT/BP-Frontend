export const sender = {
	title: 'Данные компании',
	fields: {
		companyName: {
			label: 'Название организации или ИП',
			type: 'text',
			required: true,
			validation: {
				required: 'Название организации обязательно для заполнения',
			},
		},
		companyAddress: {
			label: 'Адрес регистрации юр. лица или ИП',
			type: 'text',
			required: true,
			validation: {
				required: 'Адрес обязателен для заполнения',
			},
		},
		companyPhone: {
			label: 'Телефон',
			type: 'tel',
			// required: true,
			validation: {
				// required: 'Телефон обязателен для заполнения',
				pattern: {
					value: /^[+]?[\d\s()-]+$/,
					message: 'Некорректный формат телефона',
				},
			},
		},
		companyEmail: {
			label: 'E-mail',
			type: 'email',
			// required: true,
			validation: {
				// required: 'E-mail обязателен для заполнения',
				pattern: {
					value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
					message: 'Некорректный формат e-mail',
				},
			},
		},
		inn: {
			label: 'ИНН',
			type: 'text',
			validation: {
				// required: 'ИНН обязателен для заполнения', // if required
				pattern: {
					value: /^\d{10}|\d{12}$/,
					message: 'ИНН должен содержать 10 или 12 цифр',
				},
			},
		},
		kpp: {
			label: 'КПП',
			type: 'text',
			required: false,
			validation: {
				pattern: {
					value: /^\d{9}$/,
					message: 'КПП должен содержать 9 цифр',
				},
			},
		},
	},
};
