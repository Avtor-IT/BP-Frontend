import { useQuery } from '@tanstack/react-query';

const getEmployeeById = async (id) => ({
	id,
	name: 'Иванов Иван',
	birthday: '1990-07-15',
	position: 'Бухгалтер',
	salary: 30000,
	hire_date: '2021-03-21',
	status: 'employed',
	marital_status: 'married',
	children: [
		{
			name: 'Иванова Мария',
			birthday: '2019-04-01',
		},
	],
	citizenship: 'russia',
	passport: {
		number: '1234567890',
		mail_address:
			'г.Санкт-Петербург, Проспект Просвещения 27, к 18г.Санкт-Петербург, Проспект ',
		download_pdf: 'https://...../passport.pdf',
	},
	livivng_adress: 'г.Санкт-Петербург, Проспект Просвещения 27, к 18',
	phone: '+7(999) 888-77-66',
	inn: '744565656512423',
	snils: '142-123-55-66',
	military_license_number: '46AB123123',
	bank_details: {
		BIC: '234567890',
		KPP: '12345678',
		account_number: '4178101213123232', // + another fields
	},
});

const useEmployeeById = (id) =>
	useQuery({
		queryFn: async () => await getEmployeeById(id),
		queryKey: ['employee by id', id],
	});

export default useEmployeeById;
