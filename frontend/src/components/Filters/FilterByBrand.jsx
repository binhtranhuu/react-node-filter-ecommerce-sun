import { Checkbox } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../../AppContext";

function FilterByBrand(props) {
  const [search, setSearch] = useState("");
  const { filters, filterBrand, setFilterBrand, pagination, setPagination } =
    useContext(AppContext);

  const brandWithSearch = filters?.brandFilterCount?.filter((brand) =>
    brand.brand.toLowerCase().includes(search)
  );

  function onChange(e) {
    setPagination({ ...pagination, page: 1 });
    const isCheck = e.target.checked;
    const value = e.target.value;
    const findIdx = filterBrand.findIndex((brand) => brand === value);
    const isExisting = findIdx !== -1;
    if (!isExisting && isCheck) {
      setFilterBrand([...filterBrand, value]);
    } else if (!isCheck) {
      setFilterBrand(filterBrand.filter((brand) => brand !== value));
    }
  }

  return (
    <div className="filters__brand">
      <h4>Brand</h4>
      <form className="form__brand">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="brand"
          placeholder="Search for another..."
        />
      </form>
      <div className="branch__checkbox">
        {brandWithSearch?.length > 0
          ? brandWithSearch.map(
              (brand, index) =>
                index < 5 && (
                  <p key={index} style={{ marginBottom: "8px" }}>
                    <Checkbox
                      value={brand.brand}
                      checked={filterBrand.indexOf(brand.brand) !== -1}
                      onChange={onChange}
                    >
                      {brand.brand} ({brand.qty})
                    </Checkbox>
                  </p>
                )
            )
          : "Brand not found"}
      </div>
    </div>
  );
}

export default FilterByBrand;
