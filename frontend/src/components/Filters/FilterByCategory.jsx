import { Tree } from "antd";
import _ from "lodash";
import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import { convertArrayToTree } from "../../utils";

function FilterByCategory(props) {
  const {
    filters,
    filterCategory,
    setFilterCategory,
    pagination,
    setPagination,
  } = useContext(AppContext);

  var updatedUniqueCategories = _.map(
    filters.categories,
    function (currObj, index) {
      var newObj = {};

      Object.keys(currObj).forEach(function (key) {
        if (key === "_id") {
          newObj.key = currObj[key];
        } else if (key === "name") {
          newObj.title = currObj[key];
        } else {
          newObj[key] = currObj[key];
        }
      });
      return newObj;
    }
  );

  var result = convertArrayToTree(updatedUniqueCategories);

  const onSelect = (selectedKeys) => {
    setPagination({ ...pagination, page: 1 });
    setFilterCategory(selectedKeys);
  };

  return (
    <div className="filters__category">
      <Tree
        selectable
        onExpand={false}
        onSelect={onSelect}
        selectedKeys={filterCategory}
        treeData={result}
      />
    </div>
  );
}

export default FilterByCategory;
