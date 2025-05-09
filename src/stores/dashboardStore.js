import { create } from 'zustand';
import { mockDashboardData } from '../data/mockData';

const useDashboardStore = create((set, get) => ({
  stats: mockDashboardData.stats,
  loanApplications: mockDashboardData.recentLoanApplications,
  kycSubmissions: mockDashboardData.recentKYCSubmissions,
  flaggedAccounts: mockDashboardData.flaggedAccounts,
  paymentTrends: mockDashboardData.paymentTrends,
  loanDistribution: mockDashboardData.loanDistribution,
  isLoading: false,
  error: null,
  
  fetchDashboardData: async () => {
    set({ isLoading: true });
    
    try {
      // In a real app, this would be an API call
      // await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
      set({ 
        stats: mockDashboardData.stats,
        loanApplications: mockDashboardData.recentLoanApplications,
        kycSubmissions: mockDashboardData.recentKYCSubmissions,
        flaggedAccounts: mockDashboardData.flaggedAccounts,
        paymentTrends: mockDashboardData.paymentTrends,
        loanDistribution: mockDashboardData.loanDistribution,
        isLoading: false,
        error: null
      });
    } catch (error) {
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