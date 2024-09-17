import React, { useState } from "react";
import Select from "react-select";
export default function FrmVoucherDR() {
  const [btnLoading, setbtnLoading] = useState(false);
  const DummyData = [{ label: "Testing1", value: "value1" }];

  return (
    <React.Fragment>
      <div className="row py-2" style={{ rowGap: "5px" }}>
        <div className="col-12 d-flex justify-content-end mb-2">
          <input
            type="text"
            className="form-control text-end"
            defaultValue={"00001"}
            style={{ width: "100px" }}
            disabled
          />
        </div>

        <div className="col-md-4 col-12 ">
          <label htmlFor="selectWarehouse">Warehouse:</label>
          <select
            className="form-select"
            id="selectWarehouse"
            defaultValue={""}
          >
            <option disabled value={""}>
              -----------------
            </option>
          </select>
        </div>

        <div className="col-md-6 col-12 ">
          <label htmlFor="selectCustomer">Supplier :</label>
          <Select
            options={DummyData}
            // value={ControlNo}
            // onChange={(e) => setControlNo(e)}
            isSearchable={true}
            // ref={refControlNo}
            // ref={selectRefSupplier}
          />
        </div>
        <div className="col-md-2 col-12 ">
          <label htmlFor="Term">Term :</label>
          <input type="text" name="Term" id="Term" className="form-control" />
        </div>

        <div className="col-md-3 col-5">
          <label htmlFor="inputDate">Transaction Date: </label>
          <input
            type="date"
            className="form-control"
            id="inputDate"
            name="TDate"
            // onChange={HandleChange}
            // value={tblMain1.TDate}
            // ref={refTDate}
          />
        </div>
        <div className="col-md-3 col-5">
          <label htmlFor="inputDate">Recieved Date: </label>
          <input
            type="date"
            className="form-control"
            id="inputDate"
            name="RDate"
            // onChange={HandleChange}
            // value={tblMain1.TDate}
            // ref={refTDate}
          />
        </div>

        <div className="col-md-6 col-12">
          <label htmlFor="inputDate">Referrence: </label>
          <input
            type="text"
            className="form-control"
            // onChange={HandleChange}
            // value={tblMain1.TDate}
            // ref={refTDate}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputDate">Remarks: </label>
          <input
            type="text"
            className="form-control"
            // onChange={HandleChange}
            // value={tblMain1.TDate}
            // ref={refTDate}
          />
        </div>

        <div className="col-12 pt-2" style={{ zIndex: 0 }}>
          <div className="card show-lg p-3">
            <div className="d-flex justify-content-start py-2 gap-2">
              <button
                className="btn btn-primary"
                // onClick={() => handleModal()}
              >
                <i class="fa-solid fa-plus"></i> Add Product
              </button>
              <button
                className={`btn btn-success ${btnLoading ? "disabled" : ""}`}
                // onClick={handleSubmit}
              >
                {btnLoading ? (
                  <i className="spinner-border spinner-border-sm"></i>
                ) : (
                  <>
                    <i class="fa-regular fa-bookmark"></i> Save
                  </>
                )}
              </button>
            </div>
            {/* <MyTables
              columns={columns}
              data={initialData}
              showSearch={false}
              setData={setinitialData}
              showSelectedRows={true}
            /> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
