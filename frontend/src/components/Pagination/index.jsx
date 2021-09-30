import React, { useContext } from "react";
import "./styles.scss";
import { Pagination } from "antd";
import { AppContext } from "../../AppContext";

function Paginate(props) {
  const { pagination, setPagination } = useContext(AppContext);

  const onChange = (page) => {
    setPagination({
      ...pagination,
      page,
    });
  };

  return (
    <div className="paginate">
      <Pagination
        current={pagination.page}
        onChange={onChange}
        total={pagination.totalRows}
        pageSize={16}
      />
    </div>
  );
}

export default Paginate;
