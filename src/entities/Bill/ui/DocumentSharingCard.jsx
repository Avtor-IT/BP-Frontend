import { Card, Typography } from '@mui/material';
import ImportIcon from 'shared/icons/Import';
import { useMaxWidth } from 'shared/model';

const DocumentSharingCard = ({ name, ...props }) => {
	const breakpoints = useMaxWidth();

	const cardButtonStyles = {
		borderRadius: breakpoints.xl ? 2 : undefined,
		padding: 2,
		paddingBlock: breakpoints.lg ? 1 : undefined,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 2,
	};

	return (
		<Card
			{...props}
			sx={{ ...cardButtonStyles, ...props.sx }}
		>
			<Typography variant={breakpoints.xl ? 'M16' : 'M20'}>
				{name}
			</Typography>

			<ImportIcon strokeWidth={1.5} />
		</Card>
	);
};

export default DocumentSharingCard;
