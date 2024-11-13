import React, { useContext, useEffect, useState } from 'react';
import { supplierContext } from '../App';

function SupplierView() {
    const { suppliers, setSuppliers } = useContext(supplierContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingSupplierId, setEditingSupplierId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        supplier_id: '',
        supplier_name: '',
        contact_person: '',
        email: '',
        phone_number: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        items_supplied: '',
    });

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/suppliers/');
                if (!response.ok) {
                    throw new Error('Failed to fetch suppliers');
                }
                const data = await response.json();
                setSuppliers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, [setSuppliers]);

    const deleteSupplier = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/suppliers/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete supplier');
            }

            const filteredSuppliers = suppliers.filter((supplier) => supplier.supplier_id !== id);
            setSuppliers(filteredSuppliers);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = (supplier) => {
        setEditingSupplierId(supplier.supplier_id);
        setEditFormData({
            supplier_id: supplier.supplier_id,
            supplier_name: supplier.supplier_name,
            contact_person: supplier.contact_person,
            email: supplier.email,
            phone_number: supplier.phone_number,
            address: supplier.address,
            city: supplier.city,
            state: supplier.state,
            postal_code: supplier.postal_code,
            country: supplier.country,
            items_supplied: supplier.items_supplied,
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
            const response = await fetch(`http://localhost:5000/api/suppliers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editFormData)
            });

            if (!response.ok) {
                throw new Error('Failed to update supplier');
            }

            const updatedSupplier = await response.json();
            setSuppliers((prevSuppliers) =>
                prevSuppliers.map((supplier) =>
                    supplier.supplier_id === id ? updatedSupplier : supplier
                )
            );

            setEditingSupplierId(null);
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
                        <th className='px-4 py-2 bg-black text-white'>Supplier ID</th>
                        <th className='px-4 py-2 bg-black text-white'>Name</th>
                        <th className='px-4 py-2 bg-black text-white'>Contact Person</th>
                        <th className='px-4 py-2 bg-black text-white'>Email</th>
                        <th className='px-4 py-2 bg-black text-white'>Phone Number</th>
                        <th className='px-4 py-2 bg-black text-white'>Address</th>
                        <th className='px-4 py-2 bg-black text-white'>City</th>
                        <th className='px-4 py-2 bg-black text-white'>State</th>
                        <th className='px-4 py-2 bg-black text-white'>Postal Code</th>
                        <th className='px-4 py-2 bg-black text-white'>Country</th>
                        <th className='px-4 py-2 bg-black text-white'>Items Supplied</th>
                        <th className='px-4 py-2 bg-black text-white'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        suppliers.map((supplier) => (
                            <tr key={supplier.supplier_id}>
                                {editingSupplierId === supplier.supplier_id ? (
                                    <>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="number"
                                                name="supplier_id"
                                                value={editFormData.supplier_id}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="supplier_name"
                                                value={editFormData.supplier_name}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="contact_person"
                                                value={editFormData.contact_person}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="email"
                                                name="email"
                                                value={editFormData.email}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="phone_number"
                                                value={editFormData.phone_number}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="address"
                                                value={editFormData.address}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="city"
                                                value={editFormData.city}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="state"
                                                value={editFormData.state}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="postal_code"
                                                value={editFormData.postal_code}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="country"
                                                value={editFormData.country}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <input
                                                type="text"
                                                name="items_supplied"
                                                value={editFormData.items_supplied}
                                                onChange={handleEditChange}
                                                className='border px-2 py-1'
                                            />
                                        </td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <button onClick={() => handleEditSubmit(supplier.supplier_id)} className='bg-green-500 text-white px-3 py-1.5 rounded-md'>Save</button>
                                            <button onClick={() => setEditingSupplierId(null)} className='bg-gray-500 text-white px-3 py-1.5 rounded-md ml-2'>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{supplier.supplier_id}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{supplier.supplier_name}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{supplier.contact_person}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{supplier.email}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{supplier.phone_number}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{supplier.address}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{supplier.city}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{supplier.state}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{supplier.postal_code}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{supplier.country}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>{supplier.items_supplied}</td>
                                        <td className='px-4 py-2 bg-slate-100 text-center'>
                                            <button onClick={() => handleEditClick(supplier)} className='bg-blue-500 text-white px-3 py-1.5 rounded-md'>Edit</button>
                                            <button onClick={() => deleteSupplier(supplier.supplier_id)} className='bg-red-500 text-white px-3 py-1.5 rounded-md ml-2'>Delete</button>
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

export default SupplierView;
