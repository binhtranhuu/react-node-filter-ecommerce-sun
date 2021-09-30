import { Checkbox } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../AppContext";

function FilterByType(props) {
  const { filters, filterType, setFilterType, pagination, setPagination } =
    useContext(AppContext);

  function onChange(e) {
    setPagination({ ...pagination, page: 1 });
    const isCheck = e.target.checked;
    const value = e.target.value;
    const findIdx = filterType.findIndex((type) => type === value);
    const isExisting = findIdx !== -1;
    if (!isExisting && isCheck) {
      setFilterType([...filterType, value]);
    } else if (!isCheck) {
      setFilterType(filterType.filter((type) => type !== value));
    }
  }

  return (
    <div className="filters__type">
      <h4>Type</h4>

      <div className="type__checkbox">
        {filters?.typeFilterCount?.map(
          (type, index) =>
            index < 5 && (
              <p key={index} style={{ marginBottom: "8px" }}>
                <Checkbox
                  value={type.type}
                  checked={filterType.indexOf(type.type) !== -1}
                  onChange={onChange}
                >
                  {type.type} ({type.qty})
                </Checkbox>
              </p>
            )
        )}
      </div>
    </div>
  );
}

export default FilterByType;
