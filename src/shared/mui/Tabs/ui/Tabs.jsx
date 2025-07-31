import MTabs from '@mui/material/Tabs';

const Tabs = (props) => {
	return (
		<MTabs
			{...props}
			sx={
				props.type === 'tags'
					? { minHeight: 'unset', ...props.sx }
					: props.sx
			}
			slotProps={
				props.type === 'tags' && {
					...props.slotProps,
					indicator: {
						sx: {
							height: '0px',
							...props.slotProps?.indicator?.sx,
						},
						...props.slotProps?.indicator,
					},
					list: {
						...props.slotProps?.list,
						sx: (theme) => ({
							gap: 2,
							'& .MuiTab-root': {
								textTransform: 'none',
								borderRadius: '4px',
								padding: '4px 8px',
								minWidth: 'unset',
								minHeight: 'unset',
								transition: 'all 0.3s ease',
								...theme.typography['R16'],

								'&.Mui-selected': {
									backgroundColor: `${
										props.indicatorColor || 'primary'
									}.main`,
									color: 'background.default',
								},
							},
							...props.slotProps?.list?.sx,
						}),
					},
				}
			}
		/>
	);
};

export default Tabs;
