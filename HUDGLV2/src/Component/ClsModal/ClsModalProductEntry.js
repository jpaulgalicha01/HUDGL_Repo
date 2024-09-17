import React, { useEffect, useMemo, useState } from "react";
import ClsModal from "../../Tools/Modal";
import { Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { ClsN2 } from "../../Class/ClsN2";
import {
  ClsGetProducts,
  ClsGetProductsDetails,
  ClsGetVATRate,
} from "../../Class/ClsGetSomething";
import {
  ClsGetActDisct,
  getVATAmt,
  removeComma,
} from "../../Class/ClsVariousFormula";
import { ClsAlert } from "../../Class/ClsAlert";

export default function ClsModalProductEntry(props) {
  const [cbstockNumberEncode, setcbcbStockNumberEncode] = useState(false);
  const [cbVAT, setcbVAT] = useState(false);
  const [products, setProducts] = useState([]);
  const [optionsProduct, setOptionProduct] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [productUcost, setProductUcost] = useState("0.00");
  const [productsUM, setproductsUM] = useState([]);
  const [VATRate, setVATRate] = useState(null);
  useEffect(() => {
    fetchingProducts();
    fetchingVATRate();
  }, []);
  async function fetchingVATRate() {
    const data = await ClsGetVATRate();
    setVATRate(data);
  }
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
    const formJson = Object.fromEntries(await new FormData(e.target).entries());

    let D1 = Number(formJson.D1 / 100);
    let D2 = Number(formJson.D2 / 100);
    let D3 = Number(formJson.D3 / 100);
    let PDisc = Number(formJson.PDisct);
    let Total = formJson.POut * removeComma(formJson.UP);
    let ActDisct = Number(
      ClsGetActDisct({
        grossamt: Total,
        vardd1: D1,
        vardd2: D2,
        vardd3: D3,
      })
    );
    let VAT = Number(
      getVATAmt({
        varVAT: cbVAT,
        varVATRate: Number(VATRate),
        varNetSalesAmt: Total - (ActDisct + PDisc),
      })
    );
    let Cost = Total - (ActDisct + PDisc + VAT);

    const postItem = {
      Description: optionsProduct.label,
      StockNumber: optionsProduct.value,
      PIn: 0,
      POut: ClsN2(formJson.POut),
      UP: formJson.UP,
      Total: ClsN2(Total),
      Cost: ClsN2(Cost),
      VAT: ClsN2(VAT),
      ActDisct: ClsN2(ActDisct),
      PDisct: ClsN2(PDisc),
      WHCode: props.opwarehouse,
      UM: formJson.UM,
      OrderQty: null,
      D1: ClsN2(D1),
      D2: ClsN2(D2),
      D3: ClsN2(D3),
      BatchNo: formJson.BatchNo,
      ExpDate: formJson.ExpDate,
      DivisionCode: "00",
    };

    await props.setinitialData((result) => {
      const updatedCart = [...result, postItem];
      return updatedCart;
    });
    await reset(e);
  };
  async function reset(e) {
    e.target.reset();
    setproductsUM([]);
    setProductUcost("0.00");
    setProductDetails([]);
    setOptionProduct(null);
    setcbVAT(false);
  }

  return (
    <div>
      <ClsModal
        handleSubmit={handleSubmit}
        show={props.modalShow}
        handleClose={props.handleModal}
        title={"Product Entry"}
        size={"lg"}
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={async () => {
                await props.setModalShow(!props.modalShow);
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
        <Container>
          <Row>
            <div className="card mb-3" style={{ backgroundColor: "#78dbab" }}>
              <div className="card-header">
                <p className="fs-5 danger-text fw-bold">BALANCE</p>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between  gap-5 mx-2">
                  <div>
                    <label className="fw-medium" htmlFor="CS">
                      CS
                    </label>
                    <input
                      type="text"
                      name=""
                      className="form-control text-end"
                      id="CS"
                      value={"0.00"}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="fw-medium" htmlFor="PC">
                      PC
                    </label>
                    <input
                      type="text"
                      name=""
                      className="form-control text-end"
                      id="PC"
                      value={"0.00"}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="fw-medium" htmlFor="IB">
                      IB
                    </label>
                    <input
                      type="text"
                      name=""
                      className="form-control text-end"
                      id="IB"
                      value={"0.00"}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 p-0 mb-3">
              <Form.Label>Product :</Form.Label>
              <Select
                options={memoizedProducts}
                isSearchable={true}
                value={optionsProduct}
                onChange={HandleProductDetails}
                name="StockNumber"
                required
              />
            </div>

            {/* Inputs */}
            <div className="card py-2 secondary-bg mb-3">
              <span className="pb-3 label-title">Inputs:</span>
              <Row>
                <Form.Group as={Col} md="3" xs="6" className="pb-3">
                  <Form.Label>Qty :</Form.Label>
                  <Form.Control
                    name="POut"
                    required
                    type="number"
                    className="text-end"
                  />
                </Form.Group>
                <Form.Group as={Col} md="3" xs="6" className="pb-3">
                  <Form.Label>UM :</Form.Label>
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
                </Form.Group>
                <Form.Group as={Col} md="3" xs="6" className="pb-3">
                  <Form.Label>Unit Cost :</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    className="text-end"
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
                    name="UP"
                  />
                </Form.Group>
              </Row>
            </div>
            {/* End Inputs */}

            {/* Discounts */}
            <div className="card py-2 secondary-bg mb-3">
              <span className="pb-3 label-title">Discounts:</span>
              <Row>
                <Form.Group as={Col} md="3" xs="6" className="pb-3">
                  <Form.Label>Less 1(%) :</Form.Label>
                  <Form.Control type="text" className="text-end" name="D1" />
                </Form.Group>
                <Form.Group as={Col} md="3" xs="6" className="pb-3">
                  <Form.Label>Less 2(%) :</Form.Label>
                  <Form.Control type="text" className="text-end" name="D2" />
                </Form.Group>
                <Form.Group as={Col} md="3" xs="6" className="pb-3">
                  <Form.Label>Less 3(%) :</Form.Label>
                  <Form.Control type="text" className="text-end" name="D3" />
                </Form.Group>
                <Form.Group as={Col} md="3" xs="6" className="pb-3">
                  <Form.Label>Less (PESO)</Form.Label>
                  <Form.Control
                    type="text"
                    className="text-end"
                    name="PDisct"
                  />
                </Form.Group>

                <Form.Group as={Col} md="6" xs="6" className="pb-3">
                  <Form.Label>Overall Peso Discount</Form.Label>
                  <Form.Control type="text" className="text-end" />
                </Form.Group>

                <Form.Group as={Col} md="6" xs="6" className="pb-3">
                  <Form.Label>Overall Discount</Form.Label>
                  <Form.Control type="text" className="text-end" />
                </Form.Group>
              </Row>
            </div>
            {/* End Discounts */}

            {/* item Details */}
            <div className="card py-2 secondary-bg mb-3">
              <span className="pb-3 label-title">Item Details:</span>
              <Row className="d-flex justify-content-between">
                <Form.Group as={Col} md="4" xs="6" className="pb-3">
                  <Form.Label>Batch No. :</Form.Label>
                  <Form.Control
                    type="text"
                    className="text-end"
                    name="BatchNo"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" xs="6" className="pb-3">
                  <Form.Label>Exp Date :</Form.Label>
                  <Form.Control type="date" name="ExpDate" />
                </Form.Group>
              </Row>
            </div>
            {/* END item Details */}

            <div className="d-md-flex d-grid  gap-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="cbVAT"
                  onClick={() => setcbVAT(!cbVAT)}
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
                  onClick={() => setcbcbStockNumberEncode(!cbstockNumberEncode)}
                />
                <label
                  className="form-check-label"
                  htmlFor="cbStockNumberEncoding"
                >
                  Stock Number Encoding?
                </label>
              </div>
            </div>
          </Row>
        </Container>
      </ClsModal>
    </div>
  );
}
