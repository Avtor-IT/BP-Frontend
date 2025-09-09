import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	IconButton,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import AddSquareIcon from 'shared/icons/AddSquare';
import { ArrowInCircle } from 'shared/icons/ArrowInCircle';
import ExportIcon from 'shared/icons/Export';
import ImportIcon from 'shared/icons/Import';
import { CircledTitle } from 'shared/ui/CircledTitle';
import useDownloadMutation from '../../hooks/useDownloadMutation';
import { DocumentSlide } from './DocumentSlide';

const SlickArrowLeft = ({
	slideCount: _slideCount,
	currentSlide,
	...props
}) => {
	return (
		<IconButton
			{...props}
			aria-hidden="true"
			disabled={currentSlide === 0}
			sx={{
				padding: 0,
				color: 'secondary.main',
				'&:hover': { color: 'secondary.main' },
				'&:before': { display: 'none' },
				transform: 'translateY(100%)',
				position: 'absolute',
				top: 'auto',
				bottom: '-20px',
				right: '44px',
				left: 'auto',
				width: '32px',
				height: '32px',
				zIndex: 2,
			}}
		>
			<ArrowInCircle
				sx={{
					transform: 'rotate(180deg)',
					height: '32px',
					width: '32px',
				}}
				strokeWidth={2}
			/>
		</IconButton>
	);
};

const SlickArrowRight = ({
	currentSlide,
	slideCount,
	slidesToShow,
	...props
}) => (
	<IconButton
		{...props}
		sx={{
			padding: 0,
			color: 'secondary.main',
			'&:hover': { color: 'secondary.main' },
			'&:before': { display: 'none' },
			transform: 'translateY(100%)',
			position: 'absolute',
			top: 'auto',
			bottom: '-20px',
			right: 0,
			left: 'auto',
			width: '32px',
			height: '32px',
			zIndex: 2,
		}}
		aria-hidden="true"
		disabled={currentSlide === slideCount - slidesToShow}
	>
		<ArrowInCircle
			sx={{ height: '32px', width: '32px' }}
			strokeWidth={2}
		/>
	</IconButton>
);

const DocumentsSlider = ({
	title,
	documents,
	linkTo,
	loading,
	headerAction,
	...props
}) => {
	const theme = useTheme();
	const downXl = useMediaQuery(theme.breakpoints.down('xl'));
	const { mutate: download } = useDownloadMutation();

	const slidesToShow = downXl ? 1 : 2;
	const settings = {
		dots: false,
		slidesToShow,
		swipeToSlide: true,
		focusOnSelect: true,
		infinite: false,
		slidesToScroll: 1,
		variableWidth: true,
		arrows: !downXl,
		navButtonsAlwaysVisible: true,
		cancelable: true,
		prevArrow: <SlickArrowLeft />,
		nextArrow: <SlickArrowRight slidesToShow={slidesToShow} />,
	};

	if (loading) {
		return (
			<Skeleton
				{...props}
				variant="rounded"
			/>
		);
	}

	return (
		<Card
			sx={{ gap: 2, ...props.sx }}
			{...props}
		>
			<CardHeader
				title={
					<CircledTitle
						title={title}
						color="secondary.main"
						slotProps={{
							circle: {
								sx: {
									right: '-70%',
								},
							},
						}}
					/>
				}
				action={
					<Button
						variant="unstyled"
						sx={{
							display: 'flex',
							alignItems: 'center',
							color: 'textPrimary.default',
						}}
						endIcon={<AddSquareIcon />}
						onClick={headerAction}
					>
						<Typography variant="M16">Добавить</Typography>
					</Button>
				}
			/>

			<CardContent
				sx={{
					flexGrow: 1,
					display: 'flex',
					'& .slick-list': { overflow: 'visible' },
					'& .slick-track': { minWidth: '100%' },
				}}
			>
				{documents.length ? (
					<Slider {...settings}>
						{documents.map((document, i) => (
							<Box
								paddingRight={
									i === documents.length - 1 ? '0' : 1
								}
								key={i}
							>
								<DocumentSlide
									document={document}
									onImport={(d) =>
										download({
											url: document.DOWNLOAD_URL,
											params: {
												filename: document.NAME,
											},
										})
									}
								/>
							</Box>
						))}
					</Slider>
				) : (
					<Stack
						justifyContent="center"
						alignItems="center"
						width="100%"
					>
						<Typography
							variant="R20"
							color="textSecondary"
						>
							Документов пока нет.
						</Typography>
					</Stack>
				)}
			</CardContent>

			<CardActions>
				<Button
					variant="unstyled"
					component={Link}
					to={linkTo}
				>
					<Typography
						variant="M16"
						color="textSecondary"
					>
						Смотреть все
					</Typography>
				</Button>
			</CardActions>
		</Card>
	);
};

export default DocumentsSlider;
