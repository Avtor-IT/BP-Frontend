import { Box, Skeleton, Stack, Typography } from '@mui/material';
import Slider from 'react-slick';
import useLetters from '../api/getLetters';
import LetterCard from './LetterCard';
import './SliderStyles.scss';

const LettersSlider = () => {
	const { data: letters, isLoading, isError } = useLetters();

	const settings = {
		speed: 500,
		arrows: false,
		slidesToShow: 2,
		swipeToSlide: true,
		infinite: false,
		overflow: 'visible',
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
		<Slider {...settings}>
			{letters.map((letter, i) => (
				<Box
					key={i}
					p={1}
				>
					<LetterCard letter={letter} />
				</Box>
			))}
		</Slider>
	);
};

export default LettersSlider;
