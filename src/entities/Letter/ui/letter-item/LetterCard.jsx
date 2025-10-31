import {
	Card,
	CardContent,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Typography,
} from '@mui/material';
import { useGenerateDocx, useGeneratePdf } from '../../lib/useGenerateDocument';
import { letterToFields } from '../../model/generator-config/formLetter';
import { useState } from 'react';
import { CheckSquareIcon } from 'shared/icons/CheckSquare';
import { EditSquareIcon } from 'shared/icons/EditSqueare';
import ImportIcon from 'shared/icons/Import';
import { formatDate } from 'shared/lib';
import { useMaxWidth } from 'shared/model';

const iconSx = {
	position: 'absolute',
	top: 8,
	right: '50%',
	transform: 'translateX(50%)',
};

const getTypeTitle = (isDraft) => {
	if (isDraft)
		return (
			<Typography
				variant="M20"
				color="warning.main"
			>
				Черновик
			</Typography>
		);

	return (
		<Typography
			variant="M20"
			color="success.main"
		>
			Сформировано
		</Typography>
	);
};

const LetterCard = ({ letter, ...props }) => {
	const breakpoints = useMaxWidth();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const generateDocxMutation = useGenerateDocx();
	const generatePdfMutatoin = useGeneratePdf();
	const handlePdfGeneration = () => {
		generatePdfMutatoin.mutate(letterToFields(letter.content));
		handleClose();
	};
	const handleDocxGeneration = () => {
		generateDocxMutation.mutate(letterToFields(letter.content));
		handleClose();
	};

	return (
		<Card
			{...props}
			sx={{
				color: 'tertiary.dark',
				position: 'relative',
				...props.sx,
			}}
		>
			{/* {letter.is_draft ? (
				<EditSquareIcon
					color="warning"
					sx={iconSx}
				/>
			) : (
				<CheckSquareIcon
					color="success"
					sx={iconSx}
				/>
			)} */}

			<CardContent
				sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					gap={1}
				>
					<Typography
						variant={breakpoints.xl ? 'M16' : 'M20'}
						overflow="hidden"
						textOverflow="ellipsis"
						whiteSpace="nowrap"
						maxWidth={115}
					>
						{letter.title}
					</Typography>
					<Typography
						variant={breakpoints.xl ? 'M16' : 'M20'}
						overflow="hidden"
						textOverflow="ellipsis"
						whiteSpace="nowrap"
					>
						{formatDate(letter.timestamp)}
					</Typography>
				</Stack>

				<Stack gap={3}>
					<Stack gap={1}>
						<Stack
							direction="row"
							justifyContent="space-between"
							gap={2}
						>
							<Typography variant="R16">Тема:</Typography>
							<Typography
								variant={breakpoints.xl ? 'M12' : 'M16'}
								overflow="hidden"
								textOverflow="ellipsis"
								whiteSpace="nowrap"
							>
								{letter.subject}
							</Typography>
						</Stack>

						<Stack
							direction="row"
							justifyContent="space-between"
							gap={2}
						>
							<Typography variant="R16">Адресат:</Typography>
							<Typography
								variant={breakpoints.xl ? 'M12' : 'M16'}
								overflow="hidden"
								textOverflow="ellipsis"
								whiteSpace="nowrap"
							>
								{letter.address}
							</Typography>
						</Stack>
					</Stack>

					<Stack
						direction="row"
						justifyContent="space-between"
					>
						<Stack
							direction="row"
							gap={1}
						>
							<IconButton
								sx={{ p: 0 }}
								onClick={handleClick}
							>
								<ImportIcon strokeWidth={1.5} />
							</IconButton>

							<Menu
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
							>
								<MenuItem onClick={handleDocxGeneration}>
									DOCX
								</MenuItem>
								<MenuItem onClick={handlePdfGeneration}>
									PDF
								</MenuItem>
							</Menu>
						</Stack>
						{getTypeTitle(letter.is_draft)}
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default LetterCard;
