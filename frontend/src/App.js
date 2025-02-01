import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TreeVisualization from './components/TreeVisualization';
import ControlPanel from './components/ControlPanel';

function App() {
    const [treeData, setTreeData] = useState(null);
    const [searchId, setSearchId] = useState('');

    const fetchTreeData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getTree');
            setTreeData(response.data);
        } catch (error) {
            console.error('Error fetching tree data:', error);
        }
    };

    useEffect(() => {
        fetchTreeData();
    }, []);

    const handleSearch = (id) => {
        setSearchId(id);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Employee Hierarchy</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <ControlPanel 
                        onEmployeeAdded={fetchTreeData}
                        onEmployeeDeleted={fetchTreeData}
                        onEmployeeUpdated={fetchTreeData}
                        onSearch={handleSearch}
                    />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl mb-4">Organization Chart</h2>
                    <TreeVisualization data={treeData} searchId={searchId} />
                </div>
            </div>
        </div>
    );
}

export default App;
