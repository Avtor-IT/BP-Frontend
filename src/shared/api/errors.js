export const DUPLICATE_FILE_ERROR_CODE = 'DISK_OBJ_22000';

export const isDuplicateFileError = (error) =>
	error?.error === DUPLICATE_FILE_ERROR_CODE;
