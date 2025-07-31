export const createAdditioinalSx = (self, prop = {}) => [
	self,
	...(Array.isArray(prop) ? prop || [] : [prop]),
];
