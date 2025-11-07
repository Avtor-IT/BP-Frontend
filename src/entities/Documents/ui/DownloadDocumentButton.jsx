import { CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';
import ImportIcon from 'shared/icons/Import';
import { Button } from 'shared/ui/Button';
import useDownloadMutation from '../hooks/useDownloadMutation';

const DownloadDocumentButton = ({ icon, downloadUrl, fileName, style }) => {
	const { mutate: download, isPending: isDownloading } =
		useDownloadMutation();

	return (
		<Button
			disabled={isDownloading}
			variant="unStyled"
			onClick={() =>
				download({
					url: downloadUrl,
					params: {
						filename: fileName,
					},
				})
			}
			style={style}
		>
			<Stack
				direction="row"
				alignItems="center"
				spacing={1}
				height="1rem"
				minWidth="24px"
			>
				{isDownloading ? (
					<CircularProgress
						color="inherit"
						size="1rem"
					/>
				) : (
					icon || <ImportIcon strokeWidth="1.5" />
				)}
			</Stack>
		</Button>
	);
};

export default DownloadDocumentButton;
