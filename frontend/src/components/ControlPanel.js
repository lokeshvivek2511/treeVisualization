import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import DeleteEmployee from './DeleteEmployee';
import UpdateEmployee from './UpdateEmployee';
import SearchEmployee from './SearchEmployee';

const ControlPanel = ({ onEmployeeAdded, onEmployeeDeleted, onEmployeeUpdated, onSearch }) => {
    const [activeForm, setActiveForm] = useState(null);

    const renderForm = () => {
        switch (activeForm) {
            case 'add':
                return <EmployeeForm onEmployeeAdded={() => {
                    onEmployeeAdded();
                    setActiveForm(null);
                }} />;
            case 'update':
                return <UpdateEmployee onEmployeeUpdated={() => {
                    onEmployeeUpdated();
                    setActiveForm(null);
                }} />;
            case 'delete':
                return <DeleteEmployee onEmployeeDeleted={() => {
                    onEmployeeDeleted();
                    setActiveForm(null);
                }} />;
            case 'search':
                return <SearchEmployee onSearch={onSearch} />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex space-x-2">
                <button
                    onClick={() => setActiveForm(activeForm === 'add' ? null : 'add')}
                    className={`px-4 py-2 rounded ${
                        activeForm === 'add' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                    }`}
                >
                    Add Employee
                </button>
                <button
                    onClick={() => setActiveForm(activeForm === 'update' ? null : 'update')}
                    className={`px-4 py-2 rounded ${
                        activeForm === 'update' 
                            ? 'bg-yellow-600 text-white' 
                            : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600'
                    }`}
                >
                    Update Employee
                </button>
                <button
                    onClick={() => setActiveForm(activeForm === 'delete' ? null : 'delete')}
                    className={`px-4 py-2 rounded ${
                        activeForm === 'delete' 
                            ? 'bg-red-600 text-white' 
                            : 'bg-red-100 hover:bg-red-200 text-red-600'
                    }`}
                >
                    Delete Employee
                </button>
                <button
                    onClick={() => setActiveForm(activeForm === 'search' ? null : 'search')}
                    className={`px-4 py-2 rounded ${
                        activeForm === 'search' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-green-100 hover:bg-green-200 text-green-600'
                    }`}
                >
                    Search Employee
                </button>
            </div>
            {activeForm && (
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl mb-4 capitalize">{activeForm} Employee</h2>
                    {renderForm()}
                </div>
            )}
        </div>
    );
};

export default ControlPanel;
