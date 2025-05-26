import { create } from 'zustand';
import api from '../api/api';

const usePaymentStore = create((set, get) => ({
  transactions: [],
  selectedTransaction: null,
  filters: {
    type: 'all',
    status: 'all',
    dateRange: 'all',
    search: '',
    amount: 'all',
  },
  isLoading: false,
  error: null,
  
  fetchPaymentHistory: async () => {
    set({ isLoading: true });
    
    try {
      const res = await api.get('admin/payment-history');
      console.log(res.data)
      set({ 
        transactions: res.data,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
  
  selectTransaction: (transactionId) => {
    const selectedTransaction = get().transactions.find(tx => tx.id === transactionId);
    set({ selectedTransaction });
  },
  
  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },
  
  getFilteredTransactions: () => {
    const { transactions, filters } = get();
    
    return transactions.filter(tx => {
      // Filter by type
      if (filters.type !== 'all' && tx.type.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }
      
      // Filter by status
      if (filters.status !== 'all' && tx.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
      
      // Filter by search term
      if (filters.search && !`${tx.userId} ${tx.user} ${tx.id}`.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Filter by amount
      if (filters.amount !== 'all') {
        if (filters.amount === 'low' && tx.amount > 500) return false;
        if (filters.amount === 'medium' && (tx.amount <= 500 || tx.amount > 2000)) return false;
        if (filters.amount === 'high' && tx.amount <= 2000) return false;
      }
      
      return true;
    });
  }
}));

export default usePaymentStore;