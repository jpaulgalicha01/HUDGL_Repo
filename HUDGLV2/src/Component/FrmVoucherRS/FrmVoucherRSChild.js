import React, { useEffect, useMemo, useState } from "react";
import ClsModal from "../../Tools/Modal";
import Select from "react-select";
import {
  ClsGetBatchList,
  ClsGetProducts,
  ClsGetProductsDetails,
} from "../../Class/ClsGetSomething";
import { ClsAlert } from "../../Class/ClsAlert";
import { formatDate } from "../../Class/ClsDatetimeFormat";
import { ClsN2 } from "../../Class/ClsN2";
import { ClsModelTblMain2 } from "../../Model/ClsEntryModel";
export default function FrmVoucherRSChild({ modalShow, setmodalShow }) {
  const [tblMain2, settblMain2] = useState(ClsModelTblMain2());

  const [cbstockNumberEncode, setcbstockNumberEncode] = useState(false);
  const [products, setProducts] = useState([]);
  const [batchList, setbatchList] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [productUcost, setProductUcost] = useState("0.00");
  const [productsUM, setproductsUM] = useState([]);
  const [dataLoading, setdataLoading] = useState(false);

  const [optionsProduct, setOptionProduct] = useState(null);

  useEffect(() => {
    fetchingProducts();
  }, []);

  async function fetchingProducts() {
    const data = await ClsGetProducts();
    if (data === "ERROR") {
      console.log("There's Something Error");
      return;
    }

    if (!Array.isArray(data)) {
      console.error("Expected data to be an array, but got:", data);
      return;
    }
    setProducts(data);
  }
  const memoizedProducts = useMemo(() => {
    return products.map((item) => {
      let label;
      if (cbstockNumberEncode) {
        label = item.stockCode + "  -  " + item.stockDesc;
      } else {
        label = item.stockDesc;
      }
      return {
        value: item.stockNumber,
        label: label,
      };
    });
  }, [products, cbstockNumberEncode]);

  const HandleBatchList = async (e) => {
    setdataLoading(!dataLoading);
    setdataLoading(!dataLoading);
    const data = await ClsGetBatchList({ stockNumber: e.value });

    if (data === "ERROR") {
      ClsAlert({
        icon: "error",
        title: "There's something error to fetching data",
      });
      return;
    }

    setbatchList(data);
    setdataLoading(false);
  };

  const HandleProducts = async (e) => {
    await setOptionProduct(e);
    await FetchingProductDetails(e);
  };

  const FetchingProductDetails = async (e) => {
    // console.log(optionsProduct.value);
    const data = await ClsGetProductsDetails({
      stocknumber: e.value,
      spo: "01",
    });

    if (data === "ERROR") {
      ClsAlert({
        icon: "error",
        title: "There's something error to fetching data",
      });
      return;
    }

    setProductDetails(data);
    setproductsUM(data[0].clsModelUM);
    const ucost = data[0].plvarUCost + data[0].plsvarVC;
    setProductUcost(ClsN2(ucost));
  };

  const handleSubmit = async () => {};

  return (
    <React.Fragment>
      <ClsModal
        handleSubmit={handleSubmit}
        show={modalShow}
        title={"Product Entry"}
        size={"lg"}
        footer={
          <React.Fragment>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={async () => {
                await setmodalShow(!modalShow);
              }}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              <i class="fas fa-cart-plus"></i> Add
            </button>
          </React.Fragment>
        }
      >
        <React.Fragment>
          <div className="container">
            <div className="row">
              <div className="col-12 pb-3">
                <label htmlFor="selectProductDescription">
                  Product Description:
                </label>
                <Select
                  className="py-2"
                  options={memoizedProducts}
                  onChange={async (e) => {
                    await HandleBatchList(e);
                    await HandleProducts(e);
                  }}
                  isSearchable={true}
                />

                <div className="d-md-flex d-grid  gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="cbVAT"
                      //   onClick={() => setcbVAT(!cbVAT)}
                    />
                    <label className="form-check-label" htmlFor="cbVAT">
                      VAT?
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="cbStockNumberEncoding"
                      onClick={() =>
                        setcbstockNumberEncode(!cbstockNumberEncode)
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="cbStockNumberEncoding"
                    >
                      Stock Number Encoding?
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div
                  className="card p-2 rounded"
                  style={{
                    backgroundColor: "#CFF8E7",
                    boxShadow: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px",
                    height: "360px",
                  }}
                >
                  <div style={{ overflowX: "auto", overflowY: "auto" }}>
                    <table className="table table-hover">
                      <thead
                        style={{
                          position: "sticky",
                          top: 0,
                          backgroundColor: "white",
                          zIndex: 0,
                        }}
                      >
                        <tr>
                          <th style={{ width: "50%" }}>Batch No.</th>
                          <th>Exp. Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataLoading ? (
                          "Loading..."
                        ) : batchList.length === 0 ? (
                          <tr>
                            <td colSpan={"2"} className="text-center">
                              No data found.
                            </td>
                          </tr>
                        ) : (
                          batchList.map((item, index) => (
                            <tr
                              style={{ cursor: "pointer" }}
                              onDoubleClick={() => {
                                settblMain2((prev) => ({
                                  ...prev,
                                  BatchNo: item.batchNo,
                                  ExpDate: formatDate(item.expDate),
                                }));
                              }}
                              key={index}
                            >
                              <td>{item.batchNo}</td>
                              <td>{formatDate(item.expDate)}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-8">
                <div
                  className="card p-2 rounded"
                  style={{
                    backgroundColor: "#efeff2",
                    boxShadow: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px",
                    height: "360px",
                  }}
                >
                  <div className="row">
                    <div
                      className="col-7"
                      style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                    >
                      <div className="row" style={{ rowGap: "5px" }}>
                        <div className="col-6">
                          <label htmlFor="inputQty">Qty : </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputQty"
                          />
                        </div>
                        <div className="col-6">
                          <label htmlFor="UM">UM:</label>
                          <select
                            className="form-select"
                            aria-label="------------"
                            name="UM"
                            defaultValue={"CS"}
                            // onChange={(e) => HandleUM(e.target.value)}
                          >
                            {productsUM.length > 0 &&
                              productsUM.map((items, index) => (
                                <React.Fragment key={index}>
                                  <option value={items.um1}>{items.um2}</option>
                                </React.Fragment>
                              ))}
                          </select>
                        </div>

                        <div className="col-6">
                          <label htmlFor="inputQty">UP : </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputQty"
                          />
                        </div>

                        <div className="col-12">
                          <label htmlFor="inputQty">Batch No. : </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputQty"
                            value={tblMain2.BatchNo}
                            defaultValue={""}
                            disabled
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="inputExpDate">Exp Date : </label>
                          <input
                            type="date"
                            className="form-control"
                            id="inputExpDate"
                            value={tblMain2.ExpDate}
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-5">
                      <div className="card p-2">
                        <div className="row gap-2">
                          <p>Discounts</p>
                          <div className="col-12">
                            <label htmlFor="inputDate">% Less (1) : </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputDate"
                            />
                          </div>
                          <div className="col-12">
                            <label htmlFor="inputDate">% Less (2) : </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputDate"
                            />
                          </div>
                          <div className="col-12">
                            <label htmlFor="inputDate">% Less (2) : </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputDate"
                            />
                          </div>
                          <div className="col-12">
                            <label htmlFor="inputDate">Less (Peso) : </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputDate"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </ClsModal>
    </React.Fragment>
  );
}
