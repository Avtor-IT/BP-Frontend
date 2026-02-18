import { MessageItemView } from './MessageItemView';
import { useMessageItem } from '../model/useMessageItem';

export const MessageItem = ({
	message,
	onMessageVisible,
	slotProps,
	...props
}) => {
	const {
		messageRef,
		messageType,
		fileQueries,
		openedFile,
		openFile,
		closeFile,
	} = useMessageItem({
		message,
		onMessageVisible,
	});

	return (
		<MessageItemView
			message={message}
			messageRef={messageRef}
			messageType={messageType}
			fileQueries={fileQueries}
			openedFile={openedFile}
			onFileOpen={openFile}
			onModalClose={closeFile}
			slotProps={slotProps}
			{...props}
		/>
	);
};
