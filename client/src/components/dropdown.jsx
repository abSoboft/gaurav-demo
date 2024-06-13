import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // PrimeReact CSS
import "primeicons/primeicons.css"; // PrimeIcons CSS
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./dropdown.scss";
import Select from "react-select";

const liveData = [
  {
    PRID: 374,
    PR_STATUS: "Pending",
    TotalValue: "9010101010",
    DESCRIPTION: "Changing Data Live",
    date: "01/05/2024",
  },
  {
    PRID: 543,
    PR_STATUS: "Pending",
    TotalValue: "101010101",
    DESCRIPTION: "Changing Data Live",
    date: "01/05/2024",
  },
  {
    PRID: 543,
    PR_STATUS: "Pending",
    TotalValue: "101010101",
    DESCRIPTION: "Changing Data Live",
    date: "01/05/2024",
  },
  {
    PRID: 543,
    PR_STATUS: "Pending",
    TotalValue: "101010101",
    DESCRIPTION: "Changing Data Live",
    date: "01/05/2024",
  },
  {
    PRID: 543,
    PR_STATUS: "Pending",
    TotalValue: "101010101",
    DESCRIPTION: "Changing Data Live",
    date: "01/05/2024",
  },
];

export default function FilterDemo() {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      label: "Germany",
      code: "DE",
      items: liveData,
    },
  ]);
  const [filterValues, setFilterValues] = useState({});

  const [page, setPage] = useState(1);
  
  const [limit] = useState(100);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async (
    filterValuesTemp = filterValues,
    limitTemp = limit
  ) => {
    try {
      const filterParams = Object.entries(filterValuesTemp)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      const res = await axios.get(
        `http://localhost:8000/api/getall?page=${page}&limit=${limitTemp}&${filterParams}`
      );
      setData([
        {
          label: "Germany",
          code: "DE",
          items: res.data.data,
        },
      ]);

    } catch (error) {
      console.error("Error fetching data", error);
    
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filterValues]);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

 

  const [filterModal1, setFilterModal1] = useState(false);
  const handleFilter1 = () => {
    setFilterModal1(!filterModal1);
  };

  const [filterModal2, setFilterModal2] = useState(false);

  const handleFilter2 = () => {
    setFilterModal2(!filterModal2);
  };

  const [filterModal3, setFilterModal3] = useState(false);

  const handleFilter3 = () => {
    setFilterModal3(!filterModal3);
  };

  const [filterModal4, setFilterModal4] = useState(false);

  const handleFilter4 = () => {
    setFilterModal4(!filterModal4);
  };

  const [filterModal5, setFilterModal5] = useState(false);

  const handleFilter5 = () => {
    setFilterModal5(!filterModal5);
  };

  const filterFunction = (e, search) => {
    console.log(search)
    console.log(e)
  }

  const selectedValues = (e) => {
    console.log('Value ', e.value);
  }

  const selectedDataTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.DESCRIPTION}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const dataOptionTemplate = (option) => {
    return (
      <div class="container options text-gray-600">
        <span className="">{option?.PR_NUM}</span>
        <span>{option?.PR_STATUS}</span>
        <span className="text-wrap pr-5">{option?.DESCRIPTION}?</span>
        <span>{option?.TotalValue}</span>
        <span>{formatDate(option.ENTERDATE)}</span>
      </div>
    );
  };

  const groupedItemTemplate = (option) => {
    return (
      <div class="header text-gray-700">
        <span>
          PR NUMBER{" "}
          <FaFilter className="cursor-pointer" onClick={handleFilter1} />
          {filterModal1 && (
            <div className="absolute z-10 mt-20 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
              <div className="p-2">
                <input
                  id="search-input"
                  className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                  type="text"
                  placeholder="Search PR Number"
                  autoComplete="off"
                  onChange={(e) => {
                    setFilterValues((prevValues) => ({
                      ...prevValues,
                      PR_NUM: e.target.value,
                    }));
                    // setSearch("");
                    // setPage(1);
                    // currentPageRef.current = 1
                  }}
                />
              </div>
            </div>
          )}
        </span>
        <span>
          PR STATUS{" "}
          <FaFilter className="cursor-pointer" onClick={handleFilter2} />
          {filterModal2 && (
            <div className="absolute z-10 mt-20 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
              <Select
                className="w-48 p-2"
                isClearable={true}
                isSearchable={true}
                isDisabled={false}
                isLoading={false}
                isRtl={false}
                onChange={(selectedOption) => {
                  setFilterValues({
                    ...filterValues,
                    PR_STATUS: selectedOption ? selectedOption.value : "",
                  });
                  // setSearch("");
                  // setPage(1);
                  // currentPageRef.current = 1
                }}
                options={[
                  // { value: "", label: "All" },
                  { value: "approved", label: "Approved" },
                  { value: "pending", label: "Pending" },
                ]}
              />
            </div>
          )}
        </span>

        <span>
          HEADER TEXT{" "}
          <FaFilter className="cursor-pointer" onClick={handleFilter3} />
          {filterModal3 && (
            <div className="absolute z-10 mt-20 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
              <div className="p-2">
                <input
                  id="search-input-description"
                  className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                  type="text"
                  placeholder="Search Header Text"
                  autoComplete="off"
                  onChange={(e) => {
                    setFilterValues((prevValues) => ({
                      ...prevValues,
                      DESCRIPTION: e.target.value,
                    }));
                    // setSearch("");
                    // setPage(1);
                    // currentPageRef.current = 1
                  }}
                />
              </div>
            </div>
          )}
        </span>
        <span>
          TOTAL VALUE{" "}
          <FaFilter className="cursor-pointer" onClick={handleFilter4} />
          {filterModal4 && (
            <div className="absolute z-10 right-5 mt-20 w-60 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
              <div className="p-2">
                <input
                  id="search-input-total-value"
                  className="block w-full px-4 py-2 mb-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                  type="text"
                  placeholder="Enter value"
                  autoComplete="off"
                  onChange={(e) => {
                    setFilterValues((prevValues) => ({
                      ...prevValues,
                      TotalValue: e.target.value,
                    }));
                    // setSearch("");
                    // setPage(1);
                    // currentPageRef.current = 1
                  }}
                />
              </div>
            </div>
          )}
        </span>
        <span>
          ENTER DATE{" "}
          <FaFilter className="cursor-pointer" onClick={handleFilter5} />
          {filterModal5 && (
            <div className="absolute z-10 right-0 mt-40 w-72 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
              <div className="p-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <label htmlFor="date-from" className="text-xs">
                      Date From:
                    </label>
                    <input
                      id="date-from"
                      className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                      type="date"
                      onChange={(e) => {
                        setFilterValues((prevValues) => ({
                          ...prevValues,
                          dateFrom: e.target.value,
                        }));
                        // setSearch("");
                        // setPage(1);
                        // currentPageRef.current = 1
                      }}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label htmlFor="date-to" className="text-xs">
                      Date To:
                    </label>
                    <input
                      id="date-to"
                      className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                      type="date"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </span>
      </div>
    );
  };



  return (
    <div className="card flex mx-auto w-3/4 pt-4">
      {/* <Dropdown
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.value)}
        options={data}
        itemTemplate={dataOptionTemplate}
        valueTemplate={selectedDataTemplate}
        placeholder="Select an item"
        filter
        filterBy="PR_NUM, PR_STATUS, TotalValue, DESCRIPTION"
        style={{ width: "100%" }}
      /> */}
      <Dropdown
        value={selectedItem}
        onChange={selectedValues}
        options={data}
        optionLabel="DESCRIPTION"
        filter={true}
        onFilter={filterFunction}
        optionGroupLabel="label"
        optionGroupChildren="items"
        itemTemplate={dataOptionTemplate}
        valueTemplate={selectedDataTemplate}

        optionGroupTemplate={groupedItemTemplate}
        className="w-full"
        placeholder="Select a Transaction"
      />
      
    </div>
  );
}
