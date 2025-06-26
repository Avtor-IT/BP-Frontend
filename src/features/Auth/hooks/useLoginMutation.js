import { useMutation } from '@tanstack/react-query';
import { login } from '../api/login';

const useLoginMutation = () => {
	return useMutation({
		mutationFn: async (params) => await login(params),
	});
};

export default useLoginMutation;
