import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import { ratings } from "../../utils";
import Rating from "../Rating";
import "./styles.scss";

function FilterByRatings(props) {
  const { filterRating, setFilterRating, pagination, setPagination } =
    useContext(AppContext);

  function chooseRating(rating) {
    setPagination({ ...pagination, page: 1 });
    setFilterRating(rating);
  }

  return (
    <div className="filters__ratings">
      <h4>Ratings</h4>
      <ul>
        {ratings.map((r) => (
          <li
            className={filterRating === r.rating ? "active" : ""}
            onClick={(e) => chooseRating(r.rating)}
            key={r.name}
          >
            <Rating caption={" & up"} rating={r.rating}></Rating>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterByRatings;
