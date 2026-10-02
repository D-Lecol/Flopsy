import LoadingScreen from './LoadingScreen.js';
import { Outlet, useNavigation } from 'react-router';

export default function RootLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return <>{isLoading ? <LoadingScreen /> : <Outlet />}</>;
}
