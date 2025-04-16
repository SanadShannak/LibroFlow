import React, { useEffect } from 'react';
import logo from '../../assets/libroflow_white_with_text.png'; // Adjust the path accordingly

const AdminDashboard: React.FC = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#263238';

    return () => {
      document.body.style.backgroundColor = ''; // Reset to default
    };
  }, []);

  return (
    
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Sidebar with transparent background */}
      <div
        style={{
          width: '250px',
          backgroundColor: '#37474F', // Set sidebar background to transparent
          
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <img
          src={logo}
          alt="Admin Logo"
          style={{ width: '100%', height: 'auto', marginBottom: '20px' }} // Adjust logo size and spacing
        />
      </div>
       {/* Row with specific width and height */}
       <div
        style={{
          width: '87vw', 
          maxWidth: '1698px',  
          height: '10vh',  
          maxHeight: '71px',  
          backgroundColor: '#37474F',
          margin: '0 auto', 
        
        }}
      >
        {/* Content inside the row */}
      </div>

       
       
    </div>
  );
};

export default AdminDashboard;
