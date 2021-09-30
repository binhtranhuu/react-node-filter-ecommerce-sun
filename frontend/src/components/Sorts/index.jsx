import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import "./styles.scss";

function Sorts(props) {
  const { productCount } = props;
  const { orderBy, setOrderBy } = useContext(AppContext);

  return (
    <div className="summary">
      <div className="results">{productCount} results</div>
      <div className="orders">
        <div className="orders__text">Sort by</div>
        <div className="orders__select">
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            name="orders"
            id="orders"
          >
            <option value="">Featured</option>
            <option value="lowest">Price asc</option>
            <option value="highest">Price desc</option>
            <option value="toprated">Rating</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Sorts;
