import LoadReport from '../LoadReport';
import useEmployeeById from '../../api/human-resources/getEmployeeById';
import DetailedEmployeeInfo from './DetailedEmployeeInfo';
import { IconButton } from '@mui/material';
import CollapseIcon from 'shared/icons/CollapseIcon';
import useDetailedEmployeeStore from '../../model/human-resources/detailedEmployeeStore';
import { useMaxWidth } from 'shared/model';

const LoadDetailedEmployeeInfo = ({ onCollapseClick, slotProps, ...props }) => {
	const employee = useDetailedEmployeeStore.use.employee();
	const breakpoints = useMaxWidth();
	const clearEmployee = useDetailedEmployeeStore.use.clearEmployee();

	return (
		<LoadReport
			reportTitle="Карточка сотрудника"
			query={useEmployeeById}
			queryParams={employee.id}
			renderReport={(data) => <DetailedEmployeeInfo employee={data} />}
			slotProps={{
				header: {
					titleTypographyProps: { variant: 'M20' },
					action: !breakpoints.md ? (
						<IconButton
							onClick={onCollapseClick || clearEmployee}
							{...slotProps?.actionBtn}
						>
							<CollapseIcon strokeWidth={2} />
						</IconButton>
					) : undefined,
				},
			}}
			sx={{
				height: '100%',
				minHeight: 605,
			}}
			{...props}
		/>
	);
};

export default LoadDetailedEmployeeInfo;
