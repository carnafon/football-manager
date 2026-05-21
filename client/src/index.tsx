import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import ManagerDashboard from './pages/ManagerDashboard';

const App = () => {
    return (
        <div>
            <ManagerDashboard />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));