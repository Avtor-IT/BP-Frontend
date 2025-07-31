// eslint-disable-next-line no-restricted-imports
import LoadDocs from 'entities/Documents/@X/Service/LoadDocs';
// eslint-disable-next-line no-restricted-imports
import DocsList from 'entities/Documents/@X/Service/DocsList';
import useDocsToApprove from '../../api/accounting/getDocsToApprove';

const DocsToApprove = ({ direction = 'column' }) => {
	return (
		<LoadDocs
			cardTitle="Документы на утверждение"
			sx={direction === 'column' ? { gap: 4 } : undefined}
			renderDocs={(data) => (
				<DocsList
					direction={direction}
					documents={data}
					limit={3}
				/>
			)}
			query={useDocsToApprove}
		/>
	);
};

export default DocsToApprove;
