// Mock data for the application

export const mockDashboardData = {
  stats: [
    { id: 'users', title: 'Total Users', value: '4,294', changePercent: 12.5, trend: 'up' },
    { id: 'activeLoanAmount', title: 'Active Loan Amount', value: '#1.2M', changePercent: 8.3, trend: 'up' },
    { id: 'repaymentRate', title: 'Repayment Rate', value: '94.5%', changePercent: 2.1, trend: 'up' },
    { id: 'flaggedAccounts', title: 'Flagged Accounts', value: '25', changePercent: 4.2, trend: 'down' },
  ],
  
  recentLoanApplications: [
    { id: 'loan-001', userId: 'user-123', userName: 'Olayiwola Martins', amount: 12000, purpose: 'Fashion', date: '2025-01-15', status: 'Pending' },
    { id: 'loan-002', userId: 'user-124', userName: 'Sanusi Segun', amount: 30000, purpose: 'Household Items', date: '2025-01-14', status: 'Approved' },
    { id: 'loan-003', userId: 'user-125', userName: 'Lawal Oladipupo', amount: 50000, purpose: 'Electronics', date: '2025-01-14', status: 'Rejected' },
    { id: 'loan-004', userId: 'user-126', userName: 'Akinsehinwa Kayode', amount: 20000, purpose: 'Fashion', date: '2025-01-13', status: 'Approved' },
    { id: 'loan-005', userId: 'user-127', userName: 'Fatomi Olaitan', amount: 15000, purpose: 'Electronics', date: '2025-01-13', status: 'Pending' },
  ],
  
  recentKYCSubmissions: [
    { id: 'kyc-001', userId: 'user-133', userName: 'Lawal Ibrahim', documentType: 'ID Card', date: '2025-01-15', status: 'Pending' },
    { id: 'kyc-002', userId: 'user-134', userName: 'Labade Victor', documentType: 'Passport', date: '2025-01-14', status: 'Verified' },
    { id: 'kyc-003', userId: 'user-135', userName: 'Olajide Mariam', documentType: 'Driver\'s License', date: '2025-01-14', status: 'Rejected' },
    { id: 'kyc-004', userId: 'user-136', userName: 'Giwa Shukroh', documentType: 'ID Card', date: '2025-01-13', status: 'Verified' },
    { id: 'kyc-005', userId: 'user-137', userName: 'Fatomi Abiodun', documentType: 'Passport', date: '2025-01-13', status: 'Pending' },
  ],
  
  flaggedAccounts: [
    { id: 'user-143', name: 'Lawal Lanre', reason: 'Multiple Failed Payments', riskLevel: 'High', date: '2025-01-10' },
    { id: 'user-144', name: 'Giwa Yusuf', reason: 'Suspicious Activity', riskLevel: 'Medium', date: '2025-01-11' },
    { id: 'user-145', name: 'Fatomi Aminat', reason: 'Payment Default', riskLevel: 'High', date: '2025-01-12' },
    { id: 'user-146', name: 'Kolawole Peter', reason: 'Identity Verification Failed', riskLevel: 'Medium', date: '2025-01-13' },
    { id: 'user-147', name: 'Ibrahim Babangida', reason: 'Multiple Failed Payments', riskLevel: 'Low', date: '2025-01-14' },
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
    { id: 'kyc-001', userId: 'user-133', userName: 'Lawal Ibrahim', documentType: 'ID Card', date: '2025-01-15', status: 'Pending', documentUrl: '#', notes: 'Waiting for review' },
    { id: 'kyc-002', userId: 'user-134', userName: 'Labade Victor', documentType: 'Passport', date: '2025-01-14', status: 'Verified', documentUrl: '#', notes: 'All documents verified successfully' },
    { id: 'kyc-003', userId: 'user-135', userName: 'Olajide Mariam', documentType: 'Driver\'s License', date: '2025-01-14', status: 'Rejected', documentUrl: '#', notes: 'Document expired' },
    { id: 'kyc-004', userId: 'user-136', userName: 'Giwa Shukroh', documentType: 'ID Card', date: '2025-01-13', status: 'Verified', documentUrl: '#', notes: 'All documents verified successfully' },
    { id: 'kyc-005', userId: 'user-137', userName: 'Fatomi Abiodun', documentType: 'Passport', date: '2025-01-13', status: 'Pending', documentUrl: '#', notes: 'Waiting for review' },
  ],
};

