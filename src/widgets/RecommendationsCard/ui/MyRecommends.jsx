import { Box, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { useRecommendsQuery } from 'entities/Recommends';
import Slider from 'react-slick';
import { ArrowInCircle } from 'shared/icons/ArrowInCircle';
import { Circle } from 'shared/ui/Card';
import './MyRecommendsSlider.scss';
import RecommendationSlide from './RecommendationSlide';

/*
 * Отсюда брал
 * https://stackoverflow.com/questions/63638782/how-to-solve-warning-react-does-not-recognize-the-currentslide-slidecount
 *
 * Исправлял так как в консоли были ошибки, связанные с пропсами
 * aria-disabled | aria-hidden.
 *
 * Так как это более правильное решение, мб получится
 * реализовать дисейбленную кнопку иначе (если нужно)
 *
 * */

// eslint-disable-next-line no-unused-vars
const SlickArrowLeft = ({ slideCount, currentSlide, ...props }) => {
	return (
		<IconButton
			{...props}
			aria-hidden="true"
			disabled={currentSlide === 0}
			sx={{
				'&:before': { display: 'none' },
				color: 'secondary.contrastText',
				transform: 'scaleX(-1) translate(100%, -100%);',
				'&:hover': { color: 'secondary.contrastText' },
				position: 'absolute',
				top: '-28px',
				right: 0,
				left: 'auto',
				width: '48px',
				height: '48px',
				zIndex: 2,
			}}
		>
			<ArrowInCircle
				sx={{
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
			'&:hover': { color: 'secondary.contrastText' },
			'&:before': { display: 'none' },
			color: 'secondary.contrastText',
			transform: 'translate(0, -100%)',
			position: 'absolute',
			top: '-28px',
			right: 0,
			left: 'auto',
			width: '48px',
			height: '48px',
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

export const MyRecommends = (props) => {
	const slidesToShow = 4;
	const settings = {
		dots: false,
		slidesToShow,
		swipeToSlide: true,
		focusOnSelect: true,
		infinite: false,
		slidesToScroll: 1,
		variableWidth: true,
		navButtonsAlwaysVisible: true,
		prevArrow: <SlickArrowLeft />,
		nextArrow: <SlickArrowRight slidesToShow={slidesToShow} />,
	};

	const { isLoading, error, data } = useRecommendsQuery();

	if (isLoading) return 'Loading...';

	if (error) return 'Error';

	return (
		<Card
			{...props}
			sx={{
				background: 'linear-gradient(to left, #FFF 0%, #4C5385 180%)',
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				...props?.sx,
			}}
		>
			<Circle
				sx={{
					height: '813px',
					width: '813px',
					background:
						'linear-gradient(15deg, var(--secondary) 0%, #FFF 100%) !important',
					right: '-350px',
					top: '-732px',
				}}
			/>
			<CardHeader
				sx={{
					color: 'primary.contrastText',
					paddingBottom: '0 !important',
				}}
				title="Актуальные изменения в законодательстве"
			/>
			<CardContent sx={{ flexGrow: 1 }}>
				<Slider
					{...settings}
					className="recommends-slider"
				>
					{data.map((item, index) => (
						<Box
							key={index}
							sx={{
								paddingRight:
									index === data.length - 1 ? '0' : 1,
								height: '100%',
							}}
						>
							<RecommendationSlide
								sx={{ maxWidth: '328px', height: '229px' }}
							/>
						</Box>
					))}
				</Slider>
			</CardContent>
		</Card>
	);
};
