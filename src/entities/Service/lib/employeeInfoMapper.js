export const employeeInfoMapper = (employee) => ({
	...employee,
	passportNumber: employee.passport.number,
	passportMailAddress: employee.passport.mail_address,
	bank_detailsAccount_number: employee.bank_details.account_number,
});
