import { create } from 'zustand';
import { mockLoanData } from '../data/mockData';

const useLoanStore = create((set, get) => ({
  loanApplications: mockLoanData.applications,
  selectedLoan: null,
  filters: {
    status: 'all',
    dateRange: 'all',
    search: '',
    amount: 'all',
  },
  isLoading: false,
  error: null,
  
  fetchLoanApplications: async () => {
    set({ isLoading: true });
    
    try {
      // In a real app, this would be an API call
      // await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
      set({ 
        loanApplications: mockLoanData.applications,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
  
  selectLoan: (loanId) => {
    const selectedLoan = get().loanApplications.find(loan => loan.id === loanId);
    set({ selectedLoan });
  },
  
  updateLoanStatus: (loanId, status) => {
    const updatedApplications = get().loanApplications.map(loan => 
      loan.id === loanId ? { ...loan, status } : loan
    );
    
    set({ 
      loanApplications: updatedApplications,
      selectedLoan: get().selectedLoan?.id === loanId 
        ? { ...get().selectedLoan, status } 
        : get().selectedLoan
    });
  },
  
  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },
  
  getFilteredApplications: () => {
    const { loanApplications, filters } = get();
    
    return loanApplications.filter(loan => {
      // Filter by status
      if (filters.status !== 'all' && loan.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
      
      // Filter by search term
      if (filters.search && !`${loan.userId} ${loan.userName}`.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Filter by amount range
      if (filters.amount !== 'all') {
        if (filters.amount === 'low' && loan.amount > 500) return false;
        if (filters.amount === 'medium' && (loan.amount <= 500 || loan.amount > 2000)) return false;
        if (filters.amount === 'high' && loan.amount <= 2000) return false;
      }
      
      return true;
    });
  }
}));

export default useLoanStore;