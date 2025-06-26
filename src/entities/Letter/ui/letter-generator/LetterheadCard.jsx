import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import ArrowIcon from 'shared/icons/Arrow';
import DocumentIcon from 'shared/icons/Document';
import { useMaxWidth } from 'shared/model';
import { AppRoutes, createRoute } from 'shared/router';
import { CircledTitle } from 'shared/ui/CircledTitle';

const LetterheadCard = ({ ...props }) => {
	const breakpoints = useMaxWidth();

	return (
		<Card
			{...props}
			sx={{
				gap: breakpoints.lg ? 0 : undefined,
				paddingBlock: breakpoints.lg ? 2 : undefined,
				position: 'relative',
				...props.sx,
			}}
		>
			<CardHeader
				action={
					breakpoints.lg ? (
						<ArrowIcon
							sx={{
								position: 'absolute',
								right: 16,
								top: '50%',
								transform: 'translateY(-50%)',
							}}
						/>
					) : undefined
				}
				title={
					<CircledTitle
						title={
							<>
								Заполнить{breakpoints.lg ? ' ' : <br />}
								фирменный блaнк
							</>
						}
						color="primary.light"
					/>
				}
				slotProps={{
					title: {
						variant: breakpoints.lg ? 'M20' : 'M24',
					},
				}}
				sx={{ paddingInline: breakpoints.lg ? 2 : undefined }}
			/>

			<CardContent
				sx={{
					flexGrow: 1,
					display: 'flex',
					alignItems: breakpoints.lg ? 'start' : 'center',
					justifyContent: 'end',
					flexDirection: 'column',
					gap: 6,
					paddingInline: breakpoints.lg ? 2 : undefined,
				}}
			>
				{breakpoints.lg ? (
					<Typography
						component={Link}
						variant="L16"
						to={createRoute(AppRoutes.LETTER)}
						color="textSecondary.default"
					>
						История
					</Typography>
				) : (
					<>
						<DocumentIcon
							color="tertiary"
							sx={{
								width: 232,
								height: 232,
							}}
							strokeWidth="0.5"
						/>
						<Stack
							alignItems="center"
							gap={2}
						>
							<Button
								component={Link}
								to={createRoute(AppRoutes.LETTER)}
								variant="outlined"
								color="tertriary"
								sx={{
									borderWidth: '2px',
									borderRadius: '16px',
									boxShadow:
										'0 1px 2px 0 #00000010, 0 0px 3px 1px #0000001F',
									paddingInline: 3,
									paddingBlock: 2,
								}}
							>
								<Typography
									variant="M20"
									color="textSecondary"
								>
									Заполнить бланк
								</Typography>
							</Button>
							<Link to={createRoute(AppRoutes.LETTER)}>
								История
							</Link>
						</Stack>
					</>
				)}
			</CardContent>
		</Card>
	);
};

export default LetterheadCard;
