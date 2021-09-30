import React, { useContext } from "react";
import _ from "lodash";
import "./styles.scss";
import FilterByBrand from "../Filters/FilterByBrand";
import FilterByCategory from "../Filters/FilterByCategory";
import FilterByPrices from "../Filters/FilterByPrices";
import FilterByRatings from "../Filters/FilterByRatings";
import FilterByType from "../Filters/FilterByType";
import { AppContext } from "../../AppContext";

function Sidebar(props) {
  const {
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
  } = useContext(AppContext);

  const isDisplay =
    Boolean(filterCategory.length > 0) ||
    Boolean(filterType.length > 0) ||
    Boolean(filterBrand.length > 0) ||
    Boolean(filterRating > 0) ||
    !_.isEmpty(filterPrice);

  function clearFilter(e) {
    e.preventDefault();

    setFilterCategory([]);
    setFilterType([]);
    setFilterBrand([]);
    setFilterName("");
    setOrderBy("");
    setOrderBy("");
    setFilterPrice({});
    setFilterRating(0);
  }

  return (
    <div className="sidebar">
      {isDisplay ? (
        <div className="clear">
          <button onClick={clearFilter} className="btn-clear">
            <i className="fas fa-eraser"></i> Clear all filters
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="filters">
        <div className="filters__box">
          <h3>Show results for</h3>
          <FilterByCategory />
        </div>
        <div className="filters__box">
          <h3>Refine by</h3>
          <FilterByType />
          <FilterByBrand />
          <FilterByRatings />
          <FilterByPrices />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
