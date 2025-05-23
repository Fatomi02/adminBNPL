import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: {
    id: 'admin-123',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    permissions: ['all'],
  },
  isAuthenticated: true,
  isLoading: false,
  error: null,
  
  login: (email) => 
    set({ 
      user: {
        id: 'admin-123',
        name: 'Admin User',
        email,
        role: 'admin',
        permissions: ['all'],
      },
      isAuthenticated: true,
      error: null
    }),
  
  logout: () => 
    set({ 
      user: null,
      isAuthenticated: false,
    }),
  
  clearError: () => set({ error: null }),
}));

export default useAuthStore;