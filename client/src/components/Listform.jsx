import React, { useState, useEffect, useRef } from "react";
import "./Listform.css";
import { FaPlusCircle, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

const liveData = [
  {
    PRID: 374,
    PR_STATUS: "Pending",
    TotalValue: "9010101010",
    DESCRIPTION: "Changing Data Live",
  },
  {
    PRID: 543,
    PR_STATUS: "Pending",
    TotalValue: "101010101",
    DESCRIPTION: "Changing Data Live",
  },
];

const Listform = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add");
  };

  const [data, setData] = useState([]);
  const dataRef = useRef([]);
  const [page, setPage] = useState(1);
  const currentPageRef = useRef(1);
  const [limit] = useState(25);
  const paginatinDataRef = useRef(null);
  const loadingRef = useRef(false);
  const [search, setSearch] = useState("");
  const observer = useRef(null);
  const lastRowRef = useRef(null);

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const [filterModal1, setFilterModal1] = useState(false);
  const [filterValues, setFilterValues] = useState({});

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
      const res = await axios.get(
        `http://localhost:8000/api/getall?page=${pageTemp}&limit=${limitTemp}&search=${searchTemp}&${filterParams}`
      );
      setData((prevData) => [...prevData, ...res.data.data]);
      dataRef.current = [...dataRef.current, ...res.data.data];
      paginatinDataRef.current = res?.data?.pagination;
      loadingRef.current = false;
    } catch (error) {
      console.error("Error fetching data", error);
      loadingRef.current = false;
    }
  };

  // useEffect(() => {
  //   fetchData(page, limit);
  // }, [page, limit]);

  useEffect(() => {
    setData([]);
    dataRef.current = [];
    paginatinDataRef.current = 1;
    setPage(1);
    fetchData();
  }, [filterValues, search]);

  useEffect(() => {
    const interval = setInterval(() => {
      let isFound = false;
      dataRef.current = dataRef.current.map((e) => {
        liveData.forEach((j) => {
          if (e?.PRID === j?.PRID) {
            isFound = true;
            e = { ...e, ...j };
          }
        });
        return e;
      });

      if (isFound) {
        setData(dataRef.current);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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

  const handleSearchChange = (e) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      PR_NUM: "",
      TotalValue: "",
      dateTo: "",
      dateFrom: "",
      DESCRIPTION: "",
      PR_STATUS: "",
    }));
    setFilterModal1(false);
    setFilterModal2(false);
    setFilterModal3(false);
    setFilterModal4(false);
    setFilterModal5(false);

    setSearch(e.target.value);
    setPage(1);
    currentPageRef.current = 1
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const hasMoreData = () => {
    return paginatinDataRef.current?.hasNextPage && !loadingRef.current
      ? true
      : false;
  };

  return (
    <div className="isolate bg-white px-6 py-8 sm:py-8 lg:px-8 h-screen overflow-hidden">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="relative sm:rounded-lg mx-24 h-full overflow-hidden">
        <div className="max-w-screen text-start py-3 flex justify-between px-5">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            All Transactions
          </h2>
          <div className=" gap-2 flex">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
              className="px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
              type="submit"
              className="rounded-md flex gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleClick}
            >
              <FaPlusCircle size={20} /> Add Transaction
            </button>
          </div>
        </div>

        <div className="custom-scrollbar" id="table-wrapper">
          <table className="w-full h-5/6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 ">
              <tr className="w-screen">
                <th className="px-2 py-4" key="PR_NUM">
                  <div className="flex gap-2">
                    <div>PR Number</div>

                    <FaFilter
                      id="dropdown-button"
                      className="cursor-pointer"
                      type="button"
                      onClick={handleFilter1}
                    />
                  </div>
                  {filterModal1 && (
                    <div className="absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
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
                            setSearch("");
                            setPage(1);
                            currentPageRef.current = 1
                          }}
                        />
                      </div>
                    </div>
                  )}
                </th>

                <th className="px-2 py-4 " key="PR_STATUS">
                  <div className="flex gap-2">
                    <div>PR Status</div>
                    <FaFilter
                      id="dropdown-button"
                      className="cursor-pointer"
                      type="button"
                      onClick={handleFilter2}
                    />
                  </div>

                  {filterModal2 && (
                    <div className="absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
                      <Select
                        className="w-48 p-2"
                        isClearable={isClearable}
                        isSearchable={isSearchable}
                        isDisabled={isDisabled}
                        isLoading={isLoading}
                        isRtl={isRtl}
                        onChange={(selectedOption) => {
                          setFilterValues({
                            ...filterValues,
                            PR_STATUS: selectedOption
                              ? selectedOption.value
                              : "",
                          });
                          setSearch("");
                          setPage(1);
                          currentPageRef.current = 1
                        }}
                        options={[
                          { value: "", label: "All" },
                          { value: "approved", label: "Approved" },
                          { value: "pending", label: "Pending" },
                        ]}
                      />
                    </div>
                  )}
                </th>

                {/* </th> */}

                <th className="px-2 py-4 " key="DESCRIPTION">
                  <div className="flex gap-2">
                    <div>Header Text</div>

                    <FaFilter
                      id="dropdown-button-description"
                      className="cursor-pointer"
                      type="button"
                      onClick={handleFilter3}
                    />
                  </div>

                  {filterModal3 && (
                    <div className="absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
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
                            setSearch("");
                            setPage(1);
                            currentPageRef.current = 1
                          }}
                        />
                      </div>
                    </div>
                  )}
                </th>

                <th className=" py-4 " key="TotalValue">
                  <div className="flex gap-1">
                    <div>Total Value</div>

                    <FaFilter
                      id="dropdown-button-total-value"
                      className="cursor-pointer"
                      type="button"
                      onClick={handleFilter4}
                    />
                  </div>

                  {filterModal4 && (
                    <div className="absolute z-10 right-5 mt-2 w-60 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
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
                            setSearch("");
                            setPage(1);
                            currentPageRef.current = 1
                          }}
                        />
                      </div>
                    </div>
                  )}
                </th>

                <th className="px-2 py-4 " key="ENTERDATE">
                  <div className="flex gap-1">
                    <div>Enter Date</div>

                    <FaFilter
                      id="dropdown-button-enter-date"
                      className="cursor-pointer"
                      type="button"
                      onClick={handleFilter5}
                    />
                  </div>
                  {filterModal5 && (
                    <div className="absolute z-10 right-0 mt-2 w-72 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
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
                                setSearch("");
                                setPage(1);
                                currentPageRef.current = 1
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
                              onChange={(e) => {
                                setFilterValues((prevValues) => ({
                                  ...prevValues,
                                  dateTo: e.target.value,
                                }));
                                setSearch("");
                                setPage(1);
                                currentPageRef.current = 1
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    ref={index === data.length - 1 ? lastRowRef : null}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.PR_NUM}
                    </th>
                    <td className="px-6 py-4">{item.PR_STATUS}</td>
                    <td className="px-6 py-4">{item.DESCRIPTION}</td>
                    <td className="px-6 py-4">{item.TotalValue}</td>
                    <td className="px-6 py-4">{formatDate(item.ENTERDATE)}</td>
                  </tr>
                ))
              ) : (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td
                    colSpan={5}
                    className=" h-2/3 py-5 text-2xl font-semibold odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ml-auto mr-auto"
                  >
                    <div className="flex justify-center items-center py-10">
                      No Data
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Listform;