export const mockLoanData = {
  applications: [
    { id: 'loan-001', userId: 'user-123', userName: 'Olayiwola Martins', amount: 12000, purpose: 'Fashion', date: '2025-01-15', status: 'Pending', term: '6 months', interestRate: '4.5%' },
    { id: 'loan-002', userId: 'user-124', userName: 'Sanusi Segun', amount: 30000, purpose: 'Household Items', date: '2025-01-14', status: 'Approved', term: '12 months', interestRate: '5.2%' },
    { id: 'loan-003', userId: 'user-125', userName: 'Lawal Oladipupo', amount: 50000, purpose: 'Electronics', date: '2025-01-14', status: 'Rejected', term: '3 months', interestRate: '4.0%' },
    { id: 'loan-004', userId: 'user-126', userName: 'Akinsehinwa Kayode', amount: 20000, purpose: 'Fashion', date: '2025-01-13', status: 'Approved', term: '9 months', interestRate: '5.0%' },
    { id: 'loan-005', userId: 'user-127', userName: 'Fatomi Olaitan', amount: 15000, purpose: 'Electronics', date: '2025-01-13', status: 'Pending', term: '6 months', interestRate: '4.8%' },
    { id: 'loan-006', userId: 'user-128', userName: 'Yusuf Abidemi', amount: 2500, purpose: 'Fashion', date: '2025-01-12', status: 'Approved', term: '12 months', interestRate: '5.2%' },
    { id: 'loan-007', userId: 'user-129', userName: 'Christopher Awe', amount: 800, purpose: 'Electronics', date: '2025-01-12', status: 'Rejected', term: '3 months', interestRate: '4.0%' },
    { id: 'loan-008', userId: 'user-130', userName: 'Awe Gift', amount: 1800, purpose: 'Household Items', date: '2025-01-11', status: 'Approved', term: '9 months', interestRate: '5.0%' },
    { id: 'loan-009', userId: 'user-131', userName: 'Idahosa White', amount: 3500, purpose: 'Fashion', date: '2025-01-11', status: 'Pending', term: '18 months', interestRate: '5.5%' },
    { id: 'loan-010', userId: 'user-132', userName: 'Ajadi Teniola', amount: 1200, purpose: 'Electronics', date: '2025-01-10', status: 'Approved', term: '6 months', interestRate: '4.8%' },
  ],
};

export const mockPaymentData = {
  transactions: [
    { id: 'tx-001', userId: 'user-124', userName: 'Ibrahim Babangida', amount: 25000, type: 'Repayment', date: '2025-01-15', status: 'Completed', paymentMethod: 'Card' },
    { id: 'tx-002', userId: 'user-126', userName: 'Lawal Lanre', amount: 20000, type: 'Repayment', date: '2025-01-14', status: 'Completed', paymentMethod: 'Bank Transfer' },
    { id: 'tx-003', userId: 'user-124', userName: 'Sarah S', amount: 30000, type: 'Disbursement', date: '2025-01-14', status: 'Completed', paymentMethod: 'Bank Transfer' },
    { id: 'tx-004', userId: 'user-143', userName: 'Fatomi Aminat', amount: 35000, type: 'Repayment', date: '2025-01-13', status: 'Failed', paymentMethod: 'Card' },
    { id: 'tx-005', userId: 'user-130', userName: 'Giwa Yusuf', amount: 18000, type: 'Disbursement', date: '2025-01-12', status: 'Completed', paymentMethod: 'Bank Transfer' },
    { id: 'tx-006', userId: 'user-132', userName: 'Kolawole Peter', amount: 12000, type: 'Disbursement', date: '2025-01-10', status: 'Completed', paymentMethod: 'Bank Transfer' },
  ],
};

