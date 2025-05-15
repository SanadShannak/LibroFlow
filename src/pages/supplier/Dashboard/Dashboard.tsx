import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Book, Package, ShoppingCart, DollarSign, 
  TrendingUp, TrendingDown, Bell, Search,
  Calendar, User, Filter, ChevronRight
} from 'react-feather';
import './Dashboard.css';
import SummaryCard from '../../../components/SummaryCards';

interface OrderData {
  id: string;
  bookTitle: string;
  date: string;
  amount: number;
  status: 'delivered' | 'pending' | 'cancelled';
}

interface BookData {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  stock: number;
}

interface MonthlyData {
  name: string;
  sales: number;
  orders: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const Dashboard: React.FC = () => {
  // State for chart filters
  const [salesPeriod, setSalesPeriod] = useState<string>('monthly');
  const [ordersFilter, setOrdersFilter] = useState<string>('all');

  // Mock data for various charts and tables
  const monthlySalesData: MonthlyData[] = [
    { name: 'Jan', sales: 4000, orders: 24 },
    { name: 'Feb', sales: 3000, orders: 18 },
    { name: 'Mar', sales: 5000, orders: 29 },
    { name: 'Apr', sales: 2780, orders: 15 },
    { name: 'May', sales: 1890, orders: 12 },
    { name: 'Jun', sales: 2390, orders: 14 },
    { name: 'Jul', sales: 3490, orders: 21 },
    { name: 'Aug', sales: 2000, orders: 13 },
    { name: 'Sep', sales: 2780, orders: 17 },
    { name: 'Oct', sales: 3890, orders: 25 },
    { name: 'Nov', sales: 4000, orders: 28 },
    { name: 'Dec', sales: 3490, orders: 22 },
  ];

  const categoryData: CategoryData[] = [
    { name: 'Fiction', value: 40, color: '#4FC3F7' },
    { name: 'Science', value: 25, color: '#66BB6A' },
    { name: 'History', value: 15, color: '#FFCA28' },
    { name: 'Biography', value: 20, color: '#EF5350' },
  ];

  const recentOrders: OrderData[] = [
    { id: 'ORD-7892', bookTitle: 'The Silent Patient', date: '2025-05-10', amount: 19.99, status: 'delivered' },
    { id: 'ORD-7891', bookTitle: 'Atomic Habits', date: '2025-05-09', amount: 15.50, status: 'delivered' },
    { id: 'ORD-7890', bookTitle: 'The Psychology of Money', date: '2025-05-08', amount: 18.75, status: 'pending' },
    { id: 'ORD-7889', bookTitle: 'Dune', date: '2025-05-07', amount: 22.99, status: 'cancelled' },
    { id: 'ORD-7888', bookTitle: 'Project Hail Mary', date: '2025-05-06', amount: 24.50, status: 'delivered' },
  ];

  const popularBooks: BookData[] = [
    { 
      id: 'BK-001', 
      title: 'The Midnight Library', 
      author: 'Matt Haig', 
      coverUrl: '/api/placeholder/180/200', 
      stock: 42 
    },
    { 
      id: 'BK-002', 
      title: 'Where the Crawdads Sing', 
      author: 'Delia Owens', 
      coverUrl: '/api/placeholder/180/200', 
      stock: 17 
    },
    { 
      id: 'BK-003', 
      title: 'The Four Winds', 
      author: 'Kristin Hannah', 
      coverUrl: '/api/placeholder/180/200', 
      stock: 8 
    },
    { 
      id: 'BK-004', 
      title: 'A Promised Land', 
      author: 'Barack Obama', 
      coverUrl: '/api/placeholder/180/200', 
      stock: 29 
    },
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
      case 'delivered':
        return 'status-delivered';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  // Filter and map data based on selected period
  const getFilteredSalesData = (): MonthlyData[] => {
    switch(salesPeriod) {
      case 'weekly':
        // For demo purposes, we'll just show the last 7 days' worth of data
        return monthlySalesData.slice(-7);
      case 'yearly':
        // For yearly, we'll show quarterly data by aggregating months
        return [
          { name: 'Q1', sales: 12000, orders: 71 },
          { name: 'Q2', sales: 7060, orders: 41 },
          { name: 'Q3', sales: 8270, orders: 51 },
          { name: 'Q4', sales: 11380, orders: 75 },
        ];
      case 'monthly':
      default:
        return monthlySalesData;
    }
  };

  // Filter orders based on selected filter
  const getFilteredOrders = (): OrderData[] => {
    if (ordersFilter === 'all') return recentOrders;
    return recentOrders.filter(order => order.status === ordersFilter);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Loading Dashboard...</h2>
            <p>Please wait while we fetch your data</p>
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
          <h1>Supplier Dashboard</h1>
          <span className="supplier-badge glow-effect">Premium Supplier</span>
        </div>
        <div className="notification-icon">
          <Bell size={20} />
          <span className="notification-badge pulse">3</span>
        </div>
      </div>

      {/* Summary Cards - Replacing Stats Cards */}
      <div className="stats-container">
        <SummaryCard
          title="TOTAL BOOKS"
          value="2,547"
          subtitle="+12.5% from last month"
          subtitleColor="#66BB6A"
          bgImage={"assets/icons/book.png"}
        />
        
        <SummaryCard
          title="TOTAL ORDERS"
          value="687"
          subtitle="+8.2% from last month"
          subtitleColor="#66BB6A"
          bgImage="/assets/icons/package.svg"
        />
        
        <SummaryCard
          title="PENDING ORDERS"
          value="42"
          subtitle="-3.1% from last month"
          subtitleColor="#EF5350"
          bgImage="/assets/icons/shopping-cart.svg"
        />
        
        <SummaryCard
          title="TOTAL REVENUE"
          value="$128,547"
          subtitle="+15.8% from last month"
          subtitleColor="#66BB6A"
          bgImage="/assets/icons/dollar-sign.svg"
        />
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        {/* Sales Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Sales Overview</h3>
            <div className="chart-filter">
              <select 
                value={salesPeriod} 
                onChange={(e) => setSalesPeriod(e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={getFilteredSalesData()}
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
                    borderColor: '#4FC3F7',
                    color: '#ECEFF1' 
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  name="Sales ($)" 
                  stroke="#4FC3F7" 
                  fill="#4FC3F7" 
                  fillOpacity={0.2} 
                />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  name="Orders" 
                  stroke="#66BB6A" 
                  fill="#66BB6A" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Book Categories</h3>
            <div className="chart-filter">
              <Filter size={18} />
            </div>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} Books`, 'Quantity']}
                  contentStyle={{ 
                    backgroundColor: '#263238', 
                    borderColor: '#4FC3F7',
                    color: '#ECEFF1' 
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="recent-orders">
        <div className="chart-header">
          <h3 className="chart-title">Recent Orders</h3>
          <div className="chart-filter">
            <select 
              value={ordersFilter} 
              onChange={(e) => setOrdersFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="delivered">Delivered</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Book</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredOrders().map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.bookTitle}</td>
                  <td className="order-date">{formatDate(order.date)}</td>
                  <td>${order.amount.toFixed(2)}</td>
                  <td>
                    <span className={`status-pill ${getStatusClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="view-all-btn">
          <button>View All Orders</button>
        </div>
      </div>

      {/* Book Catalog Section */}
      <div className="book-catalog">
        <div className="chart-header">
          <h3 className="chart-title">Popular Books</h3>
          <div className="chart-filter">
            <button style={{ 
              backgroundColor: 'transparent', 
              border: 'none', 
              color: '#4FC3F7',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
              Manage Inventory <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="book-search">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search books..." />
        </div>
        
        <div className="book-grid">
          {popularBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-cover">
                <img src={book.coverUrl} alt={book.title} />
              </div>
              <div className="book-info">
                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">{book.author}</p>
                <p className="book-stock" style={{ 
                  color: book.stock < 10 ? '#EF5350' : '#66BB6A' 
                }}>
                  In Stock: {book.stock}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;