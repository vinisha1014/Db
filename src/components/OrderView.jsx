import React, { useEffect, useState } from 'react';

function OrderView() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        order_no: '',
        order_date: '',
        customer_id: '',
        total_amount: '',
        status: '',
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders/');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const deleteOrder = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete order');
            }

            const filteredOrders = orders.filter((order) => order.order_no !== id);
            setOrders(filteredOrders);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = (order) => {
        setEditingOrderId(order.order_no);
        setEditFormData({
            order_no: order.order_no,
            order_date: order.order_date,
            customer_id: order.customer_id,
            total_amount: order.total_amount,
            status: order.status,
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
            const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editFormData)
            });

            if (!response.ok) {
                throw new Error('Failed to update order');
            }

            const updatedOrder = await response.json();
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.order_no === id ? updatedOrder : order
                )
            );

            setEditingOrderId(null);
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
                        <th className='px-4 py-2 bg-black text-white'>Order No</th>
                        <th className='px-4 py-2 bg-black text-white'>Order Date</th>
                        <th className='px-4 py-2 bg-black text-white'>Customer ID</th>
                        <th className='px-4 py-2 bg-black text-white'>Total Amount</th>
                        <th className='px-4 py-2 bg-black text-white'>Status</th>
                        <th className='px-4 py-2 bg-black text-white'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order) => (
                            <tr key={order.order_no}>
                                {editingOrderId === order.order_no ? (
                                    <>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="number"
                                                name="order_no"
                                                value={editFormData.order_no}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                                disabled
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="date"
                                                name="order_date"
                                                value={editFormData.order_date}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="number"
                                                name="customer_id"
                                                value={editFormData.customer_id}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="number"
                                                name="total_amount"
                                                value={editFormData.total_amount}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="status"
                                                value={editFormData.status}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <button onClick={() => handleEditSubmit(order.order_no)} className='bg-green-500 text-white px-3 py-1.5 rounded-md'>Save</button>
                                            <button onClick={() => setEditingOrderId(null)} className='bg-gray-500 text-white px-3 py-1.5 rounded-md ml-2'>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{order.order_no}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{order.order_date}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{order.customer_id}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{order.total_amount}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{order.status}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <button onClick={() => handleEditClick(order)} className='bg-blue-500 text-white px-3 py-1.5 rounded-md'>Edit</button>
                                            <button onClick={() => deleteOrder(order.order_no)} className='bg-red-500 text-white px-3 py-1.5 rounded-md ml-2'>Delete</button>
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

export default OrderView;
