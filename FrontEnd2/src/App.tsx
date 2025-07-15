import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { WalletProvider } from './context/WalletContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Trade from './pages/Trade';
import Stake from './pages/Stake';
import Dashboard from './pages/Dashboard';
import Impact from './pages/Impact';
import Leaderboard from './pages/Leaderboard';
import Retirement from './pages/Retirement';
import NotFound from './pages/404';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WalletProvider>
          <UserProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/trade" element={<Trade />} />
                  <Route path="/stake" element={<Stake />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/impact" element={<Impact />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/retirement" element={<Retirement />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </Router>
          </UserProvider>
        </WalletProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;