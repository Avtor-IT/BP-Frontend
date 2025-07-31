// eslint-disable-next-line no-restricted-imports
import LoadDocs from 'entities/Documents/@X/Service/LoadDocs';
// eslint-disable-next-line no-restricted-imports
import DocsList from 'entities/Documents/@X/Service/DocsList';
import useECPDocs from '../../api/accounting/getECPDocs';

const DocsEcp = ({ direction = 'column' }) => {
	return (
		<LoadDocs
			cardTitle="Документы на ЭЦП"
			sx={direction === 'column' ? { gap: 4 } : undefined}
			slotProps={{
				title: {
					sx: direction === 'column' ? { maxWidth: 142 } : undefined,
				},
			}}
			renderDocs={(data) => (
				<DocsList
					direction={direction}
					documents={data}
					limit={3}
				/>
			)}
			query={useECPDocs}
		/>
	);
};

export default DocsEcp;
