import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import "./styles.scss";

function Navbar(props) {
  const { pagination, setPagination, filterName, setFilterName } =
    useContext(AppContext);

  return (
    <header className="header">
      <div className="logo">
        <a href="/" className="logo__image">
          <img src="./images/logo-is.webp" alt="Logo" />
        </a>
        <a href="/" className="logo__text">
          amazing
        </a>
      </div>
      <div className="form">
        <form className="form__search">
          <input
            className="form__input"
            type="text"
            name="search"
            value={filterName}
            onChange={(e) => {
              setPagination({ ...pagination, page: 1 });
              setFilterName(e.target.value);
            }}
            placeholder="Search a product"
          />
          <button className="form__button" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </header>
  );
}

export default Navbar;
