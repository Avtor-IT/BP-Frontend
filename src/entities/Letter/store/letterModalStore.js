import { create } from 'zustand';

export const useLeterModalStore = create((set) => ({
	open: false,
	setOpen: (v) => set({ open: v }),
	toggle: () => set((s) => ({ open: !s.open })),
	handleOpen: () => set({ open: true }),
	handleClose: () => set({ open: false }),
}));
