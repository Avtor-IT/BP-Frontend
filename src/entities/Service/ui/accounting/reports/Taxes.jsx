import { useTaxes } from 'entities/Tax';
import LoadReport from '../../LoadReport';
import TaxReport from './TaxReport';

const Taxes = () => {
	return (
		<LoadReport
			reportTitle="Налоги и&nbsp;взносы"
			query={useTaxes}
			description={{
				error: 'Ошибка загрузки налоговой отчётности',
				empty: 'Пока налоговой отчётности нет',
			}}
			renderReport={(data) => <TaxReport taxes={data} />}
		/>
	);
};

export default Taxes;
