import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { SimpleGrid } from '@mantine/core';
import './Dashboard.css';
import revenueImage from '../../../assets/revenue.png';
import expensesImage from '../../../assets/membership.png'; // Assume an expenses icon
import profitImage from '../../../assets/topBorrowedBook.png'; // Assume a profit icon
import pendingImage from '../../../assets/pendingorder.png';
import SummaryCard from '../../../components/SummaryCards';

interface TransactionData {
  id: string;
  description: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
}

interface MonthlyData {
  name: string;
  revenue: number;
  expenses: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const FinanceManagerDashboard: React.FC = () => {
  // State for chart filters
  const [revenuePeriod, setRevenuePeriod] = useState<string>('monthly');
  const [transactionsFilter, setTransactionsFilter] = useState<string>('all');

  // Mock data for charts and tables
  const monthlyFinancialData: MonthlyData[] = [
    { name: 'Jan', revenue: 45000, expenses: 12000 },
    { name: 'Feb', revenue: 42000, expenses: 11000 },
    { name: 'Mar', revenue: 47000, expenses: 13000 },
    { name: 'Apr', revenue: 40000, expenses: 10000 },
    { name: 'May', revenue: 38000, expenses: 9000 },
    { name: 'Jun', revenue: 41000, expenses: 10500 },
    { name: 'Jul', revenue: 46000, expenses: 11500 },
    { name: 'Aug', revenue: 39000, expenses: 9500 },
    { name: 'Sep', revenue: 43000, expenses: 10800 },
    { name: 'Oct', revenue: 48000, expenses: 12500 },
    { name: 'Nov', revenue: 50000, expenses: 13000 },
    { name: 'Dec', revenue: 47000, expenses: 12000 },
  ];

  const expenseCategoryData: CategoryData[] = [
    { name: 'Operations', value: 35, color: '#738289' },
    { name: 'Salaries', value: 30, color: '#182830' },
    { name: 'Marketing', value: 20, color: '#546E7A' },
    { name: 'Utilities', value: 15, color: '#ECEFF1' },
  ];

  const recentTransactions: TransactionData[] = [
    { id: 'TRX-1001', description: 'Supplier Payment', date: '2025-05-10', amount: 5000, status: 'completed' },
    { id: 'TRX-1002', description: 'Office Rent', date: '2025-05-09', amount: 2000, status: 'completed' },
    { id: 'TRX-1003', description: 'Invoice #INV-456', date: '2025-05-08', amount: 1500, status: 'pending' },
    { id: 'TRX-1004', description: 'Marketing Campaign', date: '2025-05-07', amount: 3000, status: 'cancelled' },
    { id: 'TRX-1005', description: 'Equipment Purchase', date: '2025-05-06', amount: 4500, status: 'completed' },
  ];

  // Simulated data loading effect
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Helper function to get status class
  const getStatusClass = (status: string): string => {
    switch(status) {
      case 'completed':
        return 'status-delivered';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  // Filter financial data based on selected period
  const getFilteredFinancialData = (): MonthlyData[] => {
    switch(revenuePeriod) {
      case 'weekly':
        return monthlyFinancialData.slice(-7);
      case 'yearly':
        return [
          { name: 'Q1', revenue: 134000, expenses: 36000 },
          { name: 'Q2', revenue: 119000, expenses: 29500 },
          { name: 'Q3', revenue: 128000, expenses: 31800 },
          { name: 'Q4', revenue: 145000, expenses: 37500 },
        ];
      case 'monthly':
      default:
        return monthlyFinancialData;
    }
  };

  // Filter transactions based on selected filter
  const getFilteredTransactions = (): TransactionData[] => {
    if (transactionsFilter === 'all') return recentTransactions;
    return recentTransactions.filter(transaction => transaction.status === transactionsFilter);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Loading Dashboard...</h2>
            <p>Please wait while we fetch your financial data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Finance Dashboard</h1>
        </div>
      </div>

      {/* Summary Cards */}
      <SimpleGrid className="stats-container" cols={{ base: 1, sm: 4 }} mb="xl" spacing="4%">
        <SummaryCard
          title="TOTAL REVENUE"
          value="$45,231"
          subtitle="+10.5% from last month"
          subtitleColor="#66BB6A"
          bgImage={revenueImage}
          bgImageSize="120px"
        />
        <SummaryCard
          title="EXPENSES"
          value="$12,345"
          subtitle="+5.2% from last month"
          subtitleColor="#EF5350"
          bgImage={expensesImage}
          bgImageSize="120px"
        />
        <SummaryCard
          title="PROFIT"
          value="$32,886"
          subtitle="+8.7% from last month"
          subtitleColor="#66BB6A"
          bgImage={profitImage}
          bgImageSize="120px"
        />
        <SummaryCard
          title="PENDING INVOICES"
          value="12"
          subtitle="-2 from last month"
          subtitleColor="#EF5350"
          bgImage={pendingImage}
          bgImageSize="120px"
        />
      </SimpleGrid>

      {/* Charts Section */}
      <div className="charts-container">
        {/* Revenue and Expenses Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Financial Overview</h3>
            <div className="chart-filter">
              <select 
                value={revenuePeriod} 
                onChange={(e) => setRevenuePeriod(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={getFilteredFinancialData()}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#546E7A" opacity={0.3} />
                <XAxis dataKey="name" stroke="#B0BEC5" />
                <YAxis stroke="#B0BEC5" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#263238', 
                    borderColor: 'transparent',
                    color: '#ffffff' 
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue ($)" 
                  stroke="#ffffff" 
                  strokeWidth={4}
                  fill="transparent" 
                  fillOpacity={0.2} 
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  name="Expenses ($)" 
                  stroke="#EF5350" 
                  fill="#EF5350" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Category Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Expense Categories</h3>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {expenseCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="recent-orders">
        <div className="chart-header">
          <h3 className="chart-title">Recent Transactions</h3>
          <div className="chart-filter">
            <select 
              value={transactionsFilter} 
              onChange={(e) => setTransactionsFilter(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredTransactions().map((transaction) => (
                <tr key={transaction.id}>
                  <td className="order-id">{transaction.id}</td>
                  <td>{transaction.description}</td>
                  <td className="order-date">{formatDate(transaction.date)}</td>
                  <td>${transaction.amount.toFixed(2)}</td>
                  <td>
                    <span className={`status-pill ${getStatusClass(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceManagerDashboard;