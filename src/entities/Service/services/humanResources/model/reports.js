export const groups = {
	OPERATIONS: 'Операции',
	ADDITIONAL: 'Дополнительно',
};

export const useHRReports = () => {
	return [
		{
			title: 'Приём на работу',
			group: 'OPERATIONS',
			action: function () {
				console.log(this);
			},
		},
		{
			title: 'Перевод',
			group: 'OPERATIONS',
			action: function () {
				console.log(this);
			},
		},
		{
			title: 'Увольнение',
			group: 'OPERATIONS',
			action: function () {
				console.log(this);
			},
		},
		{
			title: 'Удержание',
			group: 'OPERATIONS',
			action: function () {
				console.log(this);
			},
		},
		{
			title: 'Отпуск',
			group: 'OPERATIONS',
			action: function () {
				console.log(this);
			},
		},

		{
			title: 'Заказать 2НДФЛ',
			group: 'ADDITIONAL',
			action: function () {
				console.log(this);
			},
		},
		{
			title: 'Трудовые отношения',
			group: 'ADDITIONAL',
			action: function () {
				console.log(this);
			},
		},
	];
};

export const humanResourcesReferences = [{ title: 'Штатное расписание' }];
