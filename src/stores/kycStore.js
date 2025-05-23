import { create } from 'zustand';
import api from '../api/api';
import { toast } from 'react-toastify';

const useKycStore = create((set, get) => ({
  kycSubmissions: [],
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
        const response = await api.get("auth/users");
      set({ 
        kycSubmissions: response?.data?.users,
        isLoading: false,
        error: null
      });
    } catch (error) {
      toast.error( error?.response?.data?.message || "Error fetching users");
      set({ isLoading: false, error: error.message });
    }
  },
  
  selectKyc: (kycId) => {
    const selectedKyc = get().kycSubmissions.find(kyc => kyc.id === kycId);
    set({ selectedKyc });
  },
  
  updateKycStatus: async (kycId, status)  => {
    const payload = {
        adminid: "Admin 123",
        adminPassword: "admin 123",
        decision: status
    }
    set({isLoading: true});
    try {
      const res = await api.patch(`admin/kyc/${kycId}/approve`, payload);
      toast.success(res.data.message || 'KYC status updated successfully');
      const updatedSubmissions = get().kycSubmissions.map(kyc => 
        kyc.id === kycId ? { ...kyc, kycStatus: status } : kyc
      );
      
      set({ 
        kycSubmissions: updatedSubmissions,
        selectedKyc: get().selectedKyc?.id === kycId 
          ? { ...get().selectedKyc, kycStatus: status } 
          : get().selectedKyc
      });
    } catch (error) {
      toast.error(error.response.data.message || 'Failed to update KYC status');
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },
  
  getFilteredSubmissions: () => {
    const { kycSubmissions, filters } = get();
    
    return kycSubmissions.filter(kyc => {
      // Filter by status
      if (filters.status !== 'all' && kyc.kycStatus.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
      
      // Filter by search term
      if (filters.search && !`${kyc.id} ${kyc.fullName}`.toLowerCase().includes(filters.search.toLowerCase())) {
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