import React, { useState } from 'react';
import './Orders.css';

interface Book {
  title: string;
  quantity: number;
  pricePerOne: number;
  totalPrice: number;
  note: string;
}

interface NewBook {
  title: string;
  quantityAvailable: number;
  pricePerOne: number;
  note: string;
}

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

const Orders: React.FC = () => {
  const [orderStep, setOrderStep] = useState('initial'); // initial, supplierReview, requesterConfirm, accountantReview, final
  const [books, setBooks] = useState<Book[]>([
    { title: 'Clean Code', quantity: 5, pricePerOne: 35, totalPrice: 5 * 35, note: '' },
    { title: 'Design Patterns', quantity: 3, pricePerOne: 50, totalPrice: 3 * 50, note: '' },
  ]);
  const [rejectionReason, setRejectionReason] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [formLocked, setFormLocked] = useState(false);
  const [newBooks, setNewBooks] = useState<NewBook[]>([]);
  const [tempNewBook, setTempNewBook] = useState<NewBook>({ title: '', quantityAvailable: 0, pricePerOne: 1, note: '' });

  const handleAddBook = () => {
    if (formLocked) {
      alert('Form is locked. Restart the process to make changes.');
      return;
    }
    const randomPrice = Math.floor(Math.random() * 90) + 10; // Random price between $10 and $100
    setBooks([...books, { title: '', quantity: 0, pricePerOne: randomPrice, totalPrice: 0, note: '' }]);
  };

  const handleBookChange = (index: number, field: keyof Book, value: string | number) => {
    if (formLocked) {
      alert('Form is locked. Restart the process to make changes.');
      return;
    }
    const updatedBooks = [...books];
    updatedBooks[index][field] = value as never;
    if (field === 'quantity') {
      updatedBooks[index].totalPrice = updatedBooks[index].quantity * updatedBooks[index].pricePerOne;
    }
    setBooks(updatedBooks);
  };

  const handleRemoveBook = (index: number) => {
    if (formLocked) {
      alert('Form is locked. Restart the process to make changes.');
      return;
    }
    setBooks(books.filter((_, i) => i !== index));
  };

  const handleSubmitOrder = () => {
    if (books.some(book => !book.title || book.quantity <= 0 || book.pricePerOne <= 0)) {
      alert('Please ensure all books have a title, quantity, and price per one.');
      return;
    }
    setFormLocked(true);
    setOrderStep('supplierReview');
  };

  const handleSupplierAccept = () => {
    setOrderStep('requesterConfirm');
  };

  const handleSupplierReject = () => {
    setOrderStep('initial');
    setFormLocked(false);
    setRejectionReason('Supplier cannot fulfill the order due to stock issues.');
  };

  const handleRequesterConfirm = () => {
    setOrderStep('accountantReview');
  };

  const handleAccountantAccept = () => {
    setOrderStep('final');
  };

  const handleAccountantReject = () => {
    setOrderStep('initial');
    setFormLocked(false);
    setRejectionReason('Accountant rejected due to budget constraints.');
  };

  const handleRestart = () => {
    setOrderStep('initial');
    setFormLocked(false);
    setBooks([]);
    setRejectionReason('');
    setChatMessages([]);
    setNewBooks([]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { sender: 'Supplier', message: newMessage, timestamp: new Date().toLocaleTimeString() },
      ]);
      setNewMessage('');
    }
  };

  const handleNewBookChange = (field: keyof NewBook, value: string | number) => {
    setTempNewBook({ ...tempNewBook, [field]: value as never });
  };

  const handleAddNewBook = () => {
    if (tempNewBook.title && tempNewBook.quantityAvailable > 0 && tempNewBook.pricePerOne > 0) {
      setNewBooks([...newBooks, { ...tempNewBook }]);
      alert(`New book "${tempNewBook.title}" with price $${tempNewBook.pricePerOne} has been sent to Department Manager. Note: ${tempNewBook.note || 'None'}`);
      setTempNewBook({ title: '', quantityAvailable: 0, pricePerOne: 0, note: '' });
    } else {
      alert('Please fill in all required fields with valid values.');
    }
  };

  const calculateTotalOrderValue = () => {
    return books.reduce((total, book) => total + book.totalPrice, 0).toFixed(2);
  };

  return (
    <div className="orders-container">
      <h2 className="page-title">Orders </h2>
      
      <div className="split-layout">
        {/* Left Side - Incoming Orders */}
        <div className="orders-panel">
          <div className="panel-header">
            <h3>Incoming Book Orders</h3>
            <span className="status-badge">
              {orderStep === 'initial' && 'Draft'}
              {orderStep === 'supplierReview' && 'Review Pending'}
              {orderStep === 'requesterConfirm' && 'Awaiting Confirmation'}
              {orderStep === 'accountantReview' && 'Awaiting Approval'}
              {orderStep === 'final' && 'Order Complete'}
            </span>
          </div>
          
          <div className="order-details">
            <div className="order-meta">
              <div className="order-number">Order #1 - Computer Science</div>
              <div className="order-info">
                <span>Requester: Motasem Alatawna</span>
                <span>Submitted: 13/05/2025, 20:17:00</span>
                <span className="order-total">Total: ${calculateTotalOrderValue()}</span>
              </div>
            </div>

            <div className="book-list">
              <table>
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Note</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={book.title}
                          onChange={(e) => handleBookChange(index, 'title', e.target.value)}
                          disabled={formLocked}
                          className="input-field"
                          placeholder="Enter title"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={book.quantity}
                          onChange={(e) => handleBookChange(index, 'quantity', parseInt(e.target.value) || 0)}
                          disabled={formLocked}
                          className="input-field"
                          placeholder="Qty"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={book.pricePerOne.toFixed(2)}
                          disabled={true}
                          className="input-field input-field-disabled"
                          step="0.01"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={book.totalPrice.toFixed(2)}
                          disabled={true}
                          className="input-field input-field-disabled"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={book.note}
                          onChange={(e) => handleBookChange(index, 'note', e.target.value)}
                          disabled={formLocked}
                          className="input-field"
                          placeholder="Add note"
                        />
                      </td>
                      <td>
                        {!formLocked && (
                          <button
                            onClick={() => handleRemoveBook(index)}
                            className="icon-button"
                            title="Remove Book"
                          >
                            ✕
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {!formLocked && (
                <button onClick={handleAddBook} className="add-book-button">
                  + Add Another Book
                </button>
              )}
            </div>

            {rejectionReason && (
              <div className="rejection-message">
                <span>⚠️ {rejectionReason}</span>
              </div>
            )}

            <div className="chat-section">
              <h4>Communication</h4>
              <div className="chat-messages">
                {chatMessages.length === 0 ? (
                  <div className="no-messages">No messages yet. Start a conversation with the requester.</div>
                ) : (
                  chatMessages.map((msg, index) => (
                    <div key={index} className="message">
                      <div className="message-header">
                        <span className="message-sender">{msg.sender}</span>
                        <span className="message-time">{msg.timestamp}</span>
                      </div>
                      <div className="message-content">{msg.message}</div>
                    </div>
                  ))
                )}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={handleSendMessage} className="send-button">
                  Send
                </button>
              </div>
            </div>

            <div className="actions">
              {orderStep === 'initial' && (
                <button onClick={handleSubmitOrder} className="action-button submit-button">
                  Submit Order
                </button>
              )}
              {orderStep === 'supplierReview' && (
                <>
                  <button onClick={handleSupplierAccept} className="action-button accept-button">
                    Accept Order
                  </button>
                  <button onClick={handleSupplierReject} className="action-button reject-button">
                    Reject Order
                  </button>
                </>
              )}
              {orderStep === 'requesterConfirm' && (
                <button onClick={handleRequesterConfirm} className="action-button confirm-button">
                  Confirm Order
                </button>
              )}
              {orderStep === 'accountantReview' && (
                <>
                  <button onClick={handleAccountantAccept} className="action-button approve-button">
                    Approve
                  </button>
                  <button onClick={handleAccountantReject} className="action-button reject-button">
                    Reject
                  </button>
                </>
              )}
              {orderStep === 'final' && (
                <div className="success-message">
                  <span>✓ Order has been successfully placed!</span>
                </div>
              )}
              {orderStep !== 'initial' && (
                <button onClick={handleRestart} className="action-button restart-button">
                  Restart Process
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - New Books Form */}
        <div className="new-books-panel">
          <div className="panel-header">
            <h3>Inform New Books</h3>
          </div>
          
          <div className="new-books-form">
            <div className="form-section">
              <h4>Book Information</h4>
              <div className="form-group">
                <label>Book Title</label>
                <input
                  type="text"
                  value={tempNewBook.title}
                  onChange={(e) => handleNewBookChange('title', e.target.value)}
                  className="input-field"
                  placeholder="Enter book title"
                />
              </div>
              
              <div className="form-group">
                <label>Quantity Available</label>
                <input
                  type="number"
                  value={tempNewBook.quantityAvailable}
                  onChange={(e) => handleNewBookChange('quantityAvailable', parseInt(e.target.value) || 0)}
                  className="input-field"
                  placeholder="Enter quantity available"
                />
              </div>
              
              <div className="form-group">
                <label>Price Per One</label>
                <input
                  type="number"
                  value={tempNewBook.pricePerOne}
                  onChange={(e) => handleNewBookChange('pricePerOne', parseFloat(e.target.value) || 0)}
                  className="input-field"
                  placeholder="Enter price per one"
                  step="1"
                />
              </div>
              
              <div className="form-group">
                <label>Note (Optional)</label>
                <textarea
                  value={tempNewBook.note}
                  onChange={(e) => handleNewBookChange('note', e.target.value)}
                  className="textarea-field"
                  placeholder="Enter any additional information about this book"
                ></textarea>
              </div>
              
              <button onClick={handleAddNewBook} className="action-button submit-button full-width">
                Send to Department Manager
              </button>
            </div>
            
            {newBooks.length > 0 && (
              <div className="form-section">
                <h4>Recently Informed Books</h4>
                <div className="informed-books-list">
                  {newBooks.map((book, index) => (
                    <div key={index} className="informed-book">
                      <div className="book-title">{book.title}</div>
                      <div className="book-details">
                        <span>Available: {book.quantityAvailable}</span>
                        <span>Price: ${book.pricePerOne.toFixed(2)}</span>
                      </div>
                      {book.note && <div className="book-note">Note: {book.note}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;