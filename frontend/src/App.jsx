import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/auth/SignUpPage';
import LoginPage from './pages/auth/LoginPage';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser']
  });

  if (isLoading) return null;

  return (
    <Layout>
      <Routes>
        <Route
          path='/'
          element={authUser ? <HomePage /> : <Navigate to='/login' />}
        />
        <Route
          path='/signup'
          element={!authUser ? <SignUpPage /> : <Navigate to='/' />}
        />
        <Route
          path='/login'
          element={!authUser ? <LoginPage /> : <Navigate to='/' />}
        />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
