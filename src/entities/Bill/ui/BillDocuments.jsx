import { DocumentSharingCard } from 'entities/Bill';

const BillDocuments = ({ bill }) => {
	if (bill.status === 'needToPay')
		return (
			<>
				<DocumentSharingCard name="Счет" />
				<DocumentSharingCard name="Реализация" />
			</>
		);

	if (bill.status === 'paid')
		return (
			<>
				<DocumentSharingCard name="Счет" />
				<DocumentSharingCard name="Реализация" />
				<DocumentSharingCard
					name="Акт выполненных услуг"
					sx={{
						backgroundColor: 'success.dark',
						color: 'success.contrastText',
					}}
				/>
			</>
		);

	if (bill.status === 'processing')
		return (
			<>
				<DocumentSharingCard name="Счет" />
				<DocumentSharingCard name="Реализация" />
				<DocumentSharingCard name="Акт выполненных услуг" />
			</>
		);

	if (bill.status === 'completed')
		return (
			<>
				<DocumentSharingCard name="Счет" />
				<DocumentSharingCard name="Реализация" />
				<DocumentSharingCard name="Акт выполненных услуг" />
			</>
		);
};

export default BillDocuments;
