"use client"
import axios from "axios"
import React, { useState, useEffect } from 'react';
import NewUserForm from "./NewUserForm";

const Body = () => {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/data');
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (newData) => {
    try {
      const response = await axios.post('http://localhost:8000/data', newData);
      setData([...data, response.data]);
      setFilteredData([...data, response.data]);
      setShowPopup(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.first_name.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [filterValue, data]);

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setItemsPerPage(value);
      setCurrentPage(1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4">
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Enter a name to filter"
          className="border p-2 mr-2 flex-grow"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.first_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.last_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.ip_address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowPopup(true)}
          className="bg-black text-white font-bold py-2 px-4 rounded border-2 border-red-500">
          ADD NEW
        </button>
      </div>
      {showPopup && (
        <NewUserForm
          onClose={() => setShowPopup(false)}
          onSave={handleSave}
        />
      )}
      <div className="flex justify-center mt-4 items-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border bg-gray-200 text-black rounded">
          &lt;
        </button>
        <span className="px-4 py-2 border bg-gray-200 text-black rounded mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border bg-gray-200 text-black rounded">
          &gt;
        </button>
        <input
          type="number"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          placeholder="Items per page"
          className="border p-2 ml-2"
          min="1"
        />
      </div>
    </div>
  );
};

export default Body;
