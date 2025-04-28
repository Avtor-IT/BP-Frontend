import { cardShadow, typography } from 'shared/mui';
import ArrowIconWithTransition from '../ui/ArrowIconWithTransition';

const components = {
	MuiTypography: {
		defaultProps: {
			variantMapping: {
				M40: 'h2',
				M24: 'h5',
				M20: 'span',
				R48: 'span',
				R20: 'span',
				R16: 'span',
				R12: 'span',
				L24: 'span',
				L20: 'span',
				L16: 'span',
			},
		},
	},
	MuiSkeleton: {
		styleOverrides: {
			rounded: {
				borderRadius: '16px',
			},
		},
	},
	MuiTooltip: {
		styleOverrides: {
			tooltipPlacementTop: {
				fontSize: '1rem',
				background: 'var(--tertiary)',
			},
		},
	},
	MuiButton: {
		defaultProps: {
			disableElevation: true,
			disableRipple: true,
			disableTouchRipple: true,
			disableFocusRipple: true,
		},
		styleOverrides: {
			root: {
				variants: [
					{
						props: { variant: 'unstyled' },
						style: {
							padding: 0,
							background: 'transparent',
							'&:hover': {
								background: 'transparent',
							},
						},
					},
					{
						props: { variant: 'card' },
						style: ({ theme, _ownerState }) => ({
							...typography['M20'],
							...cardShadow,
							'&:hover': {
								...cardShadow,
							},
							color: theme.palette['textSecondary'].default,
							padding: '16px',
						}),
					},
					{
						props: { variant: 'contained' },
						style: ({ theme, ownerState }) => ({
							color: theme.palette[ownerState.color].contrastText,
						}),
					},
				],
				padding: '10px 16px',
				textTransform: 'none',
				borderRadius: 16,
				transition: 'background .2s ease',
			},
		},
	},
	MuiCard: {
		styleOverrides: {
			root: {
				borderRadius: 16,
				...cardShadow,
			},
		},
	},
	MuiCardContent: {
		styleOverrides: {
			root: {
				'&:last-child': {
					paddingBottom: '16px',
				},
				color: 'tertiary.dark',
				padding: '32px 24px 16px',
			},
		},
	},
	MuiCardHeader: {
		defaultProps: {
			titleTypographyProps: { variant: 'M24' },
		},
		styleOverrides: {
			root: {
				padding: '32px 24px 24px',
			},
			action: {
				margin: 0,
			},
		},
	},
	MuiCardActions: {
		styleOverrides: {
			root: {
				padding: '24px 24px 16px 24px',
			},
		},
	},
	MuiInputBase: {
		styleOverrides: {
			root: {
				'& svg': {
					right: '16px !important',
				},
			},
		},
	},
	MuiSelect: {
		defaultProps: {
			IconComponent: ArrowIconWithTransition,
		},
		styleOverrides: {
			select: {
				padding: 16,
				paddingRight: '64px !important',
			},
			root: {
				variants: [
					{
						props: { variant: 'filled' },
						style: ({ theme, _ownerState }) => ({
							...typography['M20'],
							...cardShadow,
							color: theme.palette['textSecondary'].default,
							backgroundColor: 'transparent',
							borderRadius: 8,
							'&:before': {
								display: 'none', // disabling default underline
							},
							'&:after': {
								display: 'none', // disabling focused underline
							},
							'&:hover:not(.Mui-disabled):before': {
								borderBottom: 'none', // disabling hover underline
							},
						}),
					},
				],
			},
		},
	},

	MuiInput: {
		styleOverrides: {
			input: {
				padding: '14px 28px',
			},
			root: {
				variants: [
					{
						props: { variant: 'card' },
						style: {
							...typography['M20'],
							...cardShadow,

							borderRadius: '16px',
							position: 'relative',
							overflow: 'hidden',

							'&:before': {
								display: 'none', // disabling default underline
							},
							'&:after': {
								display: 'none', // disabling focused underline
							},
							'&:hover:not(.Mui-disabled):before': {
								borderBottom: 'none', // disabling hover underline
							},
						},
					},
				],
			},
		},
	},
};

export default components;
