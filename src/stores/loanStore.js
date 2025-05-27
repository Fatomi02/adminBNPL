import { create } from "zustand";
import api from "../api/api";
import { toast } from "react-toastify";

const useLoanStore = create((set, get) => ({
  loanApplications: [],
  selectedLoan: null,
  filters: {
    status: "all",
    dateRange: "all",
    search: "",
    amount: "all",
  },
  isLoading: false,
  error: null,

  fetchLoanApplications: async () => {
    set({ isLoading: true });

    try {
      const res = await api.get("loans/applications");
      set({
        loanApplications: res.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      toast.error(
        error.response.data.message || "Failed to fetch load applications data"
      );
      set({ isLoading: false, error: error.message });
    }
  },

  selectLoan: (loanId) => {
    const selectedLoan = get().loanApplications.find(
      (loan) => loan.loanId === loanId
    );
    set({ selectedLoan });
  },

  updateLoanStatus: (loanId, status) => {
    set({ isLoading: true });
    const payload = {
      adminid: "Admin 123",
      adminPassword: "admin 123",
      decision: status,
    };
    try {
      const res = api.patch(`admin/loan/${loanId}/review`, payload);
      toast.success(res?.data?.message || "Loan status updated successfully");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(
        error.response.data.message || "Failed to update loan status"
      );
      set({ isLoading: false, error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },

  getFilteredApplications: () => {
    const { loanApplications, filters } = get();

    return loanApplications.filter((loan) => {
      // Filter by status
      if (
        filters.status !== "all" &&
        loan.status.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }

      // Filter by search term
      if (
        filters.search &&
        !`${loan.userId} ${loan.userName}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Filter by amount range
      if (filters.amount !== "all") {
        if (filters.amount === "low" && loan.amount > 20000) return false;
        if (
          filters.amount === "medium" &&
          (loan.amount <= 20000 || loan.amount > 50000)
        )
          return false;
        if (filters.amount === "high" && loan.amount >= 50000) return false;
      }

      return true;
    });
  },
}));

export default useLoanStore;
