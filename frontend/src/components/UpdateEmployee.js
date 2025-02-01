import React, { useState } from 'react';
import axios from 'axios';

const UpdateEmployee = ({ onEmployeeUpdated }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        title: '',
        newManagerId: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/updateEmployee', formData);
            onEmployeeUpdated();
            setFormData({ id: '', name: '', title: '', newManagerId: '' });
            alert('Employee updated successfully!');
        } catch (error) {
            alert('Error updating employee: ' + error.response?.data?.error || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="Employee ID *"
                    className="border p-2 rounded w-full"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="New Name"
                    className="border p-2 rounded w-full"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="New Title"
                    className="border p-2 rounded w-full"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="newManagerId"
                    value={formData.newManagerId}
                    onChange={handleChange}
                    placeholder="New Manager ID"
                    className="border p-2 rounded w-full"
                />
            </div>
            <button 
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
            >
                Update Employee
            </button>
        </form>
    );
};

export default UpdateEmployee;
