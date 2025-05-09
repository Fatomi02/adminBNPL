import { useEffect, useState } from 'react';
import { FiSearch, FiFile, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';
import useKycStore from '../stores/kycStore';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import StatusBadge from '../components/ui/StatusBadge';

function UserKYC() {
  const { 
    kycSubmissions, 
    selectedKyc,
    filters,
    fetchKycSubmissions, 
    selectKyc,
    updateKycStatus,
    setFilters,
    getFilteredSubmissions,
    isLoading
  } = useKycStore();
  
  const [searchInput, setSearchInput] = useState('');
  
  useEffect(() => {
    fetchKycSubmissions();
  }, [fetchKycSubmissions]);
  
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
    if (selectedKyc) {
      updateKycStatus(selectedKyc.id, status);
    }
  };
  
  // Define table columns
  const columns = [
    { key: 'userName', header: 'User' },
    { key: 'documentType', header: 'Document Type' },
    { key: 'date', header: 'Submission Date' },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
    { 
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            selectKyc(item.id);
          }}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          View Details
        </button>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-800 md:hidden">User KYC Overview</h1>
      
      {/* Filters */}
      <Card className="bg-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="w-full md:w-auto">
              <label htmlFor="status" className="block text-sm font-medium text-neutral-600 mb-1">
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
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div className="w-full md:w-auto">
              <label htmlFor="dateRange" className="block text-sm font-medium text-neutral-600 mb-1">
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
            <label htmlFor="search" className="block text-sm font-medium text-neutral-600 mb-1">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search user or ID..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
        {/* KYC Submissions Table */}
        <div className="lg:col-span-2">
          <Card title="KYC Submissions">
            <Table 
              columns={columns} 
              data={getFilteredSubmissions()} 
              onRowClick={(item) => selectKyc(item.id)}
              isLoading={isLoading}
            />
          </Card>
        </div>
        
        {/* Selected KYC Details */}
        <div>
          <Card title="Document Details">
            {selectedKyc ? (
              <div className="space-y-4">
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <div className="flex items-center justify-center h-40 bg-neutral-100 rounded mb-4">
                    <FiFile size={48} className="text-neutral-400" />
                    <span className="ml-2 text-neutral-500">Document Preview</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Document Type:</span>
                    <span className="text-sm font-medium">{selectedKyc.documentType}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-neutral-500">Submitted By:</span>
                    <span className="text-sm font-medium">{selectedKyc.userName}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-neutral-500">Submission Date:</span>
                    <span className="text-sm font-medium">{selectedKyc.date}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-neutral-500">Status:</span>
                    <StatusBadge status={selectedKyc.status} />
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-neutral-500">Notes:</span>
                    <div className="mt-1 p-2 bg-white rounded border border-neutral-200 text-sm">
                      {selectedKyc.notes || 'No notes available.'}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={() => handleStatusUpdate('Verified')}
                    className="flex-1 btn flex items-center justify-center gap-2 bg-success-500 text-white hover:bg-success-600"
                    disabled={selectedKyc.status === 'Verified'}
                  >
                    <FiCheckCircle size={16} />
                    <span>Verify</span>
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('Rejected')}
                    className="flex-1 btn flex items-center justify-center gap-2 bg-error-500 text-white hover:bg-error-600"
                    disabled={selectedKyc.status === 'Rejected'}
                  >
                    <FiXCircle size={16} />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('Pending')}
                    className="flex-1 btn flex items-center justify-center gap-2 bg-warning-500 text-white hover:bg-warning-600"
                    disabled={selectedKyc.status === 'Pending'}
                  >
                    <FiAlertCircle size={16} />
                    <span>Mark Pending</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <FiFile size={48} className="text-neutral-300 mb-4" />
                <p className="text-neutral-500">Select a KYC submission to view details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UserKYC;