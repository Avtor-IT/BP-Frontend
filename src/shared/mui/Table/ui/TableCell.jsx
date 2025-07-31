import MTableCell from '@mui/material/TableCell';

const TableCell = (props) => {
	return (
		<MTableCell
			{...props}
			sx={{ paddingInline: 1, paddingBlock: 1, border: 'none' }}
		/>
	);
};

export default TableCell;
