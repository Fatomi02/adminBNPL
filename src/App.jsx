import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import UserKYC from './pages/UserKYC';
import LoanApplications from './pages/LoanApplications';
import PaymentHistory from './pages/PaymentHistory';
import UserList from './pages/UserList';
import FlaggedAccounts from './pages/FlaggedAccounts';
import ManualOverrides from './pages/ManualOverrides';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-kyc" element={<UserKYC />} />
          <Route path="/loan-applications" element={<LoanApplications />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/flagged-accounts" element={<FlaggedAccounts />} />
          <Route path="/manual-overrides" element={<ManualOverrides />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;