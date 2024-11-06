import React, { useContext, useEffect, useState } from 'react';
import { customerContext } from '../App'; // Assuming you have a context for customers

function CustomerView() {
  const { customers, setCustomers } = useContext(customerContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    customer_id: '',
    customer_name: '',
    address: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers/');
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [setCustomers]);

  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }

      const filteredCustomers = customers.filter((customer) => customer.customer_id !== id);
      setCustomers(filteredCustomers);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (customer) => {
    setEditingCustomerId(customer.customer_id);
    setEditFormData({
      customer_id: customer.customer_id,
      customer_name: customer.customer_name,
      address: customer.address,
      phone: customer.phone,
      email: customer.email,
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
      const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editFormData)
      });

      if (!response.ok) {
        throw new Error('Failed to update customer');
      }

      const updatedCustomer = await response.json();
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.customer_id === id ? updatedCustomer : customer
        )
      );

      setEditingCustomerId(null);
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
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-black text-white">Customer ID</th>
            <th className="px-4 py-2 bg-black text-white">Customer Name</th>
            <th className="px-4 py-2 bg-black text-white">Address</th>
            <th className="px-4 py-2 bg-black text-white">Phone</th>
            <th className="px-4 py-2 bg-black text-white">Email</th>
            <th className="px-4 py-2 bg-black text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customer_id}>
              {editingCustomerId === customer.customer_id ? (
                <>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <input
                      type="number"
                      name="customer_id"
                      value={editFormData.customer_id}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                      disabled
                    />
                  </td>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <input
                      type="text"
                      name="customer_name"
                      value={editFormData.customer_name}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  </td>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <button onClick={() => handleEditSubmit(customer.customer_id)} className="bg-green-500 text-white px-3 py-1.5 rounded-md">Save</button>
                    <button onClick={() => setEditingCustomerId(null)} className="bg-gray-500 text-white px-3 py-1.5 rounded-md ml-2">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2 bg-slate-100 text-center">{customer.customer_id}</td>
                  <td className="px-4 py-2 bg-slate-100 text-center">{customer.customer_name}</td>
                  <td className="px-4 py-2 bg-slate-100 text-center">{customer.address}</td>
                  <td className="px-4 py-2 bg-slate-100 text-center">{customer.phone}</td>
                  <td className="px-4 py-2 bg-slate-100 text-center">{customer.email}</td>
                  <td className="px-4 py-2 bg-slate-100 text-center">
                    <button onClick={() => handleEditClick(customer)} className="bg-blue-500 text-white px-3 py-1.5 rounded-md">Edit</button>
                    <button onClick={() => deleteCustomer(customer.customer_id)} className="bg-red-500 text-white px-3 py-1.5 rounded-md ml-2">Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerView;
