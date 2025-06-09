import { lazy } from 'react';
import CoinsIcon from 'shared/icons/Coins';
import UsersIcon from 'shared/icons/Users';

const services = {
	1: {
		title: 'Бухгалтерское обслуживание',
		component: lazy(() => import('../services/accounting')),
		htmlId: 'accounting',
		icon: CoinsIcon,
	},
	2: {
		title: 'Кадровое дело',
		component: lazy(() => import('../services/humanResources')),
		htmlId: 'human-resources',
		icon: UsersIcon,
	},
	3: {
		title: 'Юридическая поддержка',
		component: lazy(() => import('../services/legalSupport')),
		htmlId: 'legal-support',
		icon: UsersIcon,
	},
};

export default services;
