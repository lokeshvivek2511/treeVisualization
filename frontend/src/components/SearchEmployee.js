import React, { useState } from 'react';

const SearchEmployee = ({ onSearch }) => {
    const [searchId, setSearchId] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchId);
    };

    return (
        <form onSubmit={handleSearch} className="mb-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter Employee ID"
                    className="border p-2 rounded flex-grow"
                />
                <button 
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchEmployee;
