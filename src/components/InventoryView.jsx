import React, { useContext, useEffect, useState } from 'react';
import { inventoryContext } from '../App'; // Assuming you have a context for inventories

function InventoryView() {
    const { inventories, setInventories } = useContext(inventoryContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingInventoryId, setEditingInventoryId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        stock_id: '',
        stock_name: '',
        stock_quantity: '',
    });

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/inventory/');
                if (!response.ok) {
                    throw new Error('Failed to fetch inventories');
                }
                const data = await response.json();
                setInventories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInventories();
    }, [setInventories]);

    const deleteInventory = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/inventory/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete inventory');
            }

            const filteredInventories = inventories.filter((inventory) => inventory.stock_id !== id);
            setInventories(filteredInventories);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = (inventory) => {
        setEditingInventoryId(inventory.stock_id);
        setEditFormData({
            stock_id: inventory.stock_id,
            stock_name: inventory.stock_name,
            stock_quantity: inventory.stock_quantity,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditSubmit = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/inventory/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editFormData)
            });

            if (!response.ok) {
                throw new Error('Failed to update inventory');
            }

            const updatedInventory = await response.json();
            setInventories((prevInventories) =>
                prevInventories.map((inventory) =>
                    inventory.stock_id === id ? updatedInventory : inventory
                )
            );

            setEditingInventoryId(null);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='px-4 py-2 bg-black text-white'>Stock ID</th>
                        <th className='px-4 py-2 bg-black text-white'>Stock Name</th>
                        <th className='px-4 py-2 bg-black text-white'>Stock Quantity</th>
                        <th className='px-4 py-2 bg-black text-white'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        inventories.map((inventory) => (
                            <tr key={inventory.stock_id}>
                                {editingInventoryId === inventory.stock_id ? (
                                    <>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="number"
                                                name="stock_id"
                                                value={editFormData.stock_id}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="stock_name"
                                                value={editFormData.stock_name}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="number"
                                                name="stock_quantity"
                                                value={editFormData.stock_quantity}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <button onClick={() => handleEditSubmit(inventory.stock_id)} className='bg-green-500 text-white px-3 py-1.5 rounded-md'>Save</button>
                                            <button onClick={() => setEditingInventoryId(null)} className='bg-gray-500 text-white px-3 py-1.5 rounded-md ml-2'>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{inventory.stock_id}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{inventory.stock_name}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{inventory.stock_quantity}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <button onClick={() => handleEditClick(inventory)} className='bg-blue-500 text-white px-3 py-1.5 rounded-md'>Edit</button>
                                            <button onClick={() => deleteInventory(inventory.stock_id)} className='bg-red-500 text-white px-3 py-1.5 rounded-md ml-2'>Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default InventoryView;
