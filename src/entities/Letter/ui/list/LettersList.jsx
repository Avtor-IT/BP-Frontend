import { Skeleton, Stack, Typography } from '@mui/material';
import { Grid } from '@mui/system';
import useLetters from '../../api/getLetters';
import LetterActions from '../letter-item/LetterActions';
import LetterCard from '../letter-item/LetterCard';
import LetterText from '../letter-item/LetterText';
import { useEffect, useRef } from 'react';
import { VirtualizedLettersList } from './VirtualizedLettersList';

const SkeletonList = ({ size = 5 }) => {
	return Array.from({ length: size }).map((letter, i) => (
		<Grid
			key={i}
			container
			columns={4}
			columnSpacing={2}
		>
			<Grid size={1}>
				<Skeleton
					variant="rounded"
					height="180px"
				/>
			</Grid>
			<Grid size={2}>
				<Skeleton
					variant="rounded"
					height="180px"
				/>
			</Grid>
			<Grid size={1}>
				<Skeleton
					variant="rounded"
					height="180px"
				/>
			</Grid>
		</Grid>
	));
};

const LettersList = () => {
	const {
		data: letters,
		isLoading,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useLetters();

	const sentinelRef = useRef(null);

	useEffect(() => {
		if (!sentinelRef.current) return;
		const el = sentinelRef.current;

		const io = new IntersectionObserver(
			(entries) => {
				const ent = entries[0];
				if (ent.isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ root: null, rootMargin: '400px', threshold: 0 }
		);

		io.observe(el);
		return () => io.disconnect();
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	if (isLoading) {
		return (
			<Stack
				gap={3}
				width="100%"
			>
				<SkeletonList />
			</Stack>
		);
	}
	if (isError) {
		return (
			<Stack
				gap={3}
				width="100%"
				alignItems="center"
				justifyContent="center"
				padding={2}
			>
				<Typography
					color="error"
					variant="M20"
				>
					Ошибка при получении писем
				</Typography>
			</Stack>
		);
	}

	return (
		<Stack
			gap={3}
			width="100%"
		>
			{/* {letters.map((letter) => (
				<Grid
					key={letter.id}
					container
					columns={{ xxxl: 4, lg: 5, md: 3, xs: 2 }}
					columnSpacing={2}
					rowSpacing={1}
				>
					<Grid size={{ xxxl: 1, xs: 2 }}>
						<LetterCard letter={letter} />
					</Grid>
					<Grid
						size={{ lg: 2, xs: 3 }}
						order={{ lg: 2, xs: 3 }}
					>
						<LetterText text={letter.content.letter.text} />
					</Grid>
					<Grid
						size={{ md: 1, xs: 2 }}
						order={{ lg: 3, xs: 2 }}
					>
						<LetterActions letter={letter} />
					</Grid>
				</Grid>
			))} */}

			<VirtualizedLettersList
				items={letters}
				itemHeight={200}
				renderItem={(letter) => (
					<Grid
						container
						columns={{ xxxl: 4, lg: 5, md: 3, xs: 2 }}
						columnSpacing={2}
						rowSpacing={1}
					>
						<Grid size={{ xxxl: 1, xs: 2 }}>
							<LetterCard letter={letter} />
						</Grid>
						<Grid
							size={{ lg: 2, xs: 3 }}
							order={{ lg: 2, xs: 3 }}
						>
							<LetterText text={letter.content.letter.text} />
						</Grid>
						<Grid
							size={{ md: 1, xs: 2 }}
							order={{ lg: 3, xs: 2 }}
						>
							<LetterActions letter={letter} />
						</Grid>
					</Grid>
				)}
			/>

			<div ref={sentinelRef} />

			{isFetchingNextPage && <SkeletonList />}

			{!hasNextPage && letters.length > 0 && (
				<Stack
					alignItems="center"
					padding={2}
				>
					<Typography variant="body2">Писем больше нет</Typography>
				</Stack>
			)}
		</Stack>
	);
};

export default LettersList;
