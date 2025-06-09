import { Stack } from '@mui/system';
import { CreateDocumentByTemplateButton } from 'features/CreateDocument';
import { Link } from 'react-router-dom';
import Document from 'shared/icons/Document';
import { AppRoutes, createRoute } from 'shared/router';
import { Card, CardContent, CardHeader } from '@mui/material';
import { CircledTitle } from 'shared/ui/CircledTitle';

const DocumentTemplateCard = ({ ...props }) => {
	return (
		<Card {...props}>
			<CardHeader
				title={
					<CircledTitle
						title={
							<>
								Заполнить
								<br />
								фирменный блaнк
							</>
						}
						color="primary.light"
					/>
				}
			/>

			<CardContent
				sx={{
					flexGrow: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'end',
					flexDirection: 'column',
					gap: 6,
				}}
			>
				<Document
					color="tertiary"
					sx={{
						width: 232,
						height: 232,
					}}
					strokeWidth="0.5"
				/>
				<Stack
					alignItems="center"
					gap={2}
				>
					<CreateDocumentByTemplateButton />
					<Link to={createRoute(AppRoutes.LETTER)}>История</Link>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default DocumentTemplateCard;
