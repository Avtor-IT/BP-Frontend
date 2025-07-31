import useEmployeesList from '../../api/human-resources/getEmployeesList';
import LoadReport from '../LoadReport';
import Employees from './Employees';

const LoadEmployees = (props) => {
	return (
		<LoadReport
			{...props}
			reportTitle="Сотрудники"
			query={useEmployeesList}
			renderReport={(data) => <Employees employees={data} />}
		/>
	);
};

export default LoadEmployees;
