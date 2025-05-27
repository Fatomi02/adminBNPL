import { useEffect, useState } from "react";
import { FiSearch, FiCheckCircle, FiXCircle } from "react-icons/fi";
import useLoanStore from "../stores/loanStore";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import StatusBadge from "../components/ui/StatusBadge";

function LoanApplications() {
  const {
    // loanApplications,
    selectedLoan,
    filters,
    fetchLoanApplications,
    selectLoan,
    updateLoanStatus,
    setFilters,
    getFilteredApplications,
    isLoading,
  } = useLoanStore();

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchLoanApplications();
  }, [fetchLoanApplications]);

  // Handle search
  const handleSearch = () => {
    setFilters({ search: searchInput });
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ [e.target.name]: e.target.value });
  };

  // Handle status update
  const handleStatusUpdate = (status) => {
    if (selectedLoan) {
      updateLoanStatus(selectedLoan.loanId, status);
    }
  };

  // Define table columns
  const columns = [
    { key: "fullName", header: "User" },
    { key: "amount", header: "Amount", render: (item) => `#${item.amount}` },
    { key: "purpose", header: "Purpose" },
    { key: "createdAt", header: "Application Date" },
    {
      key: "status",
      header: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (item) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            selectLoan(item.loanId);
          }}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-800 md:hidden">
        Loan Applications Tracker
      </h1>

      {/* Filters */}
      <Card className="bg-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="w-full md:w-auto">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-neutral-600 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full md:w-40 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="paid off">Paid Off</option>
              </select>
            </div>

            <div className="w-full md:w-auto">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-neutral-600 mb-1"
              >
                Loan Amount
              </label>
              <select
                id="amount"
                name="amount"
                value={filters.amount}
                onChange={handleFilterChange}
                className="w-full md:w-40 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="all">All Amounts</option>
                <option value="low">Under #20,00</option>
                <option value="medium">#20,000 - #50,000</option>
                <option value="high">Over #50,000</option>
              </select>
            </div>

            <div className="w-full md:w-auto">
              <label
                htmlFor="dateRange"
                className="block text-sm font-medium text-neutral-600 mb-1"
              >
                Date Range
              </label>
              <select
                id="dateRange"
                name="dateRange"
                value={filters.dateRange}
                onChange={handleFilterChange}
                className="w-full md:w-40 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
              </select>
            </div>
          </div>

          <div className="w-full md:w-64">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-neutral-600 mb-1"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search user or ID..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button
                onClick={handleSearch}
                className="absolute inset-y-0 left-0 px-3 flex items-center"
              >
                <FiSearch className="text-neutral-400" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Loan Applications Table */}
        <div className="lg:col-span-2">
          <Card title="Loan Applications">
            <Table
              columns={columns}
              data={getFilteredApplications()}
              onRowClick={(item) => selectLoan(item.loanId)}
              isLoading={isLoading}
            />
          </Card>
        </div>

        {/* Selected Loan Details */}
        <div>
          <Card title="Loan Details">
            {selectedLoan ? (
              <div className="space-y-4">
                <div className="bg-neutral-50 flex flex-col gap-2 p-4 rounded-lg border border-neutral-200">
                  <div className="flex items-center justify-center h-32 bg-neutral-100 rounded mb-4">
                    <span className="ml-2 text-2xl font-semibold text-neutral-800">
                      #{selectedLoan.amount}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Applicant:</span>
                    <span className="text-sm font-medium">
                      {selectedLoan.fullName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">
                      Vendor Name:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedLoan.vendorDetails.vendorName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">
                      Vendory Category:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedLoan.vendorDetails.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">
                      Loan Purpose:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedLoan.purpose}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">
                      Interest Rate:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedLoan.interestRate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">
                      Application Date:
                    </span>
                    <span className="text-sm font-medium">
                      {new Date(selectedLoan.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Status:</span>
                    <StatusBadge status={selectedLoan.status} />
                  </div>
                </div>
                {selectedLoan.status.toLowerCase() !== "paid off" && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStatusUpdate("approve")}
                      className="flex-1 btn flex items-center justify-center disabled:bg-gray-500 disabled:cursor-not-allowed gap-2 bg-success-500 text-white hover:bg-success-600"
                      disabled={
                        selectedLoan.status.toLowerCase() === "approved"
                      }
                    >
                      <FiCheckCircle size={16} />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleStatusUpdate("reject")}
                      className="flex-1 btn flex items-center justify-center disabled:bg-gray-500 disabled:cursor-not-allowed gap-2 bg-error-500 text-white hover:bg-error-600"
                      disabled={
                        selectedLoan.status.toLowerCase() === "rejected"
                      }
                    >
                      <FiXCircle size={16} />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <p className="text-neutral-500">
                  Select a loan application to view details
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LoanApplications;
