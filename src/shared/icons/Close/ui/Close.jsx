const Close = ({ size, width, height, fill, stroke, ...otherProps }) => {
	return (
		<svg
			height={height || size || '24px'}
			viewBox="0 -960 960 960"
			width={width || size || '24px'}
			fill={fill || 'undefined'}
			{...otherProps}
		>
			<path
				stroke={stroke || '#3D3F4C'}
				d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"
			/>
		</svg>
	);
};

export default Close;
