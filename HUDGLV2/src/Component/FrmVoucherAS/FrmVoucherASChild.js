import React, { useEffect, useMemo, useState } from "react";
import ClsModal from "../../Tools/Modal";
import { Row } from "react-bootstrap";
import Select from "react-select";
import {
  ClsGetProducts,
  ClsGetProductsDetails,
} from "../../Class/ClsGetSomething";
import { ClsAlert } from "../../Class/ClsAlert";
import { ClsN2 } from "../../Class/ClsN2";
import { removeComma } from "../../Class/ClsVariousFormula";
export default function FrmVoucherASChild({
  modalShow,
  setmodalShow,
  setTblData,
}) {
  const [cbstockNumberEncode, setcbstockNumberEncode] = useState(false);
  const [optionsProduct, setOptionProduct] = useState(null);
  const [productsUM, setproductsUM] = useState([]);
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [productUcost, setProductUcost] = useState("0.00");
  const [cbQtyIn, setcbQtyIn] = useState(false);

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

  const HandleProductDetails = async (e) => {
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
  const HandleUM = async (e) => {
    const ucost = productDetails[0].plvarUCost + productDetails[0].plsvarVC;
    if (e === "CS") {
      setProductUcost(ClsN2(ucost));
    } else if (e === "PC" && productDetails[0].plvarib === 0) {
      setProductUcost(ClsN2(ucost / productDetails[0].plvarpiece));
    } else if (e === "IB") {
      setProductUcost(ClsN2(ucost / productDetails[0].plvarib));
    } else {
      setProductUcost(
        ClsN2(ucost / productDetails[0].plvarib / productDetails[0].plvarpiece)
      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formJson = Object.fromEntries(await new FormData(e.target).entries());

    let Total;

    if (cbQtyIn) {
      Total = Number(removeComma(formJson.UnitCost)) * Number(formJson.Qty);
    } else {
      Total = Number(removeComma(formJson.UnitCost)) * -Number(formJson.Qty);
    }

    let addProduct = {
      Description: optionsProduct.label,
      StockNumber: optionsProduct.value,
      QtyIn: cbQtyIn ? ClsN2(formJson.Qty) : ClsN2(0),
      QtyOut: cbQtyIn ? ClsN2(0) : ClsN2(formJson.Qty),
      UM: formJson.UM,
      UnitCost: formJson.UnitCost,
      Total: ClsN2(Total),
      BatchNo: formJson.BatchNo,
      ExpDate: formJson.ExpDate,
    };

    await setTblData((result) => {
      const addingProduct = [...result, addProduct];
      return addingProduct;
    });

    await reset(e);
  };

  async function reset(e) {
    e.target.reset();
    setproductsUM([]);
    setProductUcost("0.00");
    setProductDetails([]);
    setOptionProduct(null);
  }

  return (
    <div>
      <ClsModal
        handleSubmit={handleSubmit}
        show={modalShow}
        title={"Product Entry"}
        size={"lg"}
        footer={
          <>
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
              Add
            </button>
          </>
        }
      >
        <Row style={{ rowGap: "20px" }}>
          <div className="d-flex  gap-3 pt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="cbStockNumber"
                onChange={() => setcbstockNumberEncode(!cbstockNumberEncode)}
              />
              <label className="form-check-label" htmlFor="cbStockNumber">
                Stock Number?
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="cbQtyIn"
                onChange={() => setcbQtyIn(!cbQtyIn)}
              />
              <label className="form-check-label" htmlFor="cbQtyIn">
                Qty In?
              </label>
            </div>
          </div>

          <div className="col-12 ">
            <label htmlFor="Product">Product:</label>
            <Select
              name="StockNumber"
              options={memoizedProducts}
              onChange={HandleProductDetails}
              isSearchable={true}
              id="Product"
              required
              value={optionsProduct}
            />
          </div>
          <div className="col-md-4 col-6">
            <label htmlFor="Qty">Qty:</label>
            <input
              type="number"
              name="Qty"
              id="Qty"
              className="form-control text-end"
              required
            />
          </div>

          <div className="col-md-4 col-6 ">
            <label htmlFor="UM">UM:</label>
            <select
              className="form-select"
              aria-label="------------"
              name="UM"
              defaultValue={"CS"}
              onChange={(e) => HandleUM(e.target.value)}
            >
              {productsUM.length > 0 &&
                productsUM.map((items, index) => (
                  <React.Fragment key={index}>
                    <option value={items.um1}>{items.um2}</option>
                  </React.Fragment>
                ))}
            </select>
          </div>

          <div className="col-md-4 col-6 ">
            <label htmlFor="BatchNo">Batch No. :</label>
            <input
              type="text"
              name="BatchNo"
              id="BatchNo"
              className="form-control"
            />
          </div>
          <div className="col-md-4 col-6 ">
            <label htmlFor="ExpDate">Exp. Date :</label>
            <input
              type="date"
              name="ExpDate"
              id="ExpDate"
              className="form-control"
            />
          </div>
          <div className="col-md-4 col-6 ">
            <label htmlFor="UnitCost">Unit Cost:</label>
            <input
              type="text"
              name="UnitCost"
              id="UnitCost"
              className="form-control text-end"
              value={productUcost}
              onChange={(e) => {
                let newAmout = e.target.value;

                if (/^\d*\.?\d*$/.test(newAmout)) {
                  setProductUcost(newAmout);
                }
              }}
              onBlur={(e) =>
                setProductUcost(ClsN2(removeComma(e.target.value)))
              }
              required
            />
          </div>
        </Row>
      </ClsModal>
    </div>
  );
}
