import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // PrimeReact CSS
import "primeicons/primeicons.css";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import "./dropdown.scss";


export default function FilterDemo() {
  const [data, setData] = useState([
    {
      label: "Germany",
      code: "DE",
      items: [],
    },
  ]);
  const [filterValues, setFilterValues] = useState({});

  const [page, setPage] = useState(1);

  const [limit] = useState(100);
  const [selectedItem, setSelectedItem] = useState(null);

  const [search, setSearch] = useState("");

  const currentPageRef = useRef(1);
  const observer = useRef(null);
  const lastRowRef = useRef(null);
  const paginatinDataRef = useRef(null);
  const loadingRef = useRef(false);

  const fetchData = async (
    pageTemp = currentPageRef.current,
    limitTemp = limit,
    searchTemp = search,
    filterValuesTemp = filterValues
  ) => {
    loadingRef.current = true;
    try {
      const filterParams = Object.entries(filterValuesTemp)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      const res = await axios
        .get(
          `http://localhost:8000/api/getall?page=${pageTemp}&limit=${limitTemp}&search=${searchTemp}&${filterParams}`
        )
        setData((prevData) => {
          const newDataWithIndex = res.data.data.map((item, index) => ({
            ...item,
            index, 
          }));
        
          return [
            {
              label: "Germany",
              code: "DE",
              items: [...prevData[0].items, ...newDataWithIndex],
            },
          ];
        });
        
          paginatinDataRef.current = res.data.pagination;
      loadingRef.current = false;
        
    } catch (error) {
      console.error("Error fetching data", error);
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    setData([
      {
        label: "Germany",
        code: "DE",
        items: [],
      },
    ])
    paginatinDataRef.current = 1;
    setPage(1);
    fetchData();
  }, [filterValues, search]);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMoreData()) {
        currentPageRef.current += 1;
        setPage(currentPageRef.current);
        fetchData();
      }
    });

    if (lastRowRef.current) {
      observer.current.observe(lastRowRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [data]);

  const hasMoreData = () => {
    return paginatinDataRef.current?.hasNextPage && !loadingRef.current
      ? true
      : false;
  };

  

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
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
    setFilterValues((prevValues) => ({
      ...prevValues,
      PR_NUM: "",
      TotalValue: "",
      dateTo: "",
      dateFrom: "",
      DESCRIPTION: "",
      PR_STATUS: "",
    }));
    setFilterModal4(false);
    setFilterModal5(false);

    setSearch(e.filter);
  };

  const selectedValues = (e) => {
    console.log("Value ", e.value);
    setSelectedItem(e.value)
  };

  const selectedDataTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option?.DESCRIPTION}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const dataOptionTemplate = (option) => {
    // console.log('index: ', index);
    console.log('option: ', option);
    console.log('index', option.index)
    return (
      <div class="container options text-gray-600" ref={option.index === data[0].items.length - 1 ? lastRowRef : null}>
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
        <span>PR NUMBER </span>
        <span>PR STATUS </span>

        <span>HEADER TEXT </span>
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
      <Dropdown
        value={selectedItem}
        onChange={selectedValues}
        options={data}
        filter={true}
        optionLabel="PR_NUM"
        filterBy="PR_NUM,TotalValue,DESCRIPTION"
        onFilter={filterFunction}
        optionGroupLabel="label"
        optionGroupChildren="items"
        itemTemplate={dataOptionTemplate}
        valueTemplate={selectedDataTemplate}
        optionGroupTemplate={groupedItemTemplate}
        className="w-full"
        placeholder=" Select a Transaction"
      />
       {/* {data[0].items.map((item, index) => (
        <div key={index} ref={index === data[0].items.length - 1 ? lastRowRef : null}></div>
      ))} */}
       {/* <div ref={index === data.length - 1 ? lastRowRef : null}></div> */}
    </div>
  );
}
