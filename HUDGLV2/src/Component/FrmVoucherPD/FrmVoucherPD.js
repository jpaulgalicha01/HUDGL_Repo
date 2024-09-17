import React, { useEffect, useRef, useState } from "react";
import { Col, Form } from "react-bootstrap";
import ClsModalProductEntry from "../ClsModal/ClsModalProductEntry";
import Select from "react-select";
import { GetSession } from "../../Class/ClsSession";
import {
  ClsAutoNumber,
  ClsGetCustomer,
  ClsGetTaxWithheldRate,
  ClsGetWareHouse,
} from "../../Class/ClsGetSomething";
import { MyTables } from "../../Tools/Datable";
import { ClsN2 } from "../../Class/ClsN2";
import { removeComma } from "../../Class/ClsVariousFormula";
import { ClsAlert, ClsModalAlert } from "../../Class/ClsAlert";
import { InsertVoucher } from "../../Controller/Insert";

export default function FrmVoucherPD() {
  const [modalShow, setModalShow] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [warehouse, setWarehouse] = useState([]);

  const [autoNum, setAutoNum] = useState(null);
  const [opwarehouse, setupWarehouse] = useState();
  const [selectedOptionCust, setSelectedOptionCust] = useState("");
  const [inputTerm, setinputTerm] = useState("");
  const [inputTDate, setinputTDate] = useState("");
  const [inputRDate, setinputRDate] = useState("");
  const [inputReferrence, setinputReferrence] = useState("");
  const [inputRemarks, setinputRemarks] = useState("");
  const [initialData, setinitialData] = useState([]);

  // for Validation Only
  const selectRefWH = useRef(null);
  const selectRefSupplier = useRef(null);
  const inputRefTerm = useRef(null);
  const inputRefTDate = useRef(null);
  const inputRefRDate = useRef(null);
  const inputRef = useRef(null);
  const inputRem = useRef(null);

  const [btnLoading, setbtnLoading] = useState(false);

  useEffect(() => {
    AutoNum();
    FetchingCustomer();
    FetchingWarehouse();
  }, [autoNum]);

  async function AutoNum() {
    const result = await ClsAutoNumber({
      voucher: "PD",
      cncode: GetSession().cnCode,
    });
    setAutoNum(result);
    setinputReferrence("PD#" + result);
  }
  async function FetchingCustomer() {
    const data = await ClsGetCustomer({
      NType: "S",
      CNCode: GetSession().cnCode,
    });
    if (data === "ERROR") {
      alert("There's Something Error");
      return;
    }

    if (!Array.isArray(data)) {
      console.error("Expected data to be an array, but got:", data);
      return;
    }
    const result = data.map((item) => ({
      value: item.controlNo,
      label: item.custName,
    }));
    setCustomer(result);
  }
  async function FetchingWarehouse() {
    const data = await ClsGetWareHouse();
    return setWarehouse(data);
  }

  const columns = [
    {
      name: "Description",
      selector: (row) => row.Description,
      sortable: true,
    },
    {
      name: "Qty",
      selector: (row) => row.POut,
      sortable: true,
      width: "70px",
      style: {
        display: "flex",
        justifyContent: "end",
      },
    },
    {
      name: "UM",
      selector: (row) => row.UM,
      sortable: true,
      width: "70px",
    },
    {
      name: "Unit Price",
      selector: (row) => row.UP,
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "end",
      },
    },
    {
      name: "% Disct",
      selector: (row) => row.ActDisct,
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "end",
      },
    },
    {
      name: "P Disct",
      selector: (row) => row.PDisct,
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "end",
      },
    },
    {
      name: "VAT",
      selector: (row) => row.VAT,
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "end",
      },
    },
    {
      name: "Total",
      selector: (row) => row.Total,
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "end",
      },
    },
    {
      name: "Cost",
      selector: (row) => row.Cost,
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "end",
      },
    },
    {
      name: "Batch No.",
      selector: (row) => row.BatchNo,
      width: "150px",
    },
    {
      name: "Exp. Date",
      selector: (row) => row.ExpDate,
      width: "150px",
      sortable: true,
    },
  ];

  const handleChangeCust = (option) => {
    setSelectedOptionCust(option);
  };

  const handleModal = () => {
    if (opwarehouse) {
      setModalShow(!modalShow);
    } else {
      if (selectRefWH.current) {
        selectRefWH.current.focus();
      }
    }
  };

  const totalSum = initialData.reduce(
    (sum, item) => sum + parseFloat(removeComma(item.Total)),
    0
  );
  const totalCost = initialData.reduce(
    (sum, item) => sum + parseFloat(removeComma(item.Cost)),
    0
  );
  const totalActDisct = initialData.reduce(
    (sum, item) => sum + parseFloat(removeComma(item.ActDisct)),
    0
  );
  const totalPDisct = initialData.reduce(
    (sum, item) => sum + parseFloat(removeComma(item.PDisct)),
    0
  );
  const totalVAT = initialData.reduce(
    (sum, item) => sum + parseFloat(removeComma(item.VAT)),
    0
  );

  const handleSubmit = async () => {
    if (!opwarehouse) {
      selectRefWH.current.focus();
    } else if (!selectedOptionCust) {
      selectRefSupplier.current.focus();
    } else if (!inputTerm) {
      inputRefTerm.current.focus();
    } else if (!inputTDate) {
      inputRefTDate.current.focus();
    } else if (!inputRDate) {
      inputRefRDate.current.focus();
    } else if (!inputReferrence) {
      inputRef.current.focus();
    } else if (!inputRemarks) {
      inputRem.current.focus();
    } else if (initialData.length === 0) {
      ClsModalAlert({ icon: "warning", title: "Incomplete Record" });
    } else {
      setbtnLoading(!btnLoading);
      const plsTaxWithheldRate = await ClsGetTaxWithheldRate("01");

      const vartotalTaxWithheldGoods = Number(totalCost) * plsTaxWithheldRate;
      const vartotalPayables =
        Number(totalVAT) + Number(totalCost) - vartotalTaxWithheldGoods;
      const vartotalInventory = Number(totalCost);
      const vartotalVAT = Number(totalVAT);
      const formData = {
        Voucher: "PD",
        UserCode: GetSession().userCode,
        ControlNo: selectedOptionCust.value,
        TDate: inputRDate,
        VDate: inputRDate,
        Reference: inputReferrence,
        Term: inputTerm,
        Remarks: inputRemarks,
        CheckNo: "NA",
        CAmount: 0,
        ASMCode: "001",
        CNCode: GetSession().cnCode,
        DivisionCode: "00",
        TotalDisct: Number(totalActDisct),
        TotalPDisct: Number(totalPDisct),
        ModelTblMain2: initialData.map((item, index) => ({
          StockNumber: item.StockNumber,
          PIn: Number(item.PIn),
          POut: Number(item.POut),
          UP: Number(removeComma(item.UP)),
          Cost: Number(removeComma(item.Cost)),
          ActDisct: Number(removeComma(item.ActDisct)),
          PDisct: Number(removeComma(item.PDisct)),
          VAT: Number(removeComma(item.VAT)),
          UM: item.UM,
          RowNum: index,
          D1: Number(item.D1),
          D2: Number(item.D2),
          D3: Number(item.D3),
          WHCode: item.WHCode,
        })),
        ModelTblMain3: [
          {
            PA: "14105",
            Refer: inputReferrence,
            Debit: vartotalInventory,
            Credit: 0.0,
            SIT: "0",
            RowNum: 0,
            DivisionCode: "01",
          },
          ...(vartotalVAT !== 0
            ? [
                {
                  PA: "14107",
                  Refer: inputReferrence,
                  Debit: vartotalVAT,
                  Credit: 0.0,
                  SIT: "0",
                  DivisionCode: "01",
                },
              ]
            : []),
          ...(vartotalTaxWithheldGoods !== 0
            ? [
                {
                  PA: "2010302011",
                  Refer: inputReferrence,
                  Debit: 0.0,
                  Credit: vartotalTaxWithheldGoods,
                  SIT: "0",
                  DivisionCode: "01",
                },
              ]
            : []),
          {
            PA: "22101",
            Refer: inputReferrence,
            Debit: 0.0,
            Credit: vartotalPayables,
            SIT: "0",
            DivisionCode: "01",
          },
        ],
      };
      const result = await InsertVoucher({ tblMain1: formData });
      if (result === "OK") {
        ClsAlert({ icon: "success", title: "Successfully" });
        setbtnLoading(false);
        await clear();
      } else if (result !== "ERROR") {
        console.log(result);
        ClsAlert({ icon: "info", title: result });
        setbtnLoading(false);
      } else {
        ClsAlert({
          icon: "error",
          title: "There's something error. Please try again",
        });
        setbtnLoading(false);
      }
    }
  };

  const clear = () => {
    AutoNum();
    setinitialData([]);

    setupWarehouse("");
    setSelectedOptionCust("");
    setinputTerm("");
    setinputTDate("");
    setinputRDate("");
    setinputRemarks("");
  };

  return (
    <>
      <div className="py-2">
        <div className="row">
          <div className="col-12 d-flex justify-content-end mb-2">
            <input
              type="text"
              className="form-control text-end"
              defaultValue={autoNum}
              style={{ width: "100px" }}
              disabled
            />
          </div>
          {/* Heading Info */}
          <Form.Group as={Col} md="4" className="pb-3">
            <Form.Label>Warehouse :</Form.Label>
            <select
              ref={selectRefWH}
              className="form-select"
              aria-label="------------"
              defaultValue={""}
              value={opwarehouse}
              onChange={(e) => setupWarehouse(e.target.value)}
            >
              <option disabled value={""}>
                ------------
              </option>

              {Array.isArray(warehouse) &&
                warehouse.map((item, index) => (
                  <option key={index} value={item.whCode}>
                    {item.whDesc}
                  </option>
                ))}
            </select>
          </Form.Group>
          <Form.Group as={Col} md="6" className="pb-3">
            <Form.Label>Supplier :</Form.Label>
            <Select
              value={selectedOptionCust}
              onChange={handleChangeCust}
              options={customer}
              isSearchable={true}
              ref={selectRefSupplier}
            />
          </Form.Group>
          <Form.Group as={Col} md="2" className="pb-3">
            <Form.Label>Term:</Form.Label>
            <Form.Control
              required
              type="number"
              className="text-end"
              ref={inputRefTerm}
              value={inputTerm}
              onChange={(e) => setinputTerm(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md="2" className="pb-3">
            <Form.Label>Transaction Date</Form.Label>
            <Form.Control
              required
              type="date"
              ref={inputRefTDate}
              value={inputTDate}
              onChange={(e) => setinputTDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="2" className="pb-3">
            <Form.Label>Date Recieved</Form.Label>
            <Form.Control
              required
              type="date"
              ref={inputRefRDate}
              value={inputRDate}
              onChange={(e) => setinputRDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" className="pb-3">
            <Form.Label>Referrence</Form.Label>
            <Form.Control
              required
              type="text"
              ref={inputRef}
              value={inputReferrence}
              onChange={(e) => setinputReferrence(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" className="pb-3">
            <Form.Label>Remarks:</Form.Label>
            <Form.Control
              required
              type="text"
              ref={inputRem}
              value={inputRemarks}
              onChange={(e) => setinputRemarks(e.target.value)}
            />
          </Form.Group>
          {/* Heading Info */}

          <div className="col-12 pt-2" style={{ zIndex: 0 }}>
            <div className="card show-lg p-3">
              <div className="d-flex justify-content-start py-2 gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => handleModal()}
                >
                  <i class="fa-solid fa-plus"></i> Add Product
                </button>
                <button
                  className={`btn btn-success ${btnLoading ? "disabled" : ""}`}
                  onClick={handleSubmit}
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
                data={initialData}
                showSearch={false}
                setData={setinitialData}
                showSelectedRows={true}
              />
            </div>
          </div>
          <div className="col-12 pt-2 ">
            <div className="mb-1">
              {" "}
              <div className="d-md-flex d-grid  gap-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="cbSavePrint"
                  />
                  <label className="form-check-label" htmlFor="cbSavePrint">
                    Save and Print?
                  </label>
                </div>
              </div>
            </div>

            <div className="col-12 d-md-flex d-grid justify-content-between align-items-center">
              <div className="d-md-flex d-grid align-items-center  mb-md-0 mb-2 gap-2">
                <label className="danger-text fs-5">
                  Total ActDiscount:{" "}
                  <span className="fw-bold dark">{ClsN2(totalActDisct)}</span>
                </label>
                <label className="danger-text fs-5">
                  Total PDiscount:{" "}
                  <span className="fw-bold dark">{ClsN2(totalPDisct)}</span>
                </label>
                <label className="danger-text fs-5">
                  VAT: <span className="fw-bold dark">{ClsN2(totalVAT)}</span>
                </label>
                <label className="danger-text fs-5">
                  Total Amount:{" "}
                  <span className="fw-bold dark">{ClsN2(totalSum)}</span>
                </label>
                <label className="primary-text fs-5">
                  Total Cost:{" "}
                  <span className="fw-bold dark">{ClsN2(totalCost)}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Product Entry */}
      <ClsModalProductEntry
        modalShow={modalShow}
        handleModal={handleModal}
        setModalShow={setModalShow}
        setinitialData={setinitialData}
        opwarehouse={opwarehouse}
      />
      {/* End Modal Product Entry */}
    </>
  );
}
