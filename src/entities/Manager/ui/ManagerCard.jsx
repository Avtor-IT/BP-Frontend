import {
	Card,
	CardContent,
	CardHeader,
	IconButton,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material';
import CopyIcon from 'shared/icons/Copy';
import MailIcon from 'shared/icons/Mail';
import { formatPhoneNumber } from 'shared/lib';
import AvatarManager from 'shared/ui/AvatarManager';
import { CopyBtn } from 'shared/ui/Button';
import { ErrorCard } from 'shared/ui/Card';
import { useManager } from '../api/getManager';
import { createAdditioinalSx } from 'shared/mui';
import { useMaxWidth } from 'shared/model';
import ManagerActions from './ManagerActions';
import ManagerActionsMobile from './ManagerActions.mobile';

export const ManagerCard = ({ showPic = true, ...props }) => {
	const breakpoints = useMaxWidth();
	const { data: manager, isLoading, isError } = useManager();

	if (isLoading)
		return (
			<Skeleton
				variant="rounded"
				height="100%"
			/>
		);

	if (isError) return <ErrorCard text="Ошибка при загрузке менеджера" />;

	if (manager) {
		return (
			<Card
				{...props}
				sx={createAdditioinalSx(
					{
						gap: 2,
						paddingBottom: breakpoints.xxl
							? breakpoints.xl
								? '48px'
								: '16px'
							: undefined,
						position: 'relative',
						paddingTop: breakpoints.xl ? 3 : undefined,
					},
					props.sx
				)}
			>
				<CardHeader
					title="Мой менеджер"
					slotProps={{
						title: { variant: breakpoints.xl ? 'M20' : 'M24' },
					}}
					action={
						<IconButton>
							<Stack
								direction="row"
								alignItems="center"
								gap={0.5}
								color="primary.main"
							>
								<Typography variant="R16">3</Typography>
								<MailIcon fontSize="small" />
							</Stack>
						</IconButton>
					}
				/>

				<CardContent sx={{ height: '100%' }}>
					<Stack
						direction={breakpoints.xl ? 'column' : 'row'}
						gap={1}
						justifyContent="space-between"
						height="100%"
					>
						<Stack
							direction="row"
							gap={2}
							alignItems="center"
						>
							{showPic && (
								<AvatarManager
									src={manager['PERSONAL_PHOTO']}
								/>
							)}
							<Typography
								variant={breakpoints.xxxl ? 'R16' : 'M16'}
								sx={{
									lineHeight: '1.3',
									paddingBottom:
										breakpoints.xxxl && !breakpoints.xxl
											? '42px'
											: undefined,
								}}
							>
								{manager['LAST_NAME']}
								<br />
								{manager['NAME']}
								<br />
								{manager['SECOND_NAME']}
							</Typography>
						</Stack>

						<Stack
							justifyContent="end"
							alignItems="end"
							height="100%"
						>
							<Stack
								gap={2}
								alignItems="end"
								color="tertiary.main"
							>
								{manager['WORK_PHONE'] ? (
									<CopyBtn textToCopy={manager['WORK_PHONE']}>
										<Stack
											gap={1}
											alignItems="center"
											direction="row"
										>
											<Typography
												variant={
													breakpoints.xxxl
														? 'R16'
														: 'R20'
												}
												color={
													breakpoints.xxl
														? 'secondary.main'
														: undefined
												}
											>
												{formatPhoneNumber(
													manager['WORK_PHONE']
												)}
											</Typography>
											<CopyIcon strokeWidth={1.5} />
										</Stack>
									</CopyBtn>
								) : null}

								{!breakpoints.xxl && (
									<ManagerActions manager={manager} />
								)}
							</Stack>
						</Stack>
					</Stack>
				</CardContent>

				{breakpoints.xxl && <ManagerActionsMobile manager={manager} />}
			</Card>
		);
	}
};
