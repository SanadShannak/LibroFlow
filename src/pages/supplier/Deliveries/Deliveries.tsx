import React, { useState, useEffect } from 'react';
import './Deliveries.css';
import { 
  Search, 
  Plus, 
  Calendar, 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Filter, 
  ArrowDownUp, 
  BookOpen,
  Map,
  RefreshCw
} from 'lucide-react';

interface Delivery {
  id: string;
  orderNumber: string;
  books: {
    title: string;
    isbn: string;
    quantity: number;
  }[];
  status: 'pending' | 'in-transit' | 'delivered' | 'delayed';
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  supplier: string;
  destination: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
}

const Deliveries: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{key: keyof Delivery, direction: 'asc' | 'desc'}>({
    key: 'expectedDeliveryDate',
    direction: 'asc'
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - in a real app, you would fetch this from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockDeliveries: Delivery[] = [
        {
          id: "DEL-001",
          orderNumber: "ORD-27491",
          books: [
            { title: "The Great Gatsby", isbn: "9780743273565", quantity: 5 },
            { title: "To Kill a Mockingbird", isbn: "9780061120084", quantity: 3 }
          ],
          status: "in-transit",
          expectedDeliveryDate: "2025-05-15",
          supplier: "BookWorld Distributors",
          destination: "Main Library",
          trackingNumber: "TRK78923456",
          notes: "Priority shipment for book club event",
          createdAt: "2025-05-08"
        },
        {
          id: "DEL-002",
          orderNumber: "ORD-27492",
          books: [
            { title: "1984", isbn: "9780451524935", quantity: 10 },
            { title: "Animal Farm", isbn: "9780451526342", quantity: 10 }
          ],
          status: "pending",
          expectedDeliveryDate: "2025-05-20",
          supplier: "Penguin Random House",
          destination: "South Branch",
          trackingNumber: "TRK65432198",
          createdAt: "2025-05-10"
        },
        {
          id: "DEL-003",
          orderNumber: "ORD-27493",
          books: [
            { title: "Brave New World", isbn: "9780060850524", quantity: 7 }
          ],
          status: "delivered",
          expectedDeliveryDate: "2025-05-09",
          actualDeliveryDate: "2025-05-09",
          supplier: "Academic Publishers",
          destination: "University Library",
          trackingNumber: "TRK12345678",
          notes: "Received in good condition",
          createdAt: "2025-05-05"
        },
        {
          id: "DEL-004",
          orderNumber: "ORD-27494",
          books: [
            { title: "The Catcher in the Rye", isbn: "9780316769488", quantity: 8 },
            { title: "Lord of the Flies", isbn: "9780571056866", quantity: 5 }
          ],
          status: "delayed",
          expectedDeliveryDate: "2025-05-12",
          supplier: "Classic Literature Co.",
          destination: "West Branch",
          trackingNumber: "TRK87654321",
          notes: "Delay due to weather conditions",
          createdAt: "2025-05-07"
        },
        {
          id: "DEL-005",
          orderNumber: "ORD-27495",
          books: [
            { title: "Pride and Prejudice", isbn: "9780141439518", quantity: 3 },
            { title: "Jane Eyre", isbn: "9780141441146", quantity: 3 },
            { title: "Wuthering Heights", isbn: "9780141439556", quantity: 3 }
          ],
          status: "delivered",
          expectedDeliveryDate: "2025-05-08",
          actualDeliveryDate: "2025-05-07",
          supplier: "Heritage Books",
          destination: "Main Library",
          trackingNumber: "TRK45678912",
          createdAt: "2025-05-01"
        }
      ];
      
      setDeliveries(mockDeliveries);
      setFilteredDeliveries(mockDeliveries);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterDeliveries();
  }, [searchTerm, statusFilter, dateFilter, deliveries]);

  const filterDeliveries = () => {
    let filtered = [...deliveries];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        delivery => 
          delivery.orderNumber.toLowerCase().includes(term) ||
          delivery.supplier.toLowerCase().includes(term) ||
          delivery.trackingNumber?.toLowerCase().includes(term) ||
          delivery.books.some(book => 
            book.title.toLowerCase().includes(term) || 
            book.isbn.includes(term)
          )
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(delivery => delivery.status === statusFilter);
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(today.getMonth() - 1);
      
      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter(delivery => 
            new Date(delivery.expectedDeliveryDate).toDateString() === today.toDateString()
          );
          break;
        case 'week':
          filtered = filtered.filter(delivery => 
            new Date(delivery.expectedDeliveryDate) >= oneWeekAgo
          );
          break;
        case 'month':
          filtered = filtered.filter(delivery => 
            new Date(delivery.expectedDeliveryDate) >= oneMonthAgo
          );
          break;
      }
    }
    
    // Apply sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        if ((a[sortConfig.key] ?? '') < (b[sortConfig.key] ?? '')) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if ((a[sortConfig.key] ?? '') > (b[sortConfig.key] ?? '')) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredDeliveries(filtered);
  };

  const sortBy = (key: keyof Delivery) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={18} className="status-icon pending" />;
      case 'in-transit':
        return <Truck size={18} className="status-icon in-transit" />;
      case 'delivered':
        return <CheckCircle size={18} className="status-icon delivered" />;
      case 'delayed':
        return <AlertCircle size={18} className="status-icon delayed" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    return `status-badge ${status}`;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const viewDeliveryDetails = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setShowDetailsModal(true);
  };

  const refreshData = () => {
    setRefreshing(true);
    // In a real application, this would call your API
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getTotalBooks = (delivery: Delivery) => {
    return delivery.books.reduce((sum, book) => sum + book.quantity, 0);
  };

  // Mock function for new delivery (in real app would send to API)
  const handleAddDelivery = () => {
    // This would typically submit to an API
    setShowAddModal(false);
    // Show success message, etc.
  };

  return (
    <div className="deliveries-container">
      <div className="dashboard-header">
        <h1>Manage Deliveries</h1>
        <div className="header-actions">
          <button 
            className="refresh-btn"
            onClick={refreshData}
            disabled={refreshing}
          >
            <RefreshCw size={16} className={refreshing ? 'rotating' : ''} />
            Refresh
          </button>
          <button className="add-delivery-btn" onClick={() => setShowAddModal(true)}>
            <Plus size={16} />
            New Delivery
          </button>
        </div>
      </div>
      
      <div className="filters-container">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by order #, book title, ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <Filter size={16} />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>
          
          <div className="filter-group">
            <Calendar size={16} />
            <select 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="deliveries-stats">
        <div className="stat-card">
          <div className="stat-icon pending-bg">
            <Clock size={20} />
          </div>
          <div className="stat-info">
            <h3>{deliveries.filter(d => d.status === 'pending').length}</h3>
            <p>Pending</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon in-transit-bg">
            <Truck size={20} />
          </div>
          <div className="stat-info">
            <h3>{deliveries.filter(d => d.status === 'in-transit').length}</h3>
            <p>In Transit</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon delivered-bg">
            <CheckCircle size={20} />
          </div>
          <div className="stat-info">
            <h3>{deliveries.filter(d => d.status === 'delivered').length}</h3>
            <p>Delivered</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon delayed-bg">
            <AlertCircle size={20} />
          </div>
          <div className="stat-info">
            <h3>{deliveries.filter(d => d.status === 'delayed').length}</h3>
            <p>Delayed</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading deliveries...</p>
        </div>
      ) : filteredDeliveries.length === 0 ? (
        <div className="empty-state">
          <Package size={48} />
          <h3>No deliveries found</h3>
          <p>Try adjusting your filters or adding a new delivery</p>
        </div>
      ) : (
        <div className="deliveries-table-container">
          <table className="deliveries-table">
            <thead>
              <tr>
                <th onClick={() => sortBy('orderNumber')}>
                  Order #
                  <ArrowDownUp size={14} className="sort-icon" />
                </th>
                <th>Books</th>
                <th onClick={() => sortBy('status')}>
                  Status
                  <ArrowDownUp size={14} className="sort-icon" />
                </th>
                <th onClick={() => sortBy('expectedDeliveryDate')}>
                  Expected Delivery
                  <ArrowDownUp size={14} className="sort-icon" />
                </th>
                <th onClick={() => sortBy('supplier')}>
                  Supplier
                  <ArrowDownUp size={14} className="sort-icon" />
                </th>
                <th>Destination</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.id} onClick={() => viewDeliveryDetails(delivery)} className="clickable-row">
                  <td className="order-number">
                    <span className="order-id">{delivery.orderNumber}</span>
                    {delivery.trackingNumber && (
                      <span className="tracking-number">Tracking: {delivery.trackingNumber}</span>
                    )}
                  </td>
                  <td>
                    <div className="books-info">
                      <BookOpen size={16} />
                      <span>{getTotalBooks(delivery)} items ({delivery.books.length} titles)</span>
                    </div>
                  </td>
                  <td>
                    <div className={getStatusClass(delivery.status)}>
                      {getStatusIcon(delivery.status)}
                      <span>{delivery.status.replace('-', ' ')}</span>
                    </div>
                  </td>
                  <td>
                    {formatDate(delivery.expectedDeliveryDate)}
                    {delivery.status === 'delayed' && (
                      <span className="delay-indicator">Delayed</span>
                    )}
                  </td>
                  <td>{delivery.supplier}</td>
                  <td>
                    <div className="destination-cell">
                      <Map size={14} />
                      <span>{delivery.destination}</span>
                    </div>
                  </td>
                  <td>
                    <button 
                      className="view-details-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        viewDeliveryDetails(delivery);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delivery Details Modal */}
      {showDetailsModal && selectedDelivery && (
        <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="modal delivery-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delivery Details</h2>
              <button className="close-btn" onClick={() => setShowDetailsModal(false)}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="detail-header">
                <div className="order-info">
                  <h3>{selectedDelivery.orderNumber}</h3>
                  <div className={getStatusClass(selectedDelivery.status)}>
                    {getStatusIcon(selectedDelivery.status)}
                    <span>{selectedDelivery.status.replace('-', ' ')}</span>
                  </div>
                </div>
                {selectedDelivery.trackingNumber && (
                  <div className="tracking-info">
                    <span className="label">Tracking Number:</span>
                    <span className="value">{selectedDelivery.trackingNumber}</span>
                  </div>
                )}
              </div>
              
              <div className="detail-section">
                <h4>Delivery Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Supplier:</span>
                    <span className="value">{selectedDelivery.supplier}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Destination:</span>
                    <span className="value">{selectedDelivery.destination}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Expected Delivery:</span>
                    <span className="value">{formatDate(selectedDelivery.expectedDeliveryDate)}</span>
                  </div>
                  {selectedDelivery.actualDeliveryDate && (
                    <div className="detail-item">
                      <span className="label">Actual Delivery:</span>
                      <span className="value">{formatDate(selectedDelivery.actualDeliveryDate)}</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <span className="label">Created:</span>
                    <span className="value">{formatDate(selectedDelivery.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Books ({selectedDelivery.books.length})</h4>
                <table className="books-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>ISBN</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDelivery.books.map((book, idx) => (
                      <tr key={idx}>
                        <td>{book.title}</td>
                        <td>{book.isbn}</td>
                        <td>{book.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}>Total Items:</td>
                      <td>{getTotalBooks(selectedDelivery)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              {selectedDelivery.notes && (
                <div className="detail-section">
                  <h4>Notes</h4>
                  <p className="delivery-notes">{selectedDelivery.notes}</p>
                </div>
              )}
              
              <div className="modal-actions">
                <button className="secondary-btn" onClick={() => setShowDetailsModal(false)}>Close</button>
                {selectedDelivery.status !== 'delivered' && (
                  <button className="primary-btn">Update Status</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add New Delivery Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal add-delivery-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Delivery</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            
            <div className="modal-content">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleAddDelivery();
              }}>
                <div className="form-group">
                  <label htmlFor="orderNumber">Order Number</label>
                  <input type="text" id="orderNumber" placeholder="ORD-XXXXX" required />
                </div>
                
                <div className="form-section">
                  <h4>Book Information</h4>
                  <div className="book-entry">
                    <div className="form-group">
                      <label htmlFor="bookTitle">Book Title</label>
                      <input type="text" id="bookTitle" placeholder="Enter book title" required />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="isbn">ISBN</label>
                        <input type="text" id="isbn" placeholder="Enter ISBN" required />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" id="quantity" min="1" defaultValue="1" required />
                      </div>
                    </div>
                  </div>
                  
                  <button type="button" className="add-book-btn">
                    <Plus size={14} />
                    Add Another Book
                  </button>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="supplier">Supplier</label>
                    <input type="text" id="supplier" placeholder="Supplier name" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="destination">Destination</label>
                    <select id="destination" required>
                      <option value="">Select destination</option>
                      <option value="Main Library">Main Library</option>
                      <option value="South Branch">South Branch</option>
                      <option value="West Branch">West Branch</option>
                      <option value="University Library">University Library</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expectedDeliveryDate">Expected Delivery Date</label>
                    <input type="date" id="expectedDeliveryDate" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="trackingNumber">Tracking Number (Optional)</label>
                    <input type="text" id="trackingNumber" placeholder="Enter tracking number" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="notes">Notes (Optional)</label>
                  <textarea id="notes" placeholder="Add any additional notes" rows={3}></textarea>
                </div>
                
                <div className="modal-actions">
                  <button type="button" className="secondary-btn" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="primary-btn">
                    Create Delivery
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deliveries;