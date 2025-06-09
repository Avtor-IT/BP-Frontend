import { Card, Stack, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';
import ExportIcon from 'shared/icons/Export';
import ImportIcon from 'shared/icons/Import';

const DocumentSharingCard = ({ name, ...props }) => {
	const theme = useTheme();
	const downXl = useMediaQuery(theme.breakpoints.down('xl'));

	const cardButtonStyles = {
		borderRadius: downXl ? 2 : undefined,
		padding: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 0,
	};

	return (
		<Card
			{...props}
			sx={{ ...cardButtonStyles, ...props.sx }}
		>
			<Typography variant={downXl ? 'M16' : 'M20'}>{name}</Typography>

			<Stack
				direction="row"
				gap={1}
			>
				<ExportIcon strokeWidth={1.5} />
				<ImportIcon strokeWidth={1.5} />
			</Stack>
		</Card>
	);
};

export default DocumentSharingCard;
