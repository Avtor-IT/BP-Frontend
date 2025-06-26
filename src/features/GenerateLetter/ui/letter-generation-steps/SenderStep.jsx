import {
	Card,
	CardHeader,
	Grid,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import CheckCircleIcon from 'shared/icons/CheckCircle';
import { ExpandIcon } from 'shared/icons/Expand';
import { ScrollBox } from 'shared/ui/Scrollable';
import cls from '../Input.module.scss';
import FormSection from './FormSection';

const backgrounds = [
	{ title: 'Название фона', id: 1 },
	{ title: 'Название фона', id: 2 },
	{ title: 'Название фона', id: 3 },
	{ title: 'Название фона', id: 4 },
	{ title: 'Название фона', id: 5 },
	{ title: 'Название фона', id: 6 },
	{ title: 'Название фона', id: 7 },
	{ title: 'Название фона', id: 8 },
	{ title: 'Название фона', id: 9 },
	{ title: 'Название фона', id: 10 },
];

const SenderStep = ({ config, ...props }) => {
	return (
		<Grid
			{...props}
			container
			columns={2}
			columnSpacing={2}
		>
			<Grid size={1}>
				<FormSection
					section={'sender'}
					config={config}
				/>
			</Grid>
			<Grid size={1}>
				<Stack
					gap={3}
					height="100%"
				>
					<Typography variant="M20">Фирменный бланк</Typography>
					<ScrollBox>
						{backgrounds.map((background) => (
							<Stack
								key={background.id}
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								gap={3}
							>
								<Card
									className={cls.letterInput}
									variant="card"
									sx={{
										borderRadius: 1,
										paddingBlock: 2,
										position: 'relative',
										minHeight: 70,
									}}
								>
									<CardHeader
										action={
											<IconButton sx={{ p: 0 }}>
												<ExpandIcon fontSize="small" />
											</IconButton>
										}
										title={background.title}
										sx={{ paddingInline: 2 }}
										slotProps={{
											title: {
												variant: 'M16',
											},
											action: {
												sx: {
													position: 'absolute',
													top: 8,
													right: 8,
												},
											},
										}}
									/>
								</Card>

								<IconButton>
									<CheckCircleIcon />
								</IconButton>
							</Stack>
						))}
					</ScrollBox>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default SenderStep;
