import {
	Button,
	Card,
	CardContent,
	IconButton,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material';
import { useManager } from 'entities/Manager';
import { Link } from 'react-router-dom';
import { CallIcon } from 'shared/icons/Call';
import CopyIcon from 'shared/icons/Copy';
import MailIcon from 'shared/icons/Mail';
import MessageIcon from 'shared/icons/Message';
import { formatPhoneNumber } from 'shared/lib';
import { AppRoutes, RoutePath } from 'shared/router';
import AvatarManager from 'shared/ui/AvatarManager';
import { CopyBtn } from 'shared/ui/Button';
import { ErrorCard } from 'shared/ui/Card';

export const MyManager = ({ ...props }) => {
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
			<Card {...props}>
				<CardContent sx={{ height: '100%' }}>
					<Stack
						direction="row"
						justifyContent="space-between"
						height="100%"
					>
						<Stack
							justifyContent="space-between"
							height="100%"
						>
							<Typography variant="M24">Мой менеджер</Typography>

							<Stack
								direction="row"
								alignItems="center"
								gap={2}
							>
								<AvatarManager
									src={manager['PERSONAL_PHOTO']}
								/>
								<Typography
									variant="M16"
									style={{ lineHeight: '1.3' }}
								>
									{manager['LAST_NAME']}
									<br />
									{manager['NAME']}
									<br />
									{manager['SECOND_NAME']}
								</Typography>
							</Stack>
						</Stack>

						<Stack
							justifyContent="space-between"
							alignItems="end"
							height="100%"
						>
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
											<Typography variant="R20">
												{formatPhoneNumber(
													manager['WORK_PHONE']
												)}
											</Typography>
											<CopyIcon strokeWidth={1.5} />
										</Stack>
									</CopyBtn>
								) : null}

								<Stack
									direction="row"
									gap={3}
								>
									<Button
										component={Link}
										to={RoutePath[AppRoutes.MAIN]}
										variant="unstyled"
									>
										<Stack
											direction="row"
											alignItems="center"
											gap={1}
										>
											<Typography variant="R16">
												Заказать звонок
											</Typography>
											<CallIcon strokeWidth={1.5} />
										</Stack>
									</Button>
									<Button
										component={Link}
										to={RoutePath[AppRoutes.MAIN]}
										variant="unstyled"
									>
										<Stack
											direction="row"
											alignItems="center"
											gap={1}
										>
											<Typography variant="R16">
												Написать
											</Typography>
											<MessageIcon strokeWidth={1.5} />
										</Stack>
									</Button>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</CardContent>
			</Card>
		);
	}
};
