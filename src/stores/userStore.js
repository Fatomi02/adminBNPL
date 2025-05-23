import { create } from "zustand";
import api from "../api/api";
import { toast } from "react-toastify";

const useUserStore = create((set, get) => ({
  users: [],
  selectedUser: null,
  selectedFlaggedUser: null,
  filters: {
    status: "all",
    joinDate: "all",
    search: "",
  },
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("auth/users");
      set({
        users: response?.data?.users,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      toast.error( error?.response?.data?.message || "Error fetching users");
      set({ isLoading: false, error: error.message });
    }
  },

  flagAccount: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.patch(`admin/flag-user/${id}`, {
        action: 'flag'
      });

      toast.success(response?.data?.message || "Flagged accounts fetched successfully");
      window.location.reload();
    } catch (error) {
      toast.error( error?.response?.data?.message || "Error fetching flagged accounts");
      set({ isLoading: false, error: error.message });
    }
  },

  unFlagAccount: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.patch(`admin/flag-user/${id}`, {
        action: 'unflag'
      });
      toast.success(response?.data?.message || "Flagged accounts fetched successfully");
      window.location.reload();
    } catch (error) {
      toast.error( error?.response?.data?.message || "Error fetching flagged accounts");
      set({ isLoading: false, error: error.message });
    }
  },

  selectUser: (userId) => {
    const selectedUser = get().users.find((user) => user.id === userId);
    set({ selectedUser });
  },

  selectFlaggedUser: (userId) => {
    const selectedFlaggedUser = get().users.find((user) => user.id === userId);
    set({ selectedFlaggedUser });
  },

  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },

  getFilteredUsers: () => {
    const { users, filters } = get();
    const searchTerm = filters.search?.trim().toLowerCase();

    return users.filter((user) => {
      // Filter by status
      if (
        filters.status !== "all" &&
        user.status?.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }

      // Filter by search term
      if (searchTerm) {
        const combinedFields = `${user.id ?? ""} ${user.fullName ?? ""} ${
          user.email ?? ""
        }`.toLowerCase();
        if (!combinedFields.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  },
}));

export default useUserStore;
