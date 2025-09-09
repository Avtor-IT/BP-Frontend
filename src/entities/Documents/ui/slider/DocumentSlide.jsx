import {
	Card,
	CardContent,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import ExportIcon from 'shared/icons/Export';
import ImportIcon from 'shared/icons/Import';

export const DocumentSlide = ({ document, onImport, ...props }) => (
	<Card
		{...props}
		sx={{ width: 190, height: 150, ...props.sx }}
	>
		<CardContent
			sx={{
				flexGrow: 1,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				color: 'textSecondary.default',
			}}
		>
			<Tooltip title={document.NAME}>
				<Typography
					variant="R16"
					sx={{
						display: '-webkit-box',
						WebkitLineClamp: 1,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{document.NAME}
				</Typography>
			</Tooltip>

			<Stack
				direction="row"
				justifyContent="end"
			>
				{/* <IconButton
					sx={{ p: 0.5 }}
					onClick={(e) => {
						e.stopPropagation(); // prevent sliding list
					}}
				>
					<ExportIcon strokeWidth={1.5} />
				</IconButton> */}
				<IconButton
					sx={{ p: 0.5 }}
					onClick={(e) => {
						e.stopPropagation(); // prevent sliding list
						onImport(document);
					}}
				>
					<ImportIcon strokeWidth={1.5} />
				</IconButton>
			</Stack>
		</CardContent>
	</Card>
);
