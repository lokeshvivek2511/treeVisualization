import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = ({ onEmployeeAdded }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        title: '',
        managerId: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/addEmployee', {
                employee: {
                    id: formData.id,
                    name: formData.name,
                    title: formData.title
                },
                managerId: formData.managerId || null
            });
            onEmployeeAdded();
            setFormData({ id: '', name: '', title: '', managerId: '' });
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="Employee ID"
                    className="border p-2 rounded"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Employee Name"
                    className="border p-2 rounded"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Job Title"
                    className="border p-2 rounded"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="managerId"
                    value={formData.managerId}
                    onChange={handleChange}
                    placeholder="Manager ID (optional)"
                    className="border p-2 rounded"
                />
            </div>
            <button 
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Employee
            </button>
        </form>
    );
};

export default EmployeeForm;
