import { Stack, TableContainer, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import SearchIcon from 'shared/icons/Search';
import { useMaxWidth } from 'shared/model';
import { createAdditioinalSx } from 'shared/mui';
import { Checkbox } from 'shared/mui/Checkbox';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from 'shared/mui/Table';
import { Tab, Tabs } from 'shared/mui/Tabs';
import OverflowedText from 'shared/ui/OverflowedText';
import AddEmployee from './AddEmployee';

const EmployeesTable = ({
	employees,
	onEmployeeSelect,
	defaultSelected,
	slotProps,
	...props
}) => {
	const breakpoints = useMaxWidth();

	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const filters = useMemo(() => ['Работающие', 'Уволенные'], []);

	const [selected, setSelected] = useState(defaultSelected);

	return (
		<Stack
			gap={3}
			height="100%"
			overflow="visible"
			{...props}
		>
			<Stack
				direction="row"
				justifyContent="space-between"
				gap={3}
			>
				<Tabs
					value={value}
					onChange={handleChange}
					sx={{ overflow: 'visible' }}
					type="tags"
					indicatorColor="secondary"
				>
					{filters.map((filter, index) => (
						<Tab
							key={index}
							label={filter}
						/>
					))}
				</Tabs>
				{!breakpoints.md ? <AddEmployee /> : null}
			</Stack>

			<TableContainer
				{...slotProps?.tableContainer}
				sx={createAdditioinalSx(
					{
						maxHeight: 451,
						overflowX: 'hidden',
						marginRight: -3,
						paddingRight: 3,
						width: 'auto',
					},
					slotProps?.tableContainer.sx
				)}
			>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell>
								<Stack
									direction="row"
									gap={1}
									alignItems="center"
								>
									<SearchIcon fontSize="small" />
									<Typography variant="M16">ФИО</Typography>
								</Stack>
							</TableCell>

							<TableCell align="right">
								<Typography variant="M16">Должность</Typography>
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{employees.map((employee) => (
							<TableRow
								key={employee.id}
								onClick={() => {
									setSelected(employee);
									onEmployeeSelect?.(employee);
								}}
								sx={{
									cursor: 'pointer',
								}}
							>
								<TableCell>
									<Stack
										direction="row"
										alignItems="center"
										gap={1}
									>
										<Checkbox
											checked={selected === employee}
											variant="circle"
											sx={{ p: 0 }}
										/>
										<OverflowedText
											width={
												breakpoints.xxl
													? breakpoints.xl
														? breakpoints.md
															? 110
															: 220
														: 320
													: 360
											}
											sx={{ paddingRight: '20px' }}
										>
											<Typography variant="R16">
												{employee.name}
											</Typography>
										</OverflowedText>
									</Stack>
								</TableCell>
								<TableCell align="right">
									<Typography
										variant="R16"
										display="block"
										width={breakpoints.xl ? 80 : 120}
										overflow="hidden"
										textOverflow="ellipsis"
										whiteSpace="nowrap"
									>
										{employee.position}
									</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export default EmployeesTable;
