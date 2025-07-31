import { Box, Input, Stack, TableContainer, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { CloseIcon } from 'shared/icons/Close';
import SearchIcon from 'shared/icons/Search';
import { formatNumber } from 'shared/lib';
import { useMaxWidth } from 'shared/model';
import { Button } from 'shared/mui/Button';
import { Checkbox } from 'shared/mui/Checkbox';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from 'shared/mui/Table';
import { Tab, Tabs } from 'shared/mui/Tabs';

const TaxReport = ({ taxes }) => {
	const breakpoints = useMaxWidth();

	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const filters = useMemo(
		() => ['2 раза в месяц', 'Ежемесячные', 'Квартальные', 'Годовые'],
		[]
	);

	const [checked, setChecked] = useState([]);

	const handleCheck = (tax, checked) => {
		if (checked) {
			setChecked((prev) => [...prev, tax]);
		} else {
			setChecked((prev) => prev.filter((t) => t.id !== tax.id));
		}
	};
	const handleUncheck = () => {
		setChecked([]);
	};

	const handleAllCheck = () => {
		setChecked(taxes);
	};

	return (
		<Stack
			gap={3}
			height="100%"
		>
			<Tabs
				value={value}
				onChange={handleChange}
				sx={{ overflow: 'visible' }}
				type="tags"
				slotProps={
					breakpoints.xl && {
						list: {
							sx: {
								display: 'grid',
								gridTemplateColumns: `repeat(${
									breakpoints.md ? 1 : 2
								}, 1fr)`,
								gap: breakpoints.xl ? 1 : 2,
								overflow: 'visible',
							},
						},
						scroller: {
							sx: {
								overflow: 'visible !important',
							},
						},
					}
				}
				indicatorColor="secondary"
			>
				{filters.map((filter, index) => (
					<Tab
						sx={[
							breakpoints.xl && {
								flexGrow: 1,
								minHeight: '40px !important',
							},
							breakpoints.md && {
								alignItems: 'start',
								paddingLeft: '16px !important',
							},
						]}
						variant={breakpoints.xl && 'card'}
						key={index}
						label={filter}
					/>
				))}
			</Tabs>

			{breakpoints.xl && (
				<Input
					placeholder="Поиск"
					variant="card"
					sx={{
						paddingInline: 2,
						paddingBlock: 1,
						borderRadius: 2,
					}}
					slotProps={{
						input: {
							sx: { typography: 'R16' },
						},
					}}
				/>
			)}

			<TableContainer
				sx={{
					maxHeight: breakpoints.xxxl
						? breakpoints.xxl
							? breakpoints.xl
								? 377
								: 419
							: 446
						: 488,
				}}
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
									{!breakpoints.xl ? (
										<SearchIcon fontSize="small" />
									) : null}
									<Typography variant="M16">
										Наименование
									</Typography>
								</Stack>
							</TableCell>
							{!breakpoints.md ? (
								<TableCell align="right">
									<Typography variant="M16">
										Срок оплаты
									</Typography>
								</TableCell>
							) : null}
							<TableCell align="right">
								<Typography variant="M16">Сумма</Typography>
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{taxes.map((tax) => (
							<TableRow
								key={tax.id}
								onClick={() =>
									handleCheck(tax, !checked.includes(tax))
								}
								sx={{ cursor: 'pointer' }}
							>
								<TableCell>
									<Stack
										direction="row"
										alignItems="center"
										gap={1}
										width={
											breakpoints.xxl
												? breakpoints.xl
													? 150
													: 200
												: 300
										}
									>
										<Checkbox
											checked={checked.includes(tax)}
											variant="circle"
											sx={{ p: 0 }}
										/>
										<Stack width="100%">
											<Typography
												variant={
													breakpoints.xl
														? 'R16'
														: 'R20'
												}
												textOverflow="ellipsis"
												overflow="hidden"
												whiteSpace="nowrap"
												display="block"
											>
												{tax.name}
											</Typography>
											<Typography variant="R12">
												{tax.dueDate}
											</Typography>
										</Stack>
									</Stack>
								</TableCell>
								{!breakpoints.md ? (
									<TableCell align="right">
										<Typography
											variant={
												breakpoints.xl ? 'R12' : 'L16'
											}
										>
											{tax.dueDate}
										</Typography>
									</TableCell>
								) : null}
								<TableCell align="right">
									<Typography
										variant={breakpoints.xl ? 'M12' : 'M16'}
										color="primary.main"
									>
										{formatNumber(tax.amount)}
									</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Footer */}
			<Stack
				direction={breakpoints.xxl ? 'column' : 'row'}
				justifyContent="space-between"
				gap={1}
				alignItems={breakpoints.xxl ? 'start' : 'center'}
			>
				<Stack
					direction="row"
					gap={2}
				>
					<Button
						variant="outlined"
						sx={{ borderRadius: 1, p: 1, minHeight: 40 }}
						onClick={handleAllCheck}
						disabled={taxes.length === checked.length}
					>
						Выбрать все
					</Button>
					{checked.length ? (
						<Button
							variant="contained"
							sx={{ borderRadius: 1, p: 1 }}
							onClick={handleUncheck}
						>
							Выбрано ({checked.length}){' '}
							<CloseIcon sx={{ color: 'inherit' }} />
						</Button>
					) : null}
				</Stack>
				{checked.length ? (
					<Typography variant={breakpoints.xxl ? 'M16' : 'M20'}>
						Суммарный налог:{' '}
						<Box
							component="span"
							sx={{ color: 'primary.main' }}
						>
							{formatNumber(
								checked.reduce(
									(sum, tax) => tax.amount + sum,
									0
								)
							)}
						</Box>
					</Typography>
				) : null}
			</Stack>
		</Stack>
	);
};

export default TaxReport;
