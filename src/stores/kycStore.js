import { create } from 'zustand';
import { mockKycData } from '../data/mockData';

const useKycStore = create((set, get) => ({
  kycSubmissions: mockKycData.submissions,
  selectedKyc: null,
  filters: {
    status: 'all',
    dateRange: 'all',
    search: '',
  },
  isLoading: false,
  error: null,
  
  fetchKycSubmissions: async () => {
    set({ isLoading: true });
    
    try {
      // In a real app, this would be an API call
      // await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
      set({ 
        kycSubmissions: mockKycData.submissions,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
  
  selectKyc: (kycId) => {
    const selectedKyc = get().kycSubmissions.find(kyc => kyc.id === kycId);
    set({ selectedKyc });
  },
  
  updateKycStatus: (kycId, status) => {
    const updatedSubmissions = get().kycSubmissions.map(kyc => 
      kyc.id === kycId ? { ...kyc, status } : kyc
    );
    
    set({ 
      kycSubmissions: updatedSubmissions,
      selectedKyc: get().selectedKyc?.id === kycId 
        ? { ...get().selectedKyc, status } 
        : get().selectedKyc
    });
  },
  
  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },
  
  getFilteredSubmissions: () => {
    const { kycSubmissions, filters } = get();
    
    return kycSubmissions.filter(kyc => {
      // Filter by status
      if (filters.status !== 'all' && kyc.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
      
      // Filter by search term
      if (filters.search && !`${kyc.userId} ${kyc.userName}`.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Filter by date range (simplified)
      if (filters.dateRange !== 'all') {
        // In real app, implement proper date filtering
        return true;
      }
      
      return true;
    });
  }
}));

export default useKycStore;