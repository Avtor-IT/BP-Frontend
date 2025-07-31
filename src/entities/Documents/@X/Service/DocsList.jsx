import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import DocItem from './DocItem';
import { createAdditioinalSx } from 'shared/mui';
import { useMaxWidth } from 'shared/model';

const DocsList = ({ documents, limit, slotProps, direction = 'column' }) => {
	const documentsToShow = useMemo(() => {
		return limit ? documents.slice(0, limit) : documents;
	});
	const breakpoints = useMaxWidth();

	const boxStyles = useMemo(() => {
		return {
			minWidth: breakpoints.xl
				? breakpoints.lg
					? '100%'
					: 332
				: undefined,

			minHeight: breakpoints.xxxl
				? breakpoints.xxl
					? breakpoints.xl
						? 91
						: 131
					: 90
				: undefined,
		};
	}, [breakpoints]);

	return (
		<Stack
			direction={direction}
			{...slotProps?.list}
			sx={createAdditioinalSx(
				{
					width: '100%',
					height: '100%',
					gap: 1,
					justifyContent: 'start',
					flexWrap: 'wrap',
				},
				slotProps?.list?.sx
			)}
		>
			{documentsToShow.map((document) => (
				<DocItem
					document={document}
					key={document.id}
					slotProps={{ box: boxStyles }}
					{...slotProps?.item}
				/>
			))}

			<Stack
				component="button"
				{...slotProps?.moreBtn}
				sx={createAdditioinalSx(
					{
						mt: direction === 'column' ? 1 : undefined,
						boxSizing: 'border-box',
						cursor: 'pointer',
						justifyContent: 'center',
						alignItems: 'center',
						border: '2px solid',
						borderColor: 'tertiary.main',
						borderRadius: 4,
						flex: '1 1 0',
						...boxStyles,
					},
					slotProps?.moreBtn?.sx
				)}
			>
				<Typography
					variant="M16"
					color="tertiary.main"
				>
					Смотреть все
				</Typography>
			</Stack>
		</Stack>
	);
};

export default DocsList;
