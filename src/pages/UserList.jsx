import { useEffect, useState } from "react";
import { FiCheckCircle, FiSearch, FiUser, FiXCircle } from "react-icons/fi";
import useUserStore from "../stores/userStore";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import StatusBadge from "../components/ui/StatusBadge";

function UserList() {
  const {
    selectedUser,
    flagAccount,
    unFlagAccount,
    filters,
    fetchUsers,
    selectUser,
    setFilters,
    getFilteredUsers,
    isLoading,
  } = useUserStore();

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle search
  const handleSearch = () => {
    setFilters({ search: searchInput });
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ [e.target.name]: e.target.value });
  };

  // Define table columns
  const columns = [
    { key: "fullName", header: "Full Name" },
    { key: "email", header: "Email" },
    {
      key: "loanRequestCount",
      header: "Loans",
      render: (item) => (
        <div className="text-center">{item.loanRequestCount}</div>
      ),
    },
    {
      key: "totalLoanAmount",
      header: "Total Borrowed",
      render: (item) => <div>#{item.totalLoanAmount}</div>,
    },
    { key: "createdAt", header: "Join Date" },
    {
      key: "status",
      header: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-800 md:hidden">
        User List
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
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>

            <div className="w-full md:w-auto">
              <label
                htmlFor="joinDate"
                className="block text-sm font-medium text-neutral-600 mb-1"
              >
                Join Date
              </label>
              <select
                id="joinDate"
                name="joinDate"
                value={filters.joinDate}
                onChange={handleFilterChange}
                className="w-full md:w-40 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="all">All Time</option>
                <option value="lastWeek">Last Week</option>
                <option value="lastMonth">Last Month</option>
                <option value="last3Months">Last 3 Months</option>
                <option value="thisYear">This Year</option>
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
                placeholder="Search name, email, or ID..."
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
        {/* User List Table */}
        <div className="lg:col-span-2">
          <Card title="Users">
            <Table
              columns={columns}
              data={getFilteredUsers()}
              onRowClick={(item) => selectUser(item.id)}
              isLoading={isLoading}
            />
          </Card>
        </div>

        {/* Selected User Details */}
        <div>
          <Card title="User Profile">
            {selectedUser ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center p-4">
                  <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-semibold">
                    {selectedUser.fullName.charAt(0)}
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-neutral-800">
                    {selectedUser.fullName}
                  </h3>
                  <div className="mt-1 text-sm text-neutral-500">
                    {selectedUser.email}
                  </div>

                  <div className="mt-2">
                    <StatusBadge status={selectedUser.status} size="large" />
                  </div>

                  <div className="mt-4 w-full flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-neutral-800">
                        {selectedUser.loanRequestCount}
                      </div>
                      <div className="text-xs text-neutral-500">Loans</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-semibold text-neutral-800">
                        #{selectedUser.totalLoanAmount}
                      </div>
                      <div className="text-xs text-neutral-500">
                        Total Borrowed
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-semibold text-neutral-800">
                        {new Date(selectedUser.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "2-digit",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <div className="text-xs text-neutral-500">Join Date</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h4 className="text-sm font-medium text-neutral-700 mb-3">
                    User Details
                  </h4>

                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500">Email</span>
                      <span className="text-sm font-medium">
                        {selectedUser.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500">Phone</span>
                      <span className="text-sm font-medium">
                        {selectedUser.phone || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500">Id Type</span>
                      <span className="text-sm font-medium">
                        {selectedUser.idType || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500">
                        Bank Account
                      </span>
                      <span className="text-sm font-medium">
                        {selectedUser.bankAccount || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 mt-4">
                  <button
                    onClick={() => unFlagAccount(selectedUser.id)}
                    className="flex-1 btn-success disabled:bg-gray-500 disabled:cursor-not-allowed p-2 flex items-center gap-2 justify-center rounded-md text-sm"
                    disabled={
                      selectedUser.status.toLowerCase() !== "flagged"||
                      isLoading
                    }
                  >
                    <FiCheckCircle size={16} />
                    <span>Un-Flag Account</span>
                  </button>
                  <button
                    onClick={() => flagAccount(selectedUser.id)}
                    className="flex-1 btn-danger p-2 flex disabled:bg-gray-500 disabled:cursor-not-allowed items-center gap-2 justify-center rounded-md text-sm"
                    disabled={
                      selectedUser.status.toLowerCase() === "flagged" ||
                      isLoading
                    }
                  >
                    <FiXCircle size={16} />
                    <span>Flag Account</span>
                  </button>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h4 className="text-sm font-medium text-neutral-700 mb-3">
                    User Notes
                  </h4>
                  <textarea
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                    rows={3}
                    placeholder="Add notes about this user..."
                  ></textarea>
                  <div className="mt-2 flex justify-end">
                    <button className="btn-primary py-1 px-3 text-sm">
                      Send Note
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <FiUser size={48} className="text-neutral-300 mb-4" />
                <p className="text-neutral-500">
                  Select a user to view profile
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UserList;
