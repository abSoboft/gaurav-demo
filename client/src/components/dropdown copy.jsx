import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // PrimeReact CSS
import "primeicons/primeicons.css"; // PrimeIcons CSS
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Listform.css";

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
  {
    PRID: 543,
    PR_STATUS: "Pending",
    TotalValue: "101010101",
    DESCRIPTION: "Changing Data Live",
  },
  {
    PRID: 543,
    PR_STATUS: "Pending",
    TotalValue: "101010101",
    DESCRIPTION: "Changing Data Live",
  },
  {
    PRID: 543,
    PR_STATUS: "Pending",
    TotalValue: "101010101",
    DESCRIPTION: "Changing Data Live",
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
  const dataRef = useRef([]);
  const [page, setPage] = useState(1);
  const currentPageRef = useRef(1);
  const [limit] = useState(25);
  const paginatinDataRef = useRef(null);
  const loadingRef = useRef(false);
  const [search, setSearch] = useState("");
  const observer = useRef(null);
  const lastRowRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async (
    pageTemp = currentPageRef.current,
    limitTemp = limit,
    searchTemp = search
  ) => {
    loadingRef.current = true;
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getall?page=${pageTemp}&limit=${limitTemp}&search=${searchTemp}`
      );
      setData({
        label: "Germany",
        code: "DE",
        items: res.data.data,
      });
      dataRef.current = [...dataRef.current, ...res.data.data];
      paginatinDataRef.current = res?.data?.pagination;
      loadingRef.current = false;
    } catch (error) {
      console.error("Error fetching data", error);
      loadingRef.current = false;
    }
  };

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
    currentPageRef.current = 1;
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

  const selectedDataTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.PR_NUM}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const dataOptionTemplate = (option) => {
    return (
      <tr className="w-screen">
        <td className="border px-8 py-2" colSpan="2" style={{ paddingInline : "2rem"}}>{option.PR_NUM}</td>
        <td className="border px-8 py-2" colSpan="2">{option.PR_STATUS}</td>
        <td className="border px-8 py-2" colSpan="2">{option.TotalValue}</td>
        <td className="border px-8 py-2" colSpan="2">{formatDate(option.date)}</td>
        <td className="border px-8 py-2" colSpan="2">{option.DESCRIPTION}</td>
      </tr>
    );
  };

  const groupedItemTemplate = (option) => {
    return (
    
        <tr className="w-screen" >
          <th className="px-8 py-2" colSpan="2" key="PR_NUM" style={{ paddingInline : "1rem"}}>
            PR Number
          </th>
          <th className="px-2 py-2" colSpan="2" key="PR_STATUS">
            PR Status
          </th>
          <th className="px-2 py-2" colSpan="2" key="TotalValue">
            Total Value
          </th>
          <th className="px-2 py-2" colSpan="2" key="date">
            Date
          </th>
          <th className="px-2 py-2" colSpan="2" key="DESCRIPTION">
            Description
          </th>
        </tr>
    );
  };

  return (
    <div className="container mx-auto p-4">
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
        onChange={(e) => setSelectedItem(e.value)}
        options={data}
        // optionLabel="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        itemTemplate={dataOptionTemplate}
        valueTemplate={selectedDataTemplate}
        optionGroupTemplate={groupedItemTemplate}
        className="w-full md:w-14rem"
        placeholder="Select a City"
      />
      <div
        ref={lastRowRef}
        style={{ height: "1px", visibility: "hidden" }}
      ></div>
    </div>
  );
}
