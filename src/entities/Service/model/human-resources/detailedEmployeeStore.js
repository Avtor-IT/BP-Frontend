import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useDetailedEmployeeStoreBase = create(
	immer((set) => ({
		employee: null,
		setEmployee: (newEmployee) =>
			set((state) => {
				state.employee = newEmployee;
			}),
		clearEmployee: () =>
			set(() => ({
				employee: null,
			})),
	}))
);

const useDetailedEmployeeStore = createSelectors(useDetailedEmployeeStoreBase);
export default useDetailedEmployeeStore;