export const mockUserData = {
  users: [
    { id: 'user-123', name: 'User 1', email: 'user@example.com', status: 'Active', joinDate: '2024-10-15', loanCount: 2, totalBorrowed: 32000 },
    { id: 'user-124', name: 'User 2', email: 'user2@example.com', status: 'Active', joinDate: '2024-09-20', loanCount: 1, totalBorrowed: 30000 },
    { id: 'user-125', name: 'User 3', email: 'user3@example.com', status: 'Inactive', joinDate: '2024-11-05', loanCount: 1, totalBorrowed: 50000 },
    { id: 'user-126', name: 'User 4', email: 'user4@example.com', status: 'Active', joinDate: '2024-08-12', loanCount: 1, totalBorrowed: 20000 },
    { id: 'user-127', name: 'User 5', email: 'user5@example.com', status: 'Active', joinDate: '2024-10-30', loanCount: 1, totalBorrowed: 15000 },
    { id: 'user-128', name: 'User 6', email: 'user6@example.com', status: 'Active', joinDate: '2024-07-22', loanCount: 2, totalBorrowed: 40000 },
    { id: 'user-129', name: 'User 7', email: 'user7@example.com', status: 'Inactive', joinDate: '2024-11-15', loanCount: 1, totalBorrowed: 80000 },
    { id: 'user-130', name: 'User 8', email: 'user8@example.com', status: 'Active', joinDate: '2024-09-08', loanCount: 1, totalBorrowed: 18000 },
    { id: 'user-131', name: 'User 9', email: 'user9@example.com', status: 'Active', joinDate: '2024-10-12', loanCount: 1, totalBorrowed: 35000 },
    { id: 'user-132', name: 'User 10', email: 'user10@example.com', status: 'Active', joinDate: '2024-08-30', loanCount: 2, totalBorrowed: 24000 },
    { id: 'user-133', name: 'User 11', email: 'user11@example.com', status: 'Pending', joinDate: '2025-01-05', loanCount: 0, totalBorrowed: 0 },
    { id: 'user-134', name: 'User 12', email: 'user12@example.com', status: 'Active', joinDate: '2024-12-12', loanCount: 1, totalBorrowed: 15000 },
    { id: 'user-135', name: 'User 13', email: 'user13@example.com', status: 'Rejected', joinDate: '2025-01-03', loanCount: 0, totalBorrowed: 0 },
    { id: 'user-136', name: 'User 14', email: 'user14@example.com', status: 'Active', joinDate: '2024-11-22', loanCount: 1, totalBorrowed: 22000 },
    { id: 'user-137', name: 'User 15', email: 'user15@example.com', status: 'Pending', joinDate: '2025-01-07', loanCount: 0, totalBorrowed: 0 },
    { id: 'user-143', name: 'User 16', email: 'user16@example.com', status: 'Flagged', joinDate: '2024-09-15', loanCount: 2, totalBorrowed: 35000 },
    { id: 'user-144', name: 'User 17', email: 'user17@example.com', status: 'Flagged', joinDate: '2024-10-20', loanCount: 1, totalBorrowed: 20000 },
    { id: 'user-145', name: 'User 18', email: 'user18@example.com', status: 'Flagged', joinDate: '2024-08-05', loanCount: 2, totalBorrowed: 40000 },
    { id: 'user-146', name: 'User 19', email: 'user19@example.com', status: 'Flagged', joinDate: '2024-11-10', loanCount: 1, totalBorrowed: 18000 },
    { id: 'user-147', name: 'User 20', email: 'user20@example.com', status: 'Flagged', joinDate: '2024-10-05', loanCount: 1, totalBorrowed: 25000 },
  ],
};