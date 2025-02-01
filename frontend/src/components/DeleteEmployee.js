import React, { useState } from 'react';
import axios from 'axios';

const DeleteEmployee = ({ onEmployeeDeleted }) => {
    const [employeeId, setEmployeeId] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:5000/deleteEmployee/${employeeId}`);
            onEmployeeDeleted();
            setEmployeeId('');
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <form onSubmit={handleDelete} className="space-y-4">
            <div>
                <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="Employee ID to delete"
                    className="border p-2 rounded"
                />
            </div>
            <button 
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Delete Employee
            </button>
        </form>
    );
};

export default DeleteEmployee;
