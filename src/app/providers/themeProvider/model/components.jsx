import { cardShadow, typography } from 'shared/mui';
import { BoxIcon, CheckedBoxIcon } from 'shared/mui/Checkbox';
import ArrowIconWithTransition from '../ui/ArrowIconWithTransition';

// @TODO: нормально стилизовать все компоненты, вынести в систему
const components = {
	MuiCheckbox: {
		defaultProps: {
			disableFocusRipple: true,
			disableRipple: true,
			icon: <BoxIcon />,
			checkedIcon: <CheckedBoxIcon />,
		},
	},
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
				background: 'tertiary.main',
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
				'&:active': {
					...cardShadow,
				},
				padding: '10px 16px',
				textTransform: 'none',
				borderRadius: 12,
				transition: 'background .2s ease',
				lineHeight: 1,
				variants: [
					{
						props: { variant: 'unstyled' },
						style: {
							padding: 0,
							background: 'transparent',
							'&:hover': {
								background: 'transparent',
							},
							'&:active': {
								boxShadow: 'none',
							},
						},
					},
					{
						props: { variant: 'card' },
						style: ({ theme, ownerState }) => {
							return {
								...typography['M20'],
								...cardShadow,
								'&:hover': {
									...cardShadow,
									backgroundColor:
										theme.palette.background.dark,
								},
								color: theme.palette[
									ownerState.color || 'primary'
								].main,
								padding: '16px',
							};
						},
					},
					{
						props: { variant: 'contained' },
						style: ({ theme, ownerState }) => ({
							color: theme.palette[ownerState.color].contrastText,
						}),
					},
				],
			},
		},
	},
	MuiCard: {
		styleOverrides: {
			root: {
				borderRadius: 16,
				...cardShadow,
				paddingTop: '32px',
				paddingBottom: '24px',
				display: 'flex',
				gap: '24px',
				flexDirection: 'column',
			},
		},
	},
	MuiCardContent: {
		styleOverrides: {
			root: {
				'&:last-child': {
					paddingBottom: '0',
				},
				color: 'tertiary.dark',
				paddingInline: '24px',
				paddingBlock: 0,
			},
		},
	},
	MuiCardHeader: {
		defaultProps: {
			titleTypographyProps: { variant: 'M24' },
		},
		styleOverrides: {
			root: {
				paddingInline: '24px',
				paddingBlock: 0,
			},
			action: {
				margin: 0,
			},
		},
	},
	MuiCardActions: {
		styleOverrides: {
			root: {
				paddingInline: '24px',
				paddingBlock: 0,
			},
		},
	},
	MuiFormControlLabel: {
		styleOverrides: {
			root: {
				margin: 0,
				gap: 8,
			},
		},
	},
	MuiFilledInput: {
		defaultProps: {
			disableUnderline: true,
		},
		styleOverrides: {
			root: {
				'& input': {
					padding: '8px 16px',
				},
				borderRadius: '4px',
				backgroundColor: '#EEE',
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
							'&:hover': {
								...cardShadow,
							},
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
				padding: 0,
				paddingLeft: '16px',
			},
			root: {
				variants: [
					{
						props: { variant: 'card' },
						style: {
							...typography['M20'],
							...cardShadow,

							padding: '16px',
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
