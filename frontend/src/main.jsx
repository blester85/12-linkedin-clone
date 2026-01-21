import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import toast from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { axiosInstance } from './lib/axios.js';
import './index.css';
import App from './App.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [key] = queryKey;

        if (key === 'authUser') {
          try {
            const res = await axiosInstance.get('/auth/me');

            return res.data;
          } catch (err) {
            if (err.response && err.response.status === 401) {
              return null;
            }
            toast.error(err.response.data.message || 'Something went wrong');
          }
        }

        if (key === 'notifications') {
          const { data: notifications } =
            await axiosInstance.get('/notifications');

          return notifications;
        }

        if (key === 'connectionRequests') {
          const { data: connectionRequests } = await axiosInstance.get(
            '/connections/requests'
          );

          return connectionRequests;
        }

        console.log(`No default query function defined for key: ${key}`);
        throw new Error(`No default query function defined for key: ${key}`);
      }
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
