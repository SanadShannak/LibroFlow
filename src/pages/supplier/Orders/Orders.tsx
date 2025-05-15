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
  const [isNewBookModalOpen, setIsNewBookModalOpen] = useState(false);
  const [newBooks, setNewBooks] = useState<NewBook[]>([]);
  const [tempNewBook, setTempNewBook] = useState<NewBook>({ title: '', quantityAvailable: 0, pricePerOne: 0, note: '' });

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

  const handleOpenNewBookModal = () => {
    setIsNewBookModalOpen(true);
  };

  const handleCloseNewBookModal = () => {
    setIsNewBookModalOpen(false);
    setTempNewBook({ title: '', quantityAvailable: 0, pricePerOne: 0, note: '' });
  };

  const handleNewBookChange = (field: keyof NewBook, value: string | number) => {
    setTempNewBook({ ...tempNewBook, [field]: value as never });
  };

  const handleAddNewBook = () => {
    if (tempNewBook.title && tempNewBook.quantityAvailable > 0 && tempNewBook.pricePerOne > 0) {
      setNewBooks([...newBooks, { ...tempNewBook }]);
      alert(`New book "${tempNewBook.title}" with price $${tempNewBook.pricePerOne} has been sent to Department Manager. Note: ${tempNewBook.note || 'None'}`);
      handleCloseNewBookModal();
    } else {
      alert('Please fill in all required fields with valid values.');
    }
  };

  return (
    <div className="orders-container">
      <h2 className="text-2xl font-bold mb-4">Incoming Book Orders</h2>
      {!formLocked && (
        <button
          onClick={handleOpenNewBookModal}
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Inform New Books
        </button>
      )}
      <div className="order-details">
        <h3 className="text-lg font-semibold mb-2">Order #1 - Computer Science</h3>
        <p className="text-gray-400">Requester: Motasem Alatawna</p>
        <p className="text-gray-400">Submitted: 13/05/2025, 20:17:00</p>

        <div className="book-list mt-4">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Quantity</th>
                <th>Price Per One</th>
                <th>Total Price</th>
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
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={book.quantity}
                      onChange={(e) => handleBookChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      disabled={formLocked}
                      className="input-field"
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
                      placeholder="Enter note"
                    />
                  </td>
                  <td>
                    {!formLocked && (
                      <button
                        onClick={() => handleRemoveBook(index)}
                        className="cancel-button"
                      >
                        X
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!formLocked && (
            <button onClick={handleAddBook} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Add Book
            </button>
          )}
        </div>

        {newBooks.length > 0 && (
          <div className="new-books-section mt-4">
            <h4 className="text-md font-semibold mb-2">New Books Informed to Department Manager</h4>
            <ul>
              {newBooks.map((book, index) => (
                <li key={index} className="text-gray-300">
                  {book.title} - Quantity Available: {book.quantityAvailable}, Price: ${book.pricePerOne}, Note: {book.note || 'None'}
                </li>
              ))}
            </ul>
          </div>
        )}

        {rejectionReason && (
          <div className="rejection-message mt-4 p-4 bg-red-600 text-white rounded">
            {rejectionReason}
          </div>
        )}

        <div className="chat-section mt-6">
          <h4 className="text-md font-semibold mb-2">Chat with Requester</h4>
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
          {orderStep === 'supplierReview' && (
            <>
              <button onClick={handleSupplierAccept} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                Accept
              </button>
              <button onClick={handleSupplierReject} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                Reject
              </button>
            </>
          )}
          {orderStep === 'requesterConfirm' && (
            <button onClick={handleRequesterConfirm} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Confirm Order
            </button>
          )}
          {orderStep === 'accountantReview' && (
            <>
              <button onClick={handleAccountantAccept} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                Approve
              </button>
              <button onClick={handleAccountantReject} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                Reject
              </button>
            </>
          )}
          {orderStep === 'final' && (
            <p className="text-green-400">Order has been successfully placed!</p>
          )}
          {orderStep !== 'initial' && (
            <button onClick={handleRestart} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
              Restart Process
            </button>
          )}
        </div>
      </div>

      {isNewBookModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Inform New Books to Department Manager</h3>
            <div className="modal-content">
              <div className="modal-field">
                <label>Book Title</label>
                <input
                  type="text"
                  value={tempNewBook.title}
                  onChange={(e) => handleNewBookChange('title', e.target.value)}
                  className="input-field"
                  placeholder="Enter book title"
                />
              </div>
              <div className="modal-field">
                <label>Quantity Available</label>
                <input
                  type="number"
                  value={tempNewBook.quantityAvailable}
                  onChange={(e) => handleNewBookChange('quantityAvailable', parseInt(e.target.value) || 0)}
                  className="input-field"
                  placeholder="Enter quantity available"
                />
              </div>
              <div className="modal-field">
                <label>Price Per One</label>
                <input
                  type="number"
                  value={tempNewBook.pricePerOne}
                  onChange={(e) => handleNewBookChange('pricePerOne', parseFloat(e.target.value) || 0)}
                  className="input-field"
                  placeholder="Enter price per one"
                  step="0.01"
                />
              </div>
              <div className="modal-field">
                <label>Note (Optional)</label>
                <input
                  type="text"
                  value={tempNewBook.note}
                  onChange={(e) => handleNewBookChange('note', e.target.value)}
                  className="input-field"
                  placeholder="Enter note"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-button modal-button-save" onClick={handleAddNewBook}>
                Send to Department Manager
              </button>
              <button className="modal-button modal-button-cancel" onClick={handleCloseNewBookModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;