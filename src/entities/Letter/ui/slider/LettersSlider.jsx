import { Box, Skeleton, Stack, Typography } from '@mui/material';
import Slider from 'react-slick';
import { useMaxWidth } from 'shared/model';
import useLetters from '../../api/getLetters';
import LetterCard from '../LetterCard';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';

const LettersSlider = () => {
	const breakpoints = useMaxWidth();
	const { data: letters, isLoading, isError } = useLetters();
	const slidesToShow = breakpoints.xxxl ? 1 : 2;

	const settings = {
		speed: 500,
		arrows: breakpoints.lg,
		slidesToShow,
		swipeToSlide: true,
		infinite: false,
		cancelable: true,
		prevArrow: (
			<ArrowLeft
				sx={
					breakpoints.md && {
						top: 'auto',
						bottom: '-40px',
						right: '50%',
						transform: 'translate(0%, 50%) scaleX(-1)',
					}
				}
			/>
		),
		nextArrow: (
			<ArrowRight
				sx={
					breakpoints.md && {
						top: 'auto',
						bottom: '-40px',
						right: '50%',
						transform: 'translate(130%, 50%)',
					}
				}
				slidesToShow={slidesToShow}
			/>
		),
	};

	if (isLoading) {
		return (
			<Stack
				direction={'row'}
				gap={2}
			>
				{Array.from({ length: 3 }).map((_, i) => (
					<Box key={i}>
						<Skeleton
							variant="rounded"
							width={305}
							height={180}
						/>
					</Box>
				))}
			</Stack>
		);
	}

	if (isError) {
		return (
			<Stack
				width="100%"
				alignItems="center"
				justifyContent="center"
				padding={2}
			>
				<Typography
					color="error"
					variant="M20"
				>
					Ошибка при получении писем :\
				</Typography>
			</Stack>
		);
	}

	return (
		<Box
			className="slider-container"
			sx={{
				position: 'relative',
			}}
		>
			<Box
				sx={{
					'& .slick-list': {
						overflow: breakpoints.lg ? 'hidden' : 'visible',
					},
					width: breakpoints.xxxl
						? breakpoints.md
							? 304
							: 337
						: 616,
				}}
			>
				<Slider {...settings}>
					{letters.map((letter, i) => (
						<Box
							key={i}
							padding={1}
							paddingLeft={2}
						>
							<LetterCard letter={letter} />
						</Box>
					))}
				</Slider>
			</Box>
		</Box>
	);
};

export default LettersSlider;
