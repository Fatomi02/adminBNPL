import { useEffect, useState } from 'react';
import { FiUsers, FiDollarSign, FiEdit, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import useUserStore from '../stores/userStore';
import useLoanStore from '../stores/loanStore';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import StatusBadge from '../components/ui/StatusBadge';

function ManualOverrides() {
  const { 
    users,
    selectUser,
    fetchUsers,
  } = useUserStore();
  
  const {
    loanApplications,
    selectedLoan,
    selectLoan,
    updateLoanStatus,
    fetchLoanApplications,
  } = useLoanStore();
  
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseType, setCaseType] = useState(null);
  const [overrideAmount, setOverrideAmount] = useState('');
  const [overrideReason, setOverrideReason] = useState('');
  const [overrideSuccess, setOverrideSuccess] = useState(false);
  
  useEffect(() => {
    fetchUsers();
    fetchLoanApplications();
  }, [fetchUsers, fetchLoanApplications]);
  
  // Handle selecting a case
  const handleSelectCase = (caseData, type) => {
    setSelectedCase(caseData);
    setCaseType(type);
    setOverrideAmount(type === 'loan' ? caseData.amount.toString() : '');
    setOverrideReason('');
    setOverrideSuccess(false);
  };
  
  // Handle override submission
  const handleSubmitOverride = () => {
    if (!selectedCase || !overrideReason) return;
    
    if (caseType === 'loan') {
      updateLoanStatus(selectedCase.id, 'Approved');
    }
    
    setOverrideSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setOverrideSuccess(false);
    }, 3000);
  };
  
  // Filter loans that might need overrides
  const loanOverrideCases = loanApplications.filter(loan => 
    loan.status === 'Rejected' || 
    (loan.status === 'Pending' && loan.amount > 2000)
  );
  
  // Filter users that might need overrides
  const userOverrideCases = users.filter(user => 
    user.status === 'Flagged' || 
    (user.status === 'Inactive' && user.loanCount > 0)
  );
  
  // Define loan table columns
  const loanColumns = [
    { key: 'userName', header: 'User' },
    { key: 'amount', header: 'Amount', render: (item) => `#${item.amount}` },
    { key: 'purpose', header: 'Purpose' },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
    { 
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleSelectCase(item, 'loan');
          }}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          Review Case
        </button>
      )
    },
  ];
  
  // Define user table columns
  const userColumns = [
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
    { key: 'loanCount', header: 'Loans' },
    { key: 'totalBorrowed', header: 'Total Borrowed', render: (item) => `#${item.totalBorrowed}` },
    { 
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleSelectCase(item, 'user');
          }}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          Review Case
        </button>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-800 md:hidden">Manual Overrides</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-primary-50 text-primary-600 mr-4">
              <FiDollarSign size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800">Loan Overrides</h3>
              <p className="text-sm text-neutral-500">Cases that may need manual review</p>
            </div>
            <div className="ml-auto bg-primary-500 text-white text-sm px-2 py-1 rounded-full">
              {loanOverrideCases.length}
            </div>
          </div>
        </Card>
        
        <Card className="bg-white">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-primary-50 text-primary-600 mr-4">
              <FiUsers size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800">User Overrides</h3>
              <p className="text-sm text-neutral-500">Users that may need limit adjustments</p>
            </div>
            <div className="ml-auto bg-primary-500 text-white text-sm px-2 py-1 rounded-full">
              {userOverrideCases.length}
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Loan Overrides Table */}
        <Card 
          title="Loan Override Cases" 
          subtitle="Rejected or high-value pending loans"
          className="lg:col-span-1"
        >
          <Table 
            columns={loanColumns} 
            data={loanOverrideCases}
            pagination={false}
          />
        </Card>
        
        {/* User Overrides Table */}
        <Card 
          title="User Override Cases" 
          subtitle="Flagged or inactive users with loans"
          className="lg:col-span-1"
        >
          <Table 
            columns={userColumns} 
            data={userOverrideCases}
            pagination={false}
          />
        </Card>
        
        {/* Override Form */}
        <Card title="Manual Override" className="lg:col-span-1">
          {selectedCase ? (
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="flex items-center mb-3">
                  <FiEdit size={16} className="text-primary-600 mr-2" />
                  <h4 className="text-sm font-medium text-neutral-700">
                    {caseType === 'loan' ? 'Loan Override' : 'User Override'}
                  </h4>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">
                      {caseType === 'loan' ? 'User:' : 'Name:'}
                    </span>
                    <span className="text-sm font-medium">
                      {caseType === 'loan' ? selectedCase.userName : selectedCase.name}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Status:</span>
                    <StatusBadge status={selectedCase.status} size="small" />
                  </div>
                  
                  {caseType === 'loan' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-500">Current Amount:</span>
                        <span className="text-sm font-medium">#{selectedCase.amount}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-500">Purpose:</span>
                        <span className="text-sm font-medium">{selectedCase.purpose}</span>
                      </div>
                    </>
                  )}
                  
                  {caseType === 'user' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-500">Loan Count:</span>
                        <span className="text-sm font-medium">{selectedCase.loanCount}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-500">Total Borrowed:</span>
                        <span className="text-sm font-medium">#{selectedCase.totalBorrowed}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="overrideAmount" className="block text-sm font-medium text-neutral-700 mb-1">
                  {caseType === 'loan' ? 'Override Amount' : 'Credit Limit Adjustment'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-neutral-500">#</span>
                  </div>
                  <input
                    id="overrideAmount"
                    type="number"
                    value={overrideAmount}
                    onChange={(e) => setOverrideAmount(e.target.value)}
                    className="pl-7 w-full py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="overrideReason" className="block text-sm font-medium text-neutral-700 mb-1">
                  Override Reason (Required)
                </label>
                <textarea
                  id="overrideReason"
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                  rows={3}
                  placeholder="Explain the reason for this override..."
                />
              </div>
              
              {overrideSuccess ? (
                <div className="p-3 bg-success-500/10 text-success-600 rounded-md flex items-center">
                  <FiCheckCircle className="mr-2" />
                  <span>Override successfully applied!</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSubmitOverride}
                    disabled={!overrideReason}
                    className="flex-1 btn flex items-center justify-center gap-2 bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiCheckCircle size={16} />
                    <span>Apply Override</span>
                  </button>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 flex flex-col items-center justify-center text-center">
              <FiAlertCircle size={48} className="text-neutral-300 mb-4" />
              <p className="text-neutral-500">Select a case to apply manual override</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default ManualOverrides;