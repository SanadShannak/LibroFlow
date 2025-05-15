import React, { useState } from 'react';
import './Orders.css';

interface Book {
  title: string;
  quantity: number;
  price: number;
}

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

const Orders: React.FC = () => {
  const [orderStep, setOrderStep] = useState('accountantReview'); // accountantReview, final, initial (after rejection)
  const [books, setBooks] = useState<Book[]>([
    { title: 'Clean Code', quantity: 5, price: 35 },
    { title: 'Design Patterns', quantity: 3, price: 50 },
  ]);
  const [rejectionReason, setRejectionReason] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showRejectionInput, setShowRejectionInput] = useState(false);

  const handleAccountantAccept = () => {
    setOrderStep('final');
    setShowRejectionInput(false);
  };

  const handleAccountantReject = () => {
    if (!rejectionReason) {
      alert('Please provide a reason for rejection.');
      return;
    }
    setOrderStep('initial');
    setShowRejectionInput(false);
  };

  const handleRestart = () => {
    setOrderStep('accountantReview');
    setBooks([]);
    setRejectionReason('');
    setChatMessages([]);
    setNewMessage('');
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { sender: 'Accountant', message: newMessage, timestamp: new Date().toLocaleTimeString() },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="orders-container">
      <h2 className="text-2xl font-bold mb-4">Order Review (Accountant)</h2>
      <div className="order-details">
        <h3 className="text-lg font-semibold mb-2">Order - Computer Science</h3>
        <p className="text-gray-400">Department Manager: Motasem Alatawna</p>
        <p className="text-gray-400">Received: 13/05/2025, 16:12:00</p>

        {books.length > 0 && (
          <div className="book-list mt-4">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
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
                        value={book.price}
                        disabled={true}
                        className="input-field input-field-disabled"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {rejectionReason && (
          <div className="rejection-message mt-4 p-4 bg-red-600 text-white rounded">
            Rejection Reason: {rejectionReason}
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
          {orderStep === 'accountantReview' && (
            <>
              <button onClick={handleAccountantAccept} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                Approve
              </button>
              <button
                onClick={() => setShowRejectionInput(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </>
          )}
          {orderStep === 'final' && (
            <p className="text-green-400">Order has been officially sent to the supplier!</p>
          )}
          {orderStep === 'initial' && (
            <button onClick={handleRestart} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
              Restart Process
            </button>
          )}
        </div>

        {showRejectionInput && orderStep === 'accountantReview' && (
          <div className="rejection-input mt-4">
            <label className="block mb-2">Reason for Rejection</label>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="input-field w-full h-24"
              placeholder="Enter reason for rejection..."
            />
            <div className="mt-2 flex gap-4">
              <button onClick={handleAccountantReject} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                Submit Rejection
              </button>
              <button onClick={() => setShowRejectionInput(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;