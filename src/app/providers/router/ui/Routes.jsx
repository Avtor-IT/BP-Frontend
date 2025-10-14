import { ChatPage } from 'pages/ChatPage';
import { CompanyPage } from 'pages/CompanyPage';
import { DocumentsPage } from 'pages/DocumentsPage';
import { FallbackPage } from 'pages/FallbackPage';
import { LetterPage } from 'pages/LetterPage';
import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';
import { MarketPage } from 'pages/MarketPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { TutorialPage } from 'pages/TutorialPage';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/router';
import PrivateRoute from '../ui/PrivateRoute';

const Routes = () => {
	const router = createBrowserRouter([
		{
			id: 'root',
			path: '/',
			element: <PrivateRoute />,
			children: [
				{
					index: true,
					element: <MainPage />,
				},
				{
					path: RoutePath[AppRoutes.COMPANY],
					element: <CompanyPage />,
				},
				{
					path: RoutePath[AppRoutes.COMPANY_DOCUMENTS],
					element: <DocumentsPage />,
				},
				{
					path: RoutePath[AppRoutes.MARKET],
					element: <MarketPage />,
				},
				{
					path: RoutePath[AppRoutes.LETTER],
					element: <LetterPage />,
				},
				{
					path: RoutePath[AppRoutes.TUTORIAL],
					element: <TutorialPage />,
				},
				{
					path: RoutePath[AppRoutes.CHATS],
					children: [
						{ index: true, element: <ChatPage /> },
						{ path: ':id', element: <ChatPage /> },
					],
				},
				{
					path: RoutePath[AppRoutes.NOT_FOUND],
					element: <NotFoundPage />,
				},
			],
		},
		{
			path: 'login',
			element: (
				<Suspense fallback={<FallbackPage />}>
					<LoginPage />
				</Suspense>
			),
		},
	]);

	return <RouterProvider router={router} />;
};

export default Routes;
