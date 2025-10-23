import { create } from 'zustand';
import { letter } from '../model/generator-config/letterConfig';

export const useLetterStore = create((set) => ({
	letter: {},
	setLetter: (newLetter) => set({ letter: { ...letter, ...newLetter } }),
	clearLetter: () => set({ letter: {} }),
}));
