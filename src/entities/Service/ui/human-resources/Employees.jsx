import { IconButton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { ExpandIcon } from 'shared/icons/Expand';
import { useMaxWidth } from 'shared/model';
import useEmployeeById from '../../api/human-resources/getEmployeeById';
import useDetailedEmployeeStore from '../../model/human-resources/detailedEmployeeStore';
import LoadReport from '../LoadReport';
import EmployeeInfo from './EmployeeInfo';
import EmployeesTable from './EmployeesTable';

const Employees = ({ employees }) => {
	const breakpoints = useMaxWidth();
	const [selected, setSelected] = useState(employees[0]);
	const setEmployee = useDetailedEmployeeStore.use.setEmployee();

	useEffect(() => {
		if (breakpoints.xxxl) {
			setEmployee(employees[0]);
		}
	}, []);

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			height="100%"
			gap={3}
		>
			<EmployeesTable
				width={breakpoints.xxxl ? '100%' : 'auto'}
				overflow="visible"
				employees={employees}
				onEmployeeSelect={breakpoints.xxxl ? setEmployee : setSelected}
				defaultSelected={selected}
				flexShrink={1}
			/>

			{selected && !breakpoints.xxxl && (
				<LoadReport
					reportTitle="Карточка сотрудника"
					query={useEmployeeById}
					queryParams={selected.id}
					renderReport={(data) => <EmployeeInfo employee={data} />}
					slotProps={{
						header: {
							titleTypographyProps: { variant: 'M20' },
							action: (
								<IconButton
									onClick={() => setEmployee(selected)}
								>
									<ExpandIcon fontSize="small" />
								</IconButton>
							),
						},
					}}
					sx={{
						mt: '-53px',
						height: 'auto',
						minHeight: 556,
						width: 329,
						flexGrow: 1,
					}}
				/>
			)}
		</Stack>
	);
};

export default Employees;
