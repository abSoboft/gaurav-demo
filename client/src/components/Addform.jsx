import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addform = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const [formData, setFormData] = useState({
    prNumber: "",
    prStatus: "",
    totalValue: "",
    headerText: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isoEnterDate = new Date(formData.enterDate).toISOString();

      const response = await axios.post('http://localhost:8000/api/add', {
        PR_NUM: formData.prNumber,
        PR_STATUS: formData.prStatus,
        TotalValue: parseFloat(formData.totalValue), // Convert to number
        DESCRIPTION: formData.headerText,
        ENTERDATE: isoEnterDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      // alert("Transaction created successfully");
      navigate("/")
      setFormData({
        prNumber: "",
        prStatus: "",
        totalValue: "",
        headerText: "",
        enetrDate:""
      });
  
    } catch (error) {
      
    }
  };



  return (
    <div className="isolate bg-white px-6 py-10 sm:py-10 lg:px-8">
    <div
      className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      aria-hidden="true"
    >
      <div
        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
    </div>
    
    <form onSubmit={handleSubmit} className="mx-auto mt-2 max-w-xl sm:mt-2">
    <div className="mx-auto max-w-2xl text-start mb-10">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Add Transaction</h2>
    </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor="prNumber" className="flex text-sm font-semibold leading-6 text-gray-900">
            PR Number
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              placeholder="PR Number"
              name="prNumber"
              id="prNumber"
              value={formData.prNumber}
              onChange={handleChange}
              className="pl-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="prStatus" className="flex text-sm font-semibold leading-6 text-gray-900">
            PR Status
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              placeholder="PR Status"
              name="prStatus"
              id="prStatus"
              value={formData.prStatus}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="totalValue" className="flex text-sm font-semibold leading-6 text-gray-900">
            Total Value
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="totalValue"
              placeholder="Total Value"
              id="totalValue"
              value={formData.totalValue}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          </div>
          <div>
          <label htmlFor="totalValue" className="flex text-sm font-semibold leading-6 text-gray-900">
            Enter Date
          </label>
          <div className="mt-2.5">
            <input
              type="Date"
              name="enterDate"
              placeholder="Enter Date"
              id="totalValue"
              value={formData.enterDate}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>


        </div>
        <div className="sm:col-span-2">
          <label htmlFor="headerText" className="flex text-sm font-semibold leading-6 text-gray-900">
            Header Text
          </label>
          <div className="mt-2.5">
            <textarea
              name="headerText"
              placeholder="Add Header Text here ..."
              id="headerText"
              value={formData.headerText}
              onChange={handleChange}
              rows={4}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleClick}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  </div>
  )
}


export default Addform;
