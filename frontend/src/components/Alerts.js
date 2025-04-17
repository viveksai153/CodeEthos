// Alerts.js
import React, { useEffect } from 'react';

const Alerts = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto-dismiss after 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    const getAlertStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-black';
            case 'info':
            default:
                return 'bg-blue-500 text-white';
        }
    };

    return (
        <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 p-4 rounded-lg shadow-lg ${getAlertStyles()} transition-opacity duration-500 ease-out opacity-100`}>
            <p>{message}</p>
        </div>
    );
};

export default Alerts;
