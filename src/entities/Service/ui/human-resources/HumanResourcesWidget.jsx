import { Button, IconButton } from '@mui/material';
import { Grid } from '@mui/system';
import { useState } from 'react';
import CollapseIcon from 'shared/icons/CollapseIcon';
import { ExpandIcon } from 'shared/icons/Expand';
import { useMaxWidth } from 'shared/model';
import useEmployeesList from '../../api/human-resources/getEmployeesList';
import useDetailedEmployeeStore from '../../model/human-resources/detailedEmployeeStore';
import LoadReport from '../LoadReport';
import DocsToApprove from './DocsToApprove';
import EmployeesTable from './EmployeesTable';
import LoadDetailedEmployeeInfo from './LoadDetailedEmployeeInfo';
import LoadEmployees from './LoadEmployees';
import ReportList from './ReportList';
import AddEmployee from './AddEmployee';

const HumanResources = () => {
	const breakpoints = useMaxWidth();
	const employee = useDetailedEmployeeStore.use.employee();
	const setEmployee = useDetailedEmployeeStore.use.setEmployee();
	const [showDetailed, setShowDetailed] = useState(breakpoints.md);

	if (breakpoints.xxxl) {
		return (
			<Grid
				container
				spacing={2}
				columns={5}
				flexGrow={1}
			>
				<Grid size={{ xxxl: 1, lg: 2, xs: 5 }}>
					<ReportList />
				</Grid>
				<Grid
					size={{ lg: 3, xs: 5 }}
					id="employees-table"
				>
					<LoadEmployees
						sx={{ height: '100%' }}
						slotProps={{
							header: {
								action: breakpoints.md ? (
									<AddEmployee />
								) : (
									<IconButton
										component="a"
										href="#detailed-employee"
										onClick={() =>
											setShowDetailed(!showDetailed)
										}
									>
										{showDetailed ? (
											<CollapseIcon strokeWidth={2} />
										) : (
											<ExpandIcon />
										)}
									</IconButton>
								),
							},
						}}
					/>
				</Grid>

				{employee && showDetailed && (
					<Grid
						size={5}
						id="detailed-employee"
						sx={{
							minHeight: breakpoints.xxxl
								? breakpoints.lg
									? breakpoints.md
										? 1290 + 32 + 24
										: 839 + 24 + 32
									: 553 + 32 + 24
								: undefined,
						}}
					>
						<LoadDetailedEmployeeInfo
							onCollapseClick={() => setShowDetailed(false)}
							slotProps={{
								actionBtn: {
									component: 'a',
									href: '#employees-table',
								},
							}}
						/>
					</Grid>
				)}
				<Grid size={{ xxxl: 1, xs: 5 }}>
					<DocsToApprove sx={{ height: '100%' }} />
				</Grid>
			</Grid>
		);
	}

	if (employee) {
		return (
			<Grid
				container
				spacing={2}
				columns={5}
				flexGrow={1}
			>
				<Grid size={2}>
					<LoadReport
						reportTitle="Сотрудники"
						slotProps={{
							header: {
								action: (
									<Button
										color="secondary"
										variant="card"
										sx={{ typography: 'R16' }}
									>
										Справка 2НДФЛ
									</Button>
								),
							},
						}}
						query={useEmployeesList}
						renderReport={(data) => (
							<EmployeesTable
								employees={data}
								defaultSelected={employee}
								onEmployeeSelect={setEmployee}
							/>
						)}
					/>
				</Grid>
				<Grid size={3}>
					<LoadDetailedEmployeeInfo minHeight="605px" />
				</Grid>
			</Grid>
		);
	}

	return (
		<Grid
			container
			spacing={2}
			columns={5}
			flexGrow={1}
		>
			<Grid size={{ xxxl: 1, lg: 2, xs: 5 }}>
				<ReportList />
			</Grid>
			<Grid size={{ lg: 3, xs: 5 }}>
				<LoadEmployees sx={{ height: '100%' }} />
			</Grid>
			<Grid size={{ xxxl: 1, xs: 5 }}>
				<DocsToApprove sx={{ height: '100%' }} />
			</Grid>
		</Grid>
	);
};

export default HumanResources;
