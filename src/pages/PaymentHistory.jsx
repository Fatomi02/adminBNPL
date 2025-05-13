import { useEffect, useState } from 'react';
import { FiSearch, FiDollarSign, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import usePaymentStore from '../stores/paymentStore';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import StatusBadge from '../components/ui/StatusBadge';
import BarChart from '../components/charts/BarChart';

function PaymentHistory() {
  const { 
    transactions, 
    selectedTransaction,
    filters,
    fetchTransactions, 
    selectTransaction,
    setFilters,
    getFilteredTransactions,
    isLoading
  } = usePaymentStore();
  
  const [searchInput, setSearchInput] = useState('');
  
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);
  
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
    { key: 'userName', header: 'User' },
    { 
      key: 'amount', 
      header: 'Amount', 
      render: (item) => (
        <div className="flex items-center">
          <span className="mr-1">#</span>
          <span>{item.amount}</span>
        </div>
      )
    },
    { 
      key: 'type', 
      header: 'Type',
      render: (item) => (
        <div className="flex items-center">
          {item.type === 'Repayment' ? 
            <FiArrowDown className="mr-1 text-success-500" /> : 
            <FiArrowUp className="mr-1 text-primary-500" />
          }
          <span>{item.type}</span>
        </div>
      )
    },
    { key: 'paymentMethod', header: 'Method' },
    { key: 'date', header: 'Date' },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
  ];
  
  // Prepare chart data - group by date
  const chartData = transactions.reduce((acc, transaction) => {
    // Extract month from date
    const month = transaction.date.split('-')[1];
    
    // Find if we already have an entry for this month
    const existingEntry = acc.find(entry => entry.month === month);
    
    if (existingEntry) {
      if (transaction.type === 'Repayment') {
        existingEntry.repayments += transaction.amount;
      } else {
        existingEntry.disbursements += transaction.amount;
      }
    } else {
      acc.push({
        month,
        repayments: transaction.type === 'Repayment' ? transaction.amount : 0,
        disbursements: transaction.type === 'Disbursement' ? transaction.amount : 0,
      });
    }
    
    return acc;
  }, []);
  
  // Sort chart data by month
  chartData.sort((a, b) => a.month - b.month);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-800 md:hidden">Payment & Repayment History</h1>
      
      {/* Filters */}
      <Card className="bg-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="w-full md:w-auto">
              <label htmlFor="type" className="block text-sm font-medium text-neutral-600 mb-1">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full md:w-40 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="all">All Types</option>
                <option value="repayment">Repayment</option>
                <option value="disbursement">Disbursement</option>
              </select>
            </div>
            
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
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
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
      
      {/* Visualizations */}
      <Card 
        title="Payment Activity" 
        subtitle="Repayments vs Disbursements (Monthly)"
      >
        <div className="h-64">
          <BarChart 
            data={chartData} 
            xKey="month" 
            yKey="repayments" 
            color="#10b981"
            height={250}
          />
        </div>
      </Card>
      
      {/* Transaction List */}
      <Card title="Transaction History">
        <Table 
          columns={columns} 
          data={getFilteredTransactions()} 
          onRowClick={(item) => selectTransaction(item.id)}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
}

export default PaymentHistory;