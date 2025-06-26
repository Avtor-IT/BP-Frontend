import DestinationStep from '../ui/letter-generation-steps/DestinationStep';
import LetterStep from '../ui/letter-generation-steps/LetterStep';
import PersonalStep from '../ui/letter-generation-steps/PersonalStep';
import SenderStep from '../ui/letter-generation-steps/SenderStep';
import { destination } from './destinationConfig';
import { letter } from './letterConfig';
import { personal } from './personalConfig';
import { sender } from './senderConfig';

export const letterFormConfig = {
	sender: { ...sender, component: SenderStep },
	destination: { ...destination, component: DestinationStep },
	letter: { ...letter, component: LetterStep },
	personal: { ...personal, component: PersonalStep },
};

export const getDefaultValues = (init = {}) => {
	const defaultValues = {};

	Object.keys(letterFormConfig).forEach((section) => {
		defaultValues[section] = {};
		Object.keys(letterFormConfig[section].fields).forEach((field) => {
			defaultValues[section][field] = init[section]?.[field] || '';
		});
	});

	return defaultValues;
};

export const getValidationRules = (section, field) => {
	return letterFormConfig[section]?.fields?.[field]?.validation || {};
};
