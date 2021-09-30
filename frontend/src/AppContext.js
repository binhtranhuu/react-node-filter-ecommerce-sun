import React, { createContext, useState } from "react";

const AppContext = createContext();

function AppContextProvider(props) {
  const [filters, setFilters] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [filterBrand, setFilterBrand] = useState([]);
  const [filterRating, setFilterRating] = useState(0);
  const [filterPrice, setFilterPrice] = useState({});
  const [filterName, setFilterName] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    totalRows: 16,
  });

  return (
    <AppContext.Provider
      value={{
        filters,
        setFilters,
        filterCategory,
        setFilterCategory,
        filterType,
        setFilterType,
        filterBrand,
        setFilterBrand,
        filterName,
        setFilterName,
        filterRating,
        setFilterRating,
        filterPrice,
        setFilterPrice,
        orderBy,
        setOrderBy,
        pagination,
        setPagination,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
