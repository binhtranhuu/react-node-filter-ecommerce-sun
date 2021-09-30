import axios from "axios";
import { Spin } from "antd";
import { useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "./AppContext";
import Navbar from "./components/Navbar";
import Paginate from "./components/Pagination";
import ProductList from "./components/Products";
import Sidebar from "./components/Sidebar";
import Sorts from "./components/Sorts";
import { baseURL } from "./utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "PRODUCTS_REQUEST":
      return { ...state, loading: true };
    case "PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "PRODUCTS_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    products: [],
  });

  const { loading, error, products } = state;

  const {
    setFilters,
    filterCategory,
    filterType,
    filterBrand,
    filterName,
    filterRating,
    filterPrice,
    orderBy,
    pagination,
    setPagination,
  } = useContext(AppContext);

  const [productCount, setProductCount] = useState(0);
  // const [pagination, setPagination] = useState({
  //   page: 1,
  //   pages: 1,
  //   totalRows: 16,
  // });

  let url = `${baseURL}/products?`;

  if (pagination.page >= 2) {
    url += `&pageNumber=${pagination.page}`;
  }

  if (filterName) {
    url += `&name=${filterName}`;
  }

  if (orderBy) {
    url += `&order=${orderBy}`;
  }

  if (filterCategory.length > 0) {
    filterCategory.forEach((category) => (url += `&category=${category}`));
  }

  if (filterType.length > 0) {
    filterType.forEach((type) => (url += `&type=${type}`));
  }

  if (filterBrand.length > 0) {
    filterBrand.forEach((brand) => (url += `&brand=${brand}`));
  }

  if (filterRating > 0) {
    url += `&rating=${filterRating}`;
  }

  if (filterPrice.min || filterPrice.max) {
    for (const key in filterPrice) {
      url += `&${key}=${filterPrice[key]}`;
    }
  }

  const loadProducts = async () => {
    dispatch({ type: "PRODUCTS_REQUEST" });
    try {
      const { data } = await axios.get(url);
      setProductCount(data.productList.totalRows);
      setPagination({
        page: data.productList.page,
        pages: data.productList.pages,
        totalRows: data.productList.totalRows,
      });
      setFilters(data.filters);
      dispatch({
        type: "PRODUCTS_SUCCESS",
        payload: data.productList.products,
      });
    } catch (error) {
      dispatch({ type: "PRODUCTS_FAIL", payload: error.message });
    }
  };

  useEffect(() => {
    loadProducts();
  }, [url]);

  return (
    <div className="app">
      <Navbar />
      <section className="main">
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <div className="content">
          <Sorts productCount={productCount} />
          <ProductList products={products} />
          <Paginate pagination={pagination} onPagination={setPagination} />
        </div>
      </section>
    </div>
    // <div className="app">
    //   <Navbar />
    //   <section className="main">
    //     <aside className="sidebar">
    //       <Sidebar />
    //     </aside>
    //     <div className="content">
    //       {loading ? (
    //         <div className="loading">
    //           <Spin size="large" tip="Loading..." />
    //         </div>
    //       ) : error ? (
    //         <div>Error: {error}</div>
    //       ) : products.length === 0 ? (
    //         <div>No product found</div>
    //       ) : (
    //         <>
    //           <Sorts productCount={productCount} />
    //           <ProductList products={products} />
    //           <Paginate pagination={pagination} onPagination={setPagination} />
    //         </>
    //       )}
    //     </div>
    //   </section>
    // </div>
  );
}

export default App;
