import { createBrowserRouter } from 'react-router';
import Home from './main_menu/pages/Home.js';
import Flopsy from './game/pages/Flopsy.js';
import RootLayout from './core/RootLayout.js';
import LoadingScreen from './core/LoadingScreen.js';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const fakeLoader = async () => {
  await sleep(1000);
  return null;
};

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    hydrateFallbackElement: <LoadingScreen />, // premier chargement
    children: [
      { path: '/', element: <Home />, loader: fakeLoader },
      { path: '/game', element: <Flopsy />, loader: fakeLoader },
    ],
  },
]);
