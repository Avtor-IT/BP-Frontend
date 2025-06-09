import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import SlickArrowLeft from './slider/SlickArrowLeft';
import SlickArrowRight from './slider/SlickArrowRight';
import { useRecommendsQuery } from '../hooks/useRecommendsQuery';
import Slider from 'react-slick';
import { useBreakpoint, useMinWidth } from 'shared/model';
import { Circle } from 'shared/ui/Card';
import './slider/RecommendsSlider.scss';
import RecommendsSlide from './slider/RecommendsSlide.jsx';
import Badge from '@mui/material/Badge';

/*
 * Отсюда брал
 * https://stackoverflow.com/questions/63638782/how-to-solve-warning-react-does-not-recognize-the-currentslide-slidecount
 *
 * Исправлял так как в консоли были ошибки, связанные с пропсами
 * aria-disabled | aria-hidden.
 *
 * */

const slidesBreakpoints = { xxxl: 4, xxl: 3 };

const Recommends = (props) => {
	const breakpoint = useBreakpoint();
	const breakpoints = useMinWidth();

	const slidesToShow = slidesBreakpoints[breakpoint] || 1;

	const [nav1, setNav1] = useState(null);
	const [nav2, setNav2] = useState(null);
	let sliderRef1 = useRef(null);
	let sliderRef2 = useRef(null);

	useEffect(() => {
		if (breakpoints.md) {
			setNav1(sliderRef1);
			setNav2(sliderRef2);
		}
	}, []);

	const settings = {
		dots: false,
		slidesToShow,
		swipeToSlide: true,
		focusOnSelect: true,
		infinite: false,
		slidesToScroll: 1,
		variableWidth: true,
		navButtonsAlwaysVisible: true,
		cancelable: true,
		arrows: !breakpoints.lg,
		prevArrow: <SlickArrowLeft />,
		nextArrow: <SlickArrowRight slidesToShow={slidesToShow} />,
	};

	const pagingSettings = {
		slidesToShow: 3,
		cancelable: true,
		arrows: true,
		swipeToSlide: false,
		infinite: false,
		slidesToScroll: 1,
	};

	const { isLoading, error, data } = useRecommendsQuery();

	if (isLoading) return 'Loading...';

	if (error) return 'Error';

	return (
		<Card
			{...props}
			sx={{
				background: 'linear-gradient(to left, #FFF -20%, #B2B4CD 100%)',
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				paddingBlock: breakpoints.md ? 2 : undefined,
				...props?.sx,
			}}
		>
			<Circle
				sx={{
					height: '813px',
					width: '813px',
					background:
						'linear-gradient(15deg, var(--secondary) 0%, #FFF 100%) !important',
					right: breakpoints.xxl ? '-450px' : '-350px',
					top: '-732px',
				}}
			/>
			<CardHeader
				sx={{
					color: 'primary.contrastText',
					paddingBottom: '0 !important',
					position: 'relative',
					zIndex: 2,
					paddingInline: breakpoints.md ? 2 : undefined,
				}}
				slotProps={{
					title: {
						variant: breakpoints.xl
							? breakpoints.lg
								? 'M16'
								: 'M20'
							: 'M24',
						sx: { maxWidth: breakpoints.md ? 192 : 'auto' },
					},
				}}
				title="Актуальные изменения в законодательстве"
				action={
					<Typography
						variant="M16"
						sx={{
							backgroundColor: 'error.main',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: 24,
							height: 24,
							borderRadius: '50%',
						}}
					>
						{data.length}
					</Typography>
				}
			/>
			<CardContent
				sx={{
					flexGrow: 1,
					paddingInline: breakpoints.md ? 0 : undefined,
				}}
			>
				<Box
					sx={{
						'.slick-list': {
							marginLeft: breakpoints.md ? 2 : 0,
						},
						'.slick-slide': {
							marginRight: breakpoints.md ? 2 : 1,
						},
					}}
				>
					<Slider
						className="recommends-slider"
						asNavFor={nav2}
						ref={(slider) => (sliderRef1 = slider)}
						{...settings}
					>
						{data.map((item, index) => (
							<RecommendsSlide
								key={index}
								sx={{
									maxWidth: breakpoints.md ? 280 : 328,
									height: breakpoints.md ? 253 : 229,
								}}
							/>
						))}
					</Slider>
				</Box>

				{breakpoints.md && (
					<Box
						paddingInline={6}
						mt={2}
					>
						<Slider
							asNavFor={nav1}
							ref={(slider) => (sliderRef2 = slider)}
							{...pagingSettings}
						>
							{data.map((_, i) => (
								<Box key={i}>
									<Stack
										width={'100%'}
										height={40}
										justifyContent="center"
										alignItems="center"
									>
										<Typography
											key={i}
											variant="M16"
											color="primary.contrastText"
										>
											{i + 1}
										</Typography>
									</Stack>
								</Box>
							))}
						</Slider>
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

export default Recommends;
