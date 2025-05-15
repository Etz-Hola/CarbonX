import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import CreditDetails from './pages/CreditDetails';
import Portfolio from './pages/Portfolio';
import Impact from './pages/Impact';
import YieldFarming from './pages/YieldFarming';
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<LandingPage />} /> */}
        <Route index element={<Dashboard />} />
        <Route path="marketplace" element={<Marketplace />} />
        {/* <Route path="landingpage" element={<LandingPage />} /> */}

        <Route path="marketplace/:id" element={<CreditDetails />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="impact" element={<Impact />} />
        <Route path="yield" element={<YieldFarming />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;