import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import classes from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  return (
    <div className={classes.dashboard}>
      <h1>User Dashboard</h1>
      <Link to="/user/membership">
        <Button>Manage Membership</Button>
      </Link>
    </div>
  );
};

export default Dashboard; 