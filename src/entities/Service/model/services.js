import { lazy } from 'react';
import CoinsIcon from 'shared/icons/Coins';
import { ScalesIcon } from 'shared/icons/Scales';
import UsersIcon from 'shared/icons/Users';

const services = {
	1: {
		title: 'Бухгалтерское обслуживание',
		component: lazy(() => import('../ui/accounting/Accounting')),
		htmlId: 'accounting',
		icon: CoinsIcon,
	},
	2: {
		title: 'Кадровое дело',
		component: lazy(() =>
			import('../ui/human-resources/HumanResourcesWidget')
		),
		htmlId: 'human-resources',
		icon: UsersIcon,
	},
	3: {
		title: 'Юридическая поддержка',
		component: lazy(() => import('../ui/legal-support/LegalSupport')),
		htmlId: 'legal-support',
		icon: ScalesIcon,
	},
};

export default services;
