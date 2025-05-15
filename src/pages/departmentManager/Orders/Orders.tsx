import React, { useState } from 'react';
import './Orders.css';

interface Book {
  title: string;
  quantity: number;
  price?: number; // Optional price, set by supplier
}

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

const suppliers = [
  'BookWorld Distributors',
  'Global Books Supply',
  'Literary Hub',
  'Academic Press',
];

const Orders: React.FC = () => {
  const [orderStep, setOrderStep] = useState('selectSupplier'); // New initial step
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [orderName, setOrderName] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [formLocked, setFormLocked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempOrderName, setTempOrderName] = useState('');
  const [tempBooks, setTempBooks] = useState<Book[]>([]);
  const [showSubmitted, setShowSubmitted] = useState(false);

  const handleSelectSupplier = (supplier: string) => {
    setSelectedSupplier(supplier);
    setOrderStep('initial');
  };

  const handleOpenModal = () => {
    if (formLocked) {
      alert('Form is locked. Restart the process to make changes.');
      return;
    }
    setIsModalOpen(true);
    setTempOrderName(orderName || '');
    setTempBooks(books.length > 0 ? books : [{ title: '', quantity: 0 }]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTempOrderName('');
    setTempBooks([]);
  };

  const handleAddBookInModal = () => {
    setTempBooks([...tempBooks, { title: '', quantity: 0 }]);
  };

  const handleBookChangeInModal = (index: number, field: keyof Book, value: string | number) => {
    const updatedBooks = [...tempBooks];
    updatedBooks[index][field] = value as never;
    setTempBooks(updatedBooks);
  };

  const handleSaveOrder = () => {
    setOrderName(tempOrderName);
    setBooks(tempBooks);
    setIsModalOpen(false);
  };

  const handleSubmitOrder = () => {
    if (!orderName || books.length === 0) {
      alert('Please create an order with a name and at least one book before submitting.');
      return;
    }
    setFormLocked(true);
    setOrderStep('supplierReview');
    setShowSubmitted(true);
  };

  const handleRestart = () => {
    setOrderStep('selectSupplier');
    setSelectedSupplier(null);
    setFormLocked(false);
    setBooks([]);
    setOrderName('');
    setRejectionReason('');
    setChatMessages([]);
    setShowSubmitted(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { sender: 'Department Manager', message: newMessage, timestamp: new Date().toLocaleTimeString() },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="orders-container">
      <h2 className="text-2xl font-bold mb-4">Outgoing Book Orders</h2>
      <div className="order-details">
        {orderStep === 'selectSupplier' ? (
          <div className="supplier-selection">
            <h3 className="text-lg font-semibold mb-4">Select a Supplier</h3>
            <p className="text-gray-400 mb-4">Choose a supplier to place your order with:</p>
            <div className="supplier-options">
              {suppliers.map((supplier) => (
                <button
                  key={supplier}
                  className="supplier-button"
                  onClick={() => handleSelectSupplier(supplier)}
                >
                  {supplier}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-2">
              {orderName ? `Order - ${orderName}` : 'No Order Created'}
            </h3>
            <p className="text-gray-400">Department Manager: Motasem Alatawna</p>
            {selectedSupplier && (
              <p className="text-gray-400">Supplier: {selectedSupplier}</p>
            )}
            {showSubmitted && (
              <p className="text-gray-400">Submitted: 13/05/2025, 15:50:00</p>
            )}

            {books.length > 0 && (
              <div className="book-list mt-4">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th>Book Title</th>
                      <th>Quantity</th>
                      <th>Price (Set by Supplier)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            value={book.title}
                            disabled={true}
                            className="input-field input-field-disabled"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={book.quantity}
                            disabled={true}
                            className="input-field input-field-disabled"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={book.price ?? ''}
                            disabled={true}
                            className="input-field input-field-disabled"
                            placeholder="Set by Supplier"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!formLocked && (
              <button className="add-book-button mt-2" onClick={handleOpenModal}>
                <span className="plus-icon">+</span> Create Order
              </button>
            )}

            {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3 className="modal-title">Create New Order</h3>
                  <div className="modal-content">
                    <div className="modal-field">
                      <label>Order Name</label>
                      <input
                        type="text"
                        value={tempOrderName}
                        onChange={(e) => setTempOrderName(e.target.value)}
                        className="input-field"
                        placeholder="Enter order name"
                      />
                    </div>
                    <div className="modal-book-list">
                      <h4>Books</h4>
                      {tempBooks.map((book, index) => (
                        <div key={index} className="modal-book-row">
                          <input
                            type="text"
                            value={book.title}
                            onChange={(e) => handleBookChangeInModal(index, 'title', e.target.value)}
                            className="input-field"
                            placeholder="Enter book title"
                          />
                          <input
                            type="number"
                            value={book.quantity}
                            onChange={(e) => handleBookChangeInModal(index, 'quantity', parseInt(e.target.value))}
                            className="input-field"
                            placeholder="Enter quantity"
                          />
                        </div>
                      ))}
                      <button className="modal-add-book" onClick={handleAddBookInModal}>
                        <span className="plus-icon">+</span> Add Another Book
                      </button>
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button className="modal-button modal-button-save" onClick={handleSaveOrder}>
                      Save Order
                    </button>
                    <button className="modal-button modal-button-cancel" onClick={handleCloseModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {rejectionReason && (
              <div className="rejection-message mt-4 p-4 bg-red-600 text-white rounded">
                {rejectionReason}
              </div>
            )}

            <div className="chat-section mt-6">
              <h4 className="text-md font-semibold mb-2">Chat with Supplier</h4>
              <div className="chat-messages">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="mb-2">
                    <span className="text-gray-400 text-sm">[{msg.timestamp}] </span>
                    <span className="font-bold">{msg.sender}: </span>
                    <span>{msg.message}</span>
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 input-field mr-2"
                  placeholder="Type a message..."
                />
                <button onClick={handleSendMessage} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                  Send
                </button>
              </div>
            </div>

            <div className="actions">
              {orderStep === 'initial' && (
                <button onClick={handleSubmitOrder} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                  Submit Order
                </button>
              )}
              {orderStep === 'accountantReview' && (
                <button onClick={handleRestart} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                  Restart Process
                </button>
              )}
              {orderStep === 'final' && (
                <p className="text-green-400">Order has been successfully placed!</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
