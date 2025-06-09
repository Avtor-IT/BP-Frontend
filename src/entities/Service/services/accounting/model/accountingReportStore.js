import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from 'shared/zustand';

const useAccountingReportStoreBase = create(
	immer((set) => ({
		report: null,
		setReport: (newReport) =>
			set((state) => {
				state.report = newReport;
			}),
		clearReport: () =>
			set(() => ({
				report: null,
			})),
	}))
);

const useAccountingReportStore = createSelectors(useAccountingReportStoreBase);
export default useAccountingReportStore;
