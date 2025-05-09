import { useEffect, useState } from 'react';
import { FiSearch, FiAlertTriangle, FiEdit2, FiMessageSquare, FiCheck } from 'react-icons/fi';
import useUserStore from '../stores/userStore';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import StatusBadge from '../components/ui/StatusBadge';

function FlaggedAccounts() {
  const { 
    users, 
    selectedUser,
    fetchUsers, 
    selectUser,
    updateUserStatus,
    isLoading
  } = useUserStore();
  
  const [searchInput, setSearchInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  useEffect(() => {
    // Filter only flagged accounts
    const flagged = users.filter(user => user.status === 'Flagged');
    
    // Apply search filter if needed
    if (searchInput) {
      const searchTerm = searchInput.toLowerCase();
      setFilteredUsers(
        flagged.filter(user => 
          user.name.toLowerCase().includes(searchTerm) || 
          user.email.toLowerCase().includes(searchTerm) ||
          user.id.toLowerCase().includes(searchTerm)
        )
      );
    } else {
      setFilteredUsers(flagged);
    }
  }, [users, searchInput]);
  
  // Handle search
  const handleSearch = () => {
    // Search is handled in the useEffect above
  };
  
  // Handle resolving a flagged account
  const handleResolveFlag = (userId) => {
    updateUserStatus(userId, 'Active');
  };
  
  // Define table columns
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { 
      key: 'reason',
      header: 'Flag Reason',
      render: (user) => {
        // Get reason from flagged accounts data (simulated)
        const reasons = {
          'user-143': 'Multiple Failed Payments',
          'user-144': 'Suspicious Activity',
          'user-145': 'Payment Default',
          'user-146': 'Identity Verification Failed',
          'user-147': 'Multiple Failed Payments',
        };
        
        return reasons[user.id] || 'Manual Flag';
      }
    },
    { 
      key: 'riskLevel',
      header: 'Risk Level',
      render: (user) => {
        // Get risk level from flagged accounts data (simulated)
        const riskLevels = {
          'user-143': 'High',
          'user-144': 'Medium',
          'user-145': 'High',
          'user-146': 'Medium',
          'user-147': 'Low',
        };
        
        const level = riskLevels[user.id] || 'Medium';
        
        return (
          <StatusBadge 
            status={
              level === 'High' ? 'Rejected' : 
              level === 'Medium' ? 'Pending' : 'Approved'
            } 
          />
        );
      }
    },
    { 
      key: 'actions',
      header: 'Actions',
      render: (user) => (
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              selectUser(user.id);
            }}
            className="p-1.5 rounded-md text-primary-600 hover:bg-primary-50"
            title="View Details"
          >
            <FiEdit2 size={16} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Would open message modal in a real app
            }}
            className="p-1.5 rounded-md text-neutral-600 hover:bg-neutral-100"
            title="Message User"
          >
            <FiMessageSquare size={16} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleResolveFlag(user.id);
            }}
            className="p-1.5 rounded-md text-success-500 hover:bg-success-50"
            title="Resolve Flag"
          >
            <FiCheck size={16} />
          </button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-800 md:hidden">Flagged Accounts</h1>
      
      {/* Search and Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-white">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search flagged accounts..."
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
        
        <Card className="bg-error-500/10 border border-error-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Flagged Accounts</p>
              <p className="text-2xl font-semibold text-error-600">{filteredUsers.length}</p>
            </div>
            <div className="p-3 rounded-full bg-error-500/20">
              <FiAlertTriangle size={24} className="text-error-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-error-500/20">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">High Risk</span>
              <span className="font-medium text-error-600">2</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-neutral-600">Medium Risk</span>
              <span className="font-medium text-warning-600">2</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-neutral-600">Low Risk</span>
              <span className="font-medium text-success-600">1</span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flagged Accounts Table */}
        <div className="lg:col-span-2">
          <Card 
            title="Flagged Accounts" 
            subtitle="Accounts requiring attention"
          >
            <Table 
              columns={columns} 
              data={filteredUsers} 
              onRowClick={(item) => selectUser(item.id)}
              isLoading={isLoading}
            />
          </Card>
        </div>
        
        {/* Selected Account Details */}
        <div>
          <Card 
            title="Account Details" 
            className="h-full"
          >
            {selectedUser ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center p-4">
                  <div className="w-16 h-16 rounded-full bg-error-100 flex items-center justify-center text-error-600 text-xl font-semibold">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-neutral-800">{selectedUser.name}</h3>
                  <div className="mt-1 text-sm text-neutral-500">{selectedUser.email}</div>
                  
                  <div className="mt-2">
                    <StatusBadge status={selectedUser.status} />
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Flag Details</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-500">Reason:</span>
                      <span className="text-sm font-medium text-error-600">
                        {/* Get reason from flagged accounts data (simulated) */}
                        {(() => {
                          const reasons = {
                            'user-143': 'Multiple Failed Payments',
                            'user-144': 'Suspicious Activity',
                            'user-145': 'Payment Default',
                            'user-146': 'Identity Verification Failed',
                            'user-147': 'Multiple Failed Payments',
                          };
                          
                          return reasons[selectedUser.id] || 'Manual Flag';
                        })()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-500">Risk Level:</span>
                      <span className="text-sm font-medium">
                        {/* Get risk level from flagged accounts data (simulated) */}
                        {(() => {
                          const riskLevels = {
                            'user-143': 'High',
                            'user-144': 'Medium',
                            'user-145': 'High',
                            'user-146': 'Medium',
                            'user-147': 'Low',
                          };
                          
                          return riskLevels[selectedUser.id] || 'Medium';
                        })()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-500">Flagged Date:</span>
                      <span className="text-sm font-medium">
                        {/* Get flagged date from flagged accounts data (simulated) */}
                        {(() => {
                          const dates = {
                            'user-143': '2025-01-10',
                            'user-144': '2025-01-11',
                            'user-145': '2025-01-12',
                            'user-146': '2025-01-13',
                            'user-147': '2025-01-14',
                          };
                          
                          return dates[selectedUser.id] || '2025-01-15';
                        })()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-500">Total Borrowed:</span>
                      <span className="text-sm font-medium">${selectedUser.totalBorrowed}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-500">Loan Count:</span>
                      <span className="text-sm font-medium">{selectedUser.loanCount}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h4 className="text-sm font-medium text-neutral-700 mb-3">Resolution Notes</h4>
                  <textarea 
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                    rows={3}
                    placeholder="Add notes about this flag resolution..."
                  ></textarea>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleResolveFlag(selectedUser.id)}
                    className="flex-1 btn flex items-center justify-center gap-2 bg-success-500 text-white hover:bg-success-600"
                  >
                    <FiCheck size={16} />
                    <span>Resolve Flag</span>
                  </button>
                  <button 
                    className="flex-1 btn flex items-center justify-center gap-2 bg-primary-500 text-white hover:bg-primary-600"
                  >
                    <FiMessageSquare size={16} />
                    <span>Message User</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                <FiAlertTriangle size={48} className="text-neutral-300 mb-4" />
                <p className="text-neutral-500">Select an account to view details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FlaggedAccounts;