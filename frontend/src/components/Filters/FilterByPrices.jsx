import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import { prices } from "../../utils";

function FilterByPrices(props) {
  const { filterPrice, setFilterPrice, pagination, setPagination } =
    useContext(AppContext);

  function choosePrice(min, max) {
    setPagination({ ...pagination, page: 1 });
    setFilterPrice({ min, max });
  }

  return (
    <div className="filters__prices">
      <h4>Prices</h4>
      <ul>
        {prices.map((p, index) => (
          <li
            className={
              filterPrice.min === p.min && filterPrice.max === p.max
                ? "active"
                : ""
            }
            onClick={(e) => choosePrice(p.min, p.max)}
            key={index}
          >
            {p.name}
          </li>
        ))}
      </ul>
      <form className="form__price">
        <span>$</span>
        <input
          type="number"
          value={filterPrice.min}
          onChange={(e) => {
            setPagination({ ...pagination, page: 1 });
            setFilterPrice({ ...filterPrice, min: e.target.value });
          }}
        />
        to <span>$</span>
        <input
          type="number"
          value={filterPrice.max}
          onChange={(e) => {
            setPagination({ ...pagination, page: 1 });
            setFilterPrice({ ...filterPrice, max: e.target.value });
          }}
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default FilterByPrices;
