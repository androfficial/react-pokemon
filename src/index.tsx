import 'styles/style.scss';

import { ThemeProvider } from '@mui/material';
import { RootLayout } from 'layouts/RootLayout';
import { Home } from 'pages/Home';
import { Pokemon } from 'pages/Pokemon';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from 'store';
import { theme } from 'themes/theme';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/:name',
        element: <Pokemon />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
