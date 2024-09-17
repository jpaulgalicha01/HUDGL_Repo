import React, { useState } from "react";
import Select from "react-select";
import { MyTables } from "../../Tools/Datable";
import FrmVoucherRSChild from "./FrmVoucherRSChild";
export default function FrmVoucherRS() {
  const [btnLoading, setbtnLoading] = useState(false);
  const [modalShow, setmodalShow] = useState(false);

  const DummyData = [{ label: "Dummy Text", value: "value1" }];

  const columns = [
    {
      name: "Product",
      selector: (row) => row.product,
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row) => row.customer,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
  ];

  const tblData = [
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
  ];

  return (
    <React.Fragment>
      <div className="row py-2 " style={{ rowGap: "5px" }}>
        <div className="col-12 d-flex justify-content-end">
          <input
            type="text"
            className="form-control text-end mb-2"
            defaultValue={"00001"}
            style={{ width: "100px" }}
            disabled
          />
        </div>

        <div className="col-md-3 col-12 ">
          <label htmlFor="selectWarehouse">Warehouse:</label>
          <select
            className="form-select"
            id="selectWarehouse"
            defaultValue={""}
            // value={WHCode}
            // onChange={(e) => setWHCode(e.target.value)}
            // ref={refWHCode}
          >
            <option disabled value={""}>
              -----------------
            </option>
            {/* {Array.isArray(SelectWarehouse) &&
              SelectWarehouse.map((rows, index) => (
                <React.Fragment key={index}>
                  <option value={rows.whCode}>{rows.whDesc}</option>
                </React.Fragment>
              ))} */}
          </select>
        </div>

        <div className="col-md-4 col-12 ">
          <label htmlFor="selectCustomer">Name:</label>
          <Select
            name="ControlNo"
            options={DummyData}
            // value={ControlNo}
            // onChange={(e) => setControlNo(e)}
            isSearchable={true}
            // ref={refControlNo}
          />
        </div>

        <div className="col-md-5 col-12 ">
          <label htmlFor="selectCustomer">Account Title:</label>
          <Select
            name="Customer"
            options={DummyData}
            // value={AT}
            // onChange={(e) => setAT(e)}
            isSearchable={true}
            // ref={refAT}
          />
        </div>

        <div className="col-md-3 col-6">
          <label htmlFor="inputDate">Date: </label>
          <input
            type="date"
            className="form-control"
            id="inputDate"
            // onChange={HandleChange}
            // value={tblMain1.TDate}
            // ref={refTDate}
          />
        </div>
        <div className="col-md-3 col-6">
          <label htmlFor="inpuCMDate">CM Date: </label>
          <input
            type="date"
            className="form-control"
            id="inpuCMDate"
            // onChange={HandleChange}
            // value={tblMain1.TDate}
            // ref={refTDate}
          />
        </div>

        <div className="col-md-3 col-6 ">
          <label htmlFor="selectSellingPrice">Selling Price:</label>
          <Select
            options={DummyData}
            // value={ControlNo}
            // onChange={(e) => setControlNo(e)}
            isSearchable={true}
            // ref={refControlNo}
          />
        </div>

        <div className="col-md-3 col-6 ">
          <label htmlFor="selectSalesman">Salesman:</label>
          <Select
            options={DummyData}
            // value={ControlNo}
            // onChange={(e) => setControlNo(e)}
            isSearchable={true}
            // ref={refControlNo}
          />
        </div>

        <div className="col-md-3 col-6 ">
          <label htmlFor="selectReason">Reason:</label>
          <Select
            options={DummyData}
            // value={ControlNo}
            // onChange={(e) => setControlNo(e)}
            isSearchable={true}
            // ref={refControlNo}
          />
        </div>
        <div className="col-md-4 col-6">
          <label htmlFor="inpuReferrence">Referrence: </label>
          <input
            type="text"
            className="form-control"
            id="inpuReferrence"
            // onChange={HandleChange}
            // value={tblMain1.TDate}
            // ref={refTDate}
          />
        </div>

        <div className="col-md-5 col-6">
          <label htmlFor="inpuRemarks">Remarks: </label>
          <input
            type="text"
            className="form-control"
            id="inpuRemarks"
            // onChange={HandleChange}
            // value={tblMain1.TDate}
            // ref={refTDate}
          />
        </div>

        <div className="d-md-flex d-grid  gap-3 pt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="cbSavePrint"
              // onChange={() => setCBAccountNumber(!CBAccountNumber)}
            />
            <label className="form-check-label" htmlFor="cbSavePrint">
              Account Number?
            </label>
          </div>
        </div>

        <br />
        <div className="col-12 pt-2" style={{ zIndex: 0 }}>
          <div className="card show-lg p-3">
            <div className="d-flex justify-content-start py-2 gap-2">
              <button
                className="btn btn-primary"
                onClick={() => setmodalShow(!modalShow)}
              >
                <i class="fa-solid fa-plus"></i> Add Product
              </button>
              <button
                className={`btn btn-success ${btnLoading ? "disabled" : ""}`}
                // onClick={() => HandleSave()}
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
            <MyTables
              columns={columns}
              data={tblData}
              showSearch={false}
              showSelectedRows={true}
              // setData={}
            />
          </div>
        </div>
      </div>

      <FrmVoucherRSChild modalShow={modalShow} setmodalShow={setmodalShow} />
    </React.Fragment>
  );
}
