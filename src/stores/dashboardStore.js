import { create } from 'zustand';
import api from '../api/api';
import { mockDashboardData } from '../data/mockData';
import { toast } from 'react-toastify';

const useDashboardStore = create((set, get) => ({
  users: [],
  stats: {},
  loanApplications: [],
  kycSubmissions: [],
  paymentTrends: mockDashboardData.paymentTrends,
  loanDistribution: [],
  isLoading: false,
  error: null,
  
  fetchDashboardData: async () => {
    set({ isLoading: true });
    
    try {
      const res = await api.get('analytics/dashboard-summary')
      const loadApplications = await api.get('loans/applications')
      const users = await api.get("auth/users");
      const pieStats = await api.get("loans/stats/category");
      set({ 
        users: users?.data?.users,
        stats: res.data,
        loanApplications: loadApplications?.data?.slice(0, 5),
        kycSubmissions: users?.data?.users?.slice(0, 5),
        paymentTrends: mockDashboardData.paymentTrends,
        loanDistribution: pieStats.data,
        isLoading: false,
        error: null
      });
    } catch (error) {
      toast.error(error.response.data.message || 'Failed to fetch dashboard data');
      set({ isLoading: false, error: error.message });
    }
  },
  
  getLoanCountByStatus: (status) => {
    return get().loanApplications.filter(loan => 
      loan.status.toLowerCase() === status.toLowerCase()
    ).length;
  },
  
  getKycCountByStatus: (status) => {
    return get().kycSubmissions.filter(kyc => 
      kyc.status.toLowerCase() === status.toLowerCase()
    ).length;
  }
}));

export default useDashboardStore;