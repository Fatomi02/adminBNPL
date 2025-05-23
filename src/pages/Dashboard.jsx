import { useEffect } from 'react';
import { FiUser, FiDollarSign, FiPercent, FiAlertTriangle } from 'react-icons/fi';
import useDashboardStore from '../stores/dashboardStore';
import StatsCard from '../components/ui/StatsCard';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import StatusBadge from '../components/ui/StatusBadge';
import AreaChart from '../components/charts/AreaChart';
import PieChart from '../components/charts/PieChart';

function Dashboard() {
  const { 
    users,
    stats, 
    loanApplications, 
    kycSubmissions, 
    paymentTrends,
    loanDistribution,
    fetchDashboardData,
    isLoading
  } = useDashboardStore();
  
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  
    const flagged = users.filter(user => user.status === 'Flagged');

  // Define table columns
  const loanColumns = [
    { key: 'fullName', header: 'User' },
    { key: 'amount', header: 'Amount', render: (item) => `#${item.amount}` },
    { key: 'purpose', header: 'Purpose' },
    { key: 'createdAt', header: 'Date' },
    { key: 'status', header: 'Status' },
  ];
  
  const kycColumns = [
    { key: 'fullName', header: 'User' },
    { key: 'idType', header: 'Document' },
    { key: 'createdAt', header: 'Date' },
    { key: 'kycStatus', header: 'Status' },
  ];
  
  const flaggedColumns = [
    { key: 'fullName', header: 'User' },
    { key: 'reason', header: 'Reason' },
    { key: 'riskLevel', header: 'Risk Level', render: (item) => (
      <StatusBadge 
        status={
          item.riskLevel === 'High' ? 'Rejected' : 
          item.riskLevel === 'Medium' ? 'Pending' : 'Approved'
        } 
      />
    )},
    { key: 'date', header: 'Date' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-neutral-800 md:hidden">Dashboard</h1>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Users" 
          value={stats?.totalUsers || '--'} 
          // changePercent={stats[0].changePercent} 
          // trend={stats[0].trend} 
          icon={FiUser} 
        />
        <StatsCard 
          title="Active Loan Amount" 
          value={stats?.activeLoanAmount || '--'} 
          // changePercent={stats[1].changePercent} 
          // trend={stats[1].trend} 
          icon={FiDollarSign} 
        />
        <StatsCard 
          title="Repayment Rate" 
          value={stats?.repaymentRate || '--'} 
          // changePercent={stats[2].changePercent} 
          // trend={stats[2].trend} 
          icon={FiPercent} 
        />
        <StatsCard 
          title="Flagged Accounts" 
          value={stats?.flaggedAccounts || '--'} 
          // changePercent={stats[3].changePercent} 
          // trend={stats[3].trend} 
          icon={FiAlertTriangle} 
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card 
          className="lg:col-span-2"
          title="Payment Trends" 
          subtitle="Monthly payment amounts over time"
        >
          <AreaChart 
            data={paymentTrends} 
            xKey="month" 
            yKey="paymentAmount" 
          />
        </Card>
        
        <Card 
          title="Loan Distribution" 
          subtitle="By purpose category"
        >
          <PieChart 
            data={loanDistribution} 
            nameKey="category" 
            valueKey="value" 
            colors={['#0066ff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']}
          />
        </Card>
      </div>
      
      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card 
          title="Recent Loan Applications" 
          subtitle="Last 5 applications"
          footer={
            <a href="/loan-applications" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all applications →
            </a>
          }
        >
          <Table 
            columns={loanColumns} 
            data={loanApplications}
            pagination={false}
            isLoading={isLoading}
          />
        </Card>
        
        <Card 
          title="Recent KYC Submissions" 
          subtitle="Last 5 verification requests"
          footer={
            <a href="/user-kyc" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all KYC submissions →
            </a>
          }
        >
          <Table 
            columns={kycColumns} 
            data={kycSubmissions}
            pagination={false}
            isLoading={isLoading}
          />
        </Card>
      </div>
      
      {/* Flagged Accounts */}
      <Card 
        title="Flagged Accounts" 
        subtitle="Accounts requiring attention"
        footer={
          <a href="/flagged-accounts" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View all flagged accounts →
          </a>
        }
      >
        <Table 
          columns={flaggedColumns} 
          data={flagged}
          pagination={false}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
}

export default Dashboard;