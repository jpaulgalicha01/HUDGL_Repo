import { useState } from "react";
import DataTable from "react-data-table-component";

export const MyTables = ({
  columns,
  data,
  setSearchInput,
  showSearch,
  setData,
  showSelectedRows,
}) => {
  //   const filterData = data.filter((item) =>
  //     item.product.toLowerCase().includes(searchInput.toLowerCase())
  //   );

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };
  const handleDelete = () => {
    const newData = data.filter((item) => !selectedRows.includes(item));
    setData(newData);
    setSelectedRows([]);
  };

  return (
    <>
      {showSearch ? (
        <div className="d-flex justify-content-end py-2  ">
          <div className="col-md-3 col-6">
            <input
              type="text"
              placeholder="Search here.."
              className="form-control"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
      ) : null}
      {selectedRows.length > 0 ? (
        <div className="py-2 d-flex justify-content-end">
          <button
            className="btn btn-danger  btn-sm rounded "
            onClick={() => handleDelete()}
            title="Delete"
          >
            <i className="fa fa-trash" /> Delete
          </button>
        </div>
      ) : null}
      <DataTable
        columns={columns}
        data={data}
        selectableRows={showSelectedRows ? true : false}
        pagination
        fixedHeader
        onSelectedRowsChange={handleRowSelected}
        direction="auto"
        fixedHeaderScrollHeight="300px"
        responsive
        subHeaderAlign="right"
        subHeaderWrap
      />
    </>
  );
};
