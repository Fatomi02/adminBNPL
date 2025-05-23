import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import UserKYC from './pages/UserKYC';
import LoanApplications from './pages/LoanApplications';
import PaymentHistory from './pages/PaymentHistory';
import UserList from './pages/UserList';
import FlaggedAccounts from './pages/FlaggedAccounts';
import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <><Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-kyc" element={<UserKYC />} />
          <Route path="/loan-applications" element={<LoanApplications />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/flagged-accounts" element={<FlaggedAccounts />} />
        </Routes>
      </Layout>
    </Router><ToastContainer
        pauseOnHover={true}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true} /></>
  );
}

export default App;