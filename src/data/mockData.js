// Mock data for the application

export const mockDashboardData = {
  stats: [
    { id: 'users', title: 'Total Users', value: '4,294', changePercent: 12.5, trend: 'up' },
    { id: 'activeLoanAmount', title: 'Active Loan Amount', value: '$1.2M', changePercent: 8.3, trend: 'up' },
    { id: 'repaymentRate', title: 'Repayment Rate', value: '94.5%', changePercent: 2.1, trend: 'up' },
    { id: 'flaggedAccounts', title: 'Flagged Accounts', value: '25', changePercent: 4.2, trend: 'down' },
  ],
  
  recentLoanApplications: [
    { id: 'loan-001', userId: 'user-123', userName: 'Alex Johnson', amount: 1200, purpose: 'Fashion', date: '2025-01-15', status: 'Pending' },
    { id: 'loan-002', userId: 'user-124', userName: 'Sarah Miller', amount: 3000, purpose: 'Household Items', date: '2025-01-14', status: 'Approved' },
    { id: 'loan-003', userId: 'user-125', userName: 'David Brown', amount: 500, purpose: 'Electronics', date: '2025-01-14', status: 'Rejected' },
    { id: 'loan-004', userId: 'user-126', userName: 'Emily Davis', amount: 2000, purpose: 'Fashion', date: '2025-01-13', status: 'Approved' },
    { id: 'loan-005', userId: 'user-127', userName: 'Michael Wilson', amount: 1500, purpose: 'Electronics', date: '2025-01-13', status: 'Pending' },
  ],
  
  recentKYCSubmissions: [
    { id: 'kyc-001', userId: 'user-133', userName: 'Laura Garcia', documentType: 'ID Card', date: '2025-01-15', status: 'Pending' },
    { id: 'kyc-002', userId: 'user-134', userName: 'Robert Martinez', documentType: 'Passport', date: '2025-01-14', status: 'Verified' },
    { id: 'kyc-003', userId: 'user-135', userName: 'Jennifer Lee', documentType: 'Driver\'s License', date: '2025-01-14', status: 'Rejected' },
    { id: 'kyc-004', userId: 'user-136', userName: 'William Taylor', documentType: 'ID Card', date: '2025-01-13', status: 'Verified' },
    { id: 'kyc-005', userId: 'user-137', userName: 'Elizabeth Wong', documentType: 'Passport', date: '2025-01-13', status: 'Pending' },
  ],
  
  flaggedAccounts: [
    { id: 'user-143', name: 'James Wilson', reason: 'Multiple Failed Payments', riskLevel: 'High', date: '2025-01-10' },
    { id: 'user-144', name: 'Maria Rodriguez', reason: 'Suspicious Activity', riskLevel: 'Medium', date: '2025-01-11' },
    { id: 'user-145', name: 'Daniel Kim', reason: 'Payment Default', riskLevel: 'High', date: '2025-01-12' },
    { id: 'user-146', name: 'Sophia Patel', reason: 'Identity Verification Failed', riskLevel: 'Medium', date: '2025-01-13' },
    { id: 'user-147', name: 'Thomas Johnson', reason: 'Multiple Failed Payments', riskLevel: 'Low', date: '2025-01-14' },
  ],
  
  paymentTrends: [
    { month: 'Jan', paymentAmount: 120000 },
    { month: 'Feb', paymentAmount: 150000 },
    { month: 'Mar', paymentAmount: 140000 },
    { month: 'Apr', paymentAmount: 160000 },
    { month: 'May', paymentAmount: 180000 },
    { month: 'Jun', paymentAmount: 220000 },
    { month: 'Jul', paymentAmount: 240000 },
    { month: 'Aug', paymentAmount: 230000 },
    { month: 'Sep', paymentAmount: 250000 },
    { month: 'Oct', paymentAmount: 270000 },
    { month: 'Nov', paymentAmount: 290000 },
    { month: 'Dec', paymentAmount: 320000 },
  ],
  
  loanDistribution: [
    { category: 'Fashion', value: 30 },
    { category: 'Household Items', value: 20 },
    { category: 'Electronics', value: 50 },
  ],
};

export const mockKycData = {
  submissions: [
    { id: 'kyc-001', userId: 'user-133', userName: 'Laura Garcia', documentType: 'ID Card', date: '2025-01-15', status: 'Pending', documentUrl: '#', notes: 'Waiting for review' },
    { id: 'kyc-002', userId: 'user-134', userName: 'Robert Martinez', documentType: 'Passport', date: '2025-01-14', status: 'Verified', documentUrl: '#', notes: 'All documents verified successfully' },
    { id: 'kyc-003', userId: 'user-135', userName: 'Jennifer Lee', documentType: 'Driver\'s License', date: '2025-01-14', status: 'Rejected', documentUrl: '#', notes: 'Document expired' },
    { id: 'kyc-004', userId: 'user-136', userName: 'William Taylor', documentType: 'ID Card', date: '2025-01-13', status: 'Verified', documentUrl: '#', notes: 'All documents verified successfully' },
    { id: 'kyc-005', userId: 'user-137', userName: 'Elizabeth Wong', documentType: 'Passport', date: '2025-01-13', status: 'Pending', documentUrl: '#', notes: 'Waiting for review' },
    { id: 'kyc-006', userId: 'user-138', userName: 'Carlos Mendez', documentType: 'Driver\'s License', date: '2025-01-12', status: 'Verified', documentUrl: '#', notes: 'All documents verified successfully' },
    { id: 'kyc-007', userId: 'user-139', userName: 'Olivia Johnson', documentType: 'ID Card', date: '2025-01-12', status: 'Rejected', documentUrl: '#', notes: 'Poor image quality' },
    { id: 'kyc-008', userId: 'user-140', userName: 'Mohammed Ahmed', documentType: 'Passport', date: '2025-01-11', status: 'Verified', documentUrl: '#', notes: 'All documents verified successfully' },
    { id: 'kyc-009', userId: 'user-141', userName: 'Sophia Chen', documentType: 'Driver\'s License', date: '2025-01-11', status: 'Pending', documentUrl: '#', notes: 'Waiting for review' },
    { id: 'kyc-010', userId: 'user-142', userName: 'Jackson Brown', documentType: 'ID Card', date: '2025-01-10', status: 'Verified', documentUrl: '#', notes: 'All documents verified successfully' },
  ],
};

export const mockLoanData = {
  applications: [
    { id: 'loan-001', userId: 'user-123', userName: 'Alex Johnson', amount: 1200, purpose: 'Fashion', date: '2025-01-15', status: 'Pending', term: '6 months', interestRate: '4.5%' },
    { id: 'loan-002', userId: 'user-124', userName: 'Sarah Miller', amount: 3000, purpose: 'Household Items', date: '2025-01-14', status: 'Approved', term: '12 months', interestRate: '5.2%' },
    { id: 'loan-003', userId: 'user-125', userName: 'David Brown', amount: 500, purpose: 'Electronics', date: '2025-01-14', status: 'Rejected', term: '3 months', interestRate: '4.0%' },
    { id: 'loan-004', userId: 'user-126', userName: 'Emily Davis', amount: 2000, purpose: 'Fashion', date: '2025-01-13', status: 'Approved', term: '9 months', interestRate: '5.0%' },
    { id: 'loan-005', userId: 'user-127', userName: 'Michael Wilson', amount: 1500, purpose: 'Electronics', date: '2025-01-13', status: 'Pending', term: '6 months', interestRate: '4.8%' },
    { id: 'loan-006', userId: 'user-128', userName: 'Jessica Taylor', amount: 2500, purpose: 'Fashion', date: '2025-01-12', status: 'Approved', term: '12 months', interestRate: '5.2%' },
    { id: 'loan-007', userId: 'user-129', userName: 'Christopher Lee', amount: 800, purpose: 'Electronics', date: '2025-01-12', status: 'Rejected', term: '3 months', interestRate: '4.0%' },
    { id: 'loan-008', userId: 'user-130', userName: 'Amanda Martinez', amount: 1800, purpose: 'Household Items', date: '2025-01-11', status: 'Approved', term: '9 months', interestRate: '5.0%' },
    { id: 'loan-009', userId: 'user-131', userName: 'Ryan Garcia', amount: 3500, purpose: 'Fashion', date: '2025-01-11', status: 'Pending', term: '18 months', interestRate: '5.5%' },
    { id: 'loan-010', userId: 'user-132', userName: 'Samantha Baker', amount: 1200, purpose: 'Electronics', date: '2025-01-10', status: 'Approved', term: '6 months', interestRate: '4.8%' },
  ],
};

export const mockPaymentData = {
  transactions: [
    { id: 'tx-001', userId: 'user-124', userName: 'Sarah Miller', amount: 250, type: 'Repayment', date: '2025-01-15', status: 'Completed', paymentMethod: 'Card' },
    { id: 'tx-002', userId: 'user-126', userName: 'Emily Davis', amount: 200, type: 'Repayment', date: '2025-01-14', status: 'Completed', paymentMethod: 'Bank Transfer' },
    { id: 'tx-003', userId: 'user-124', userName: 'Sarah Miller', amount: 3000, type: 'Disbursement', date: '2025-01-14', status: 'Completed', paymentMethod: 'Bank Transfer' },
    { id: 'tx-004', userId: 'user-143', userName: 'James Wilson', amount: 350, type: 'Repayment', date: '2025-01-13', status: 'Failed', paymentMethod: 'Card' },
    { id: 'tx-005', userId: 'user-128', userName: 'Jessica Taylor', amount: 210, type: 'Repayment', date: '2025-01-13', status: 'Completed', paymentMethod: 'Card' },
    { id: 'tx-006', userId: 'user-126', userName: 'Emily Davis', amount: 2000, type: 'Disbursement', date: '2025-01-12', status: 'Completed', paymentMethod: 'Bank Transfer' },
    { id: 'tx-007', userId: 'user-130', userName: 'Amanda Martinez', amount: 1800, type: 'Disbursement', date: '2025-01-12', status: 'Completed', paymentMethod: 'Bank Transfer' },
    { id: 'tx-008', userId: 'user-132', userName: 'Samantha Baker', amount: 200, type: 'Repayment', date: '2025-01-11', status: 'Completed', paymentMethod: 'Card' },
    { id: 'tx-009', userId: 'user-145', userName: 'Daniel Kim', amount: 250, type: 'Repayment', date: '2025-01-11', status: 'Failed', paymentMethod: 'Bank Transfer' },
    { id: 'tx-010', userId: 'user-132', userName: 'Samantha Baker', amount: 1200, type: 'Disbursement', date: '2025-01-10', status: 'Completed', paymentMethod: 'Bank Transfer' },
  ],
};

export const mockUserData = {
  users: [
    { id: 'user-123', name: 'Alex Johnson', email: 'alex.johnson@example.com', status: 'Active', joinDate: '2024-10-15', loanCount: 2, totalBorrowed: 3200 },
    { id: 'user-124', name: 'Sarah Miller', email: 'sarah.miller@example.com', status: 'Active', joinDate: '2024-09-20', loanCount: 1, totalBorrowed: 3000 },
    { id: 'user-125', name: 'David Brown', email: 'david.brown@example.com', status: 'Inactive', joinDate: '2024-11-05', loanCount: 1, totalBorrowed: 500 },
    { id: 'user-126', name: 'Emily Davis', email: 'emily.davis@example.com', status: 'Active', joinDate: '2024-08-12', loanCount: 1, totalBorrowed: 2000 },
    { id: 'user-127', name: 'Michael Wilson', email: 'michael.wilson@example.com', status: 'Active', joinDate: '2024-10-30', loanCount: 1, totalBorrowed: 1500 },
    { id: 'user-128', name: 'Jessica Taylor', email: 'jessica.taylor@example.com', status: 'Active', joinDate: '2024-07-22', loanCount: 2, totalBorrowed: 4000 },
    { id: 'user-129', name: 'Christopher Lee', email: 'christopher.lee@example.com', status: 'Inactive', joinDate: '2024-11-15', loanCount: 1, totalBorrowed: 800 },
    { id: 'user-130', name: 'Amanda Martinez', email: 'amanda.martinez@example.com', status: 'Active', joinDate: '2024-09-08', loanCount: 1, totalBorrowed: 1800 },
    { id: 'user-131', name: 'Ryan Garcia', email: 'ryan.garcia@example.com', status: 'Active', joinDate: '2024-10-12', loanCount: 1, totalBorrowed: 3500 },
    { id: 'user-132', name: 'Samantha Baker', email: 'samantha.baker@example.com', status: 'Active', joinDate: '2024-08-30', loanCount: 2, totalBorrowed: 2400 },
    { id: 'user-133', name: 'Laura Garcia', email: 'laura.garcia@example.com', status: 'Pending', joinDate: '2025-01-05', loanCount: 0, totalBorrowed: 0 },
    { id: 'user-134', name: 'Robert Martinez', email: 'robert.martinez@example.com', status: 'Active', joinDate: '2024-12-12', loanCount: 1, totalBorrowed: 1500 },
    { id: 'user-135', name: 'Jennifer Lee', email: 'jennifer.lee@example.com', status: 'Rejected', joinDate: '2025-01-03', loanCount: 0, totalBorrowed: 0 },
    { id: 'user-136', name: 'William Taylor', email: 'william.taylor@example.com', status: 'Active', joinDate: '2024-11-22', loanCount: 1, totalBorrowed: 2200 },
    { id: 'user-137', name: 'Elizabeth Wong', email: 'elizabeth.wong@example.com', status: 'Pending', joinDate: '2025-01-07', loanCount: 0, totalBorrowed: 0 },
    { id: 'user-143', name: 'James Wilson', email: 'james.wilson@example.com', status: 'Flagged', joinDate: '2024-09-15', loanCount: 2, totalBorrowed: 3500 },
    { id: 'user-144', name: 'Maria Rodriguez', email: 'maria.rodriguez@example.com', status: 'Flagged', joinDate: '2024-10-20', loanCount: 1, totalBorrowed: 2000 },
    { id: 'user-145', name: 'Daniel Kim', email: 'daniel.kim@example.com', status: 'Flagged', joinDate: '2024-08-05', loanCount: 2, totalBorrowed: 4000 },
    { id: 'user-146', name: 'Sophia Patel', email: 'sophia.patel@example.com', status: 'Flagged', joinDate: '2024-11-10', loanCount: 1, totalBorrowed: 1800 },
    { id: 'user-147', name: 'Thomas Johnson', email: 'thomas.johnson@example.com', status: 'Flagged', joinDate: '2024-10-05', loanCount: 1, totalBorrowed: 2500 },
  ],
};