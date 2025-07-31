// eslint-disable-next-line no-restricted-imports
import LoadDocs from 'entities/Documents/@X/Service/LoadDocs';
// eslint-disable-next-line no-restricted-imports
import DocsList from 'entities/Documents/@X/Service/DocsList';
import useDocsToApprove from '../../api/accounting/getDocsToApprove';
import { useMaxWidth } from 'shared/model';

const DocsToApprove = () => {
	const breakpoints = useMaxWidth();

	return (
		<LoadDocs
			cardTitle="Документы на утверждение"
			sx={breakpoints.xxxl ? { gap: 4 } : undefined}
			renderDocs={(data) => (
				<DocsList
					direction={breakpoints.xxxl ? 'row' : undefined}
					documents={data}
					limit={3}
				/>
			)}
			query={useDocsToApprove}
		/>
	);
};

export default DocsToApprove;
