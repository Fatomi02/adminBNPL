import { create } from 'zustand';
import { mockUserData } from '../data/mockData';

const useUserStore = create((set, get) => ({
  users: mockUserData.users,
  selectedUser: null,
  filters: {
    status: 'all',
    joinDate: 'all',
    search: '',
  },
  isLoading: false,
  error: null,
  
  fetchUsers: async () => {
    set({ isLoading: true });
    
    try {
      // In a real app, this would be an API call
      // await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
      set({ 
        users: mockUserData.users,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
  
  selectUser: (userId) => {
    const selectedUser = get().users.find(user => user.id === userId);
    set({ selectedUser });
  },
  
  updateUserStatus: (userId, status) => {
    const updatedUsers = get().users.map(user => 
      user.id === userId ? { ...user, status } : user
    );
    
    set({ 
      users: updatedUsers,
      selectedUser: get().selectedUser?.id === userId 
        ? { ...get().selectedUser, status } 
        : get().selectedUser
    });
  },
  
  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },
  
  getFilteredUsers: () => {
    const { users, filters } = get();
    
    return users.filter(user => {
      // Filter by status
      if (filters.status !== 'all' && user.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
      
      // Filter by search term
      if (filters.search && !`${user.id} ${user.name} ${user.email}`.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }
}));

export default useUserStore;