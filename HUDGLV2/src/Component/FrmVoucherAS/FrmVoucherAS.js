import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { MyTables } from "../../Tools/Datable";
import FrmVoucherASChild from "./FrmVoucherASChild";
import {
  ClsAutoNumber,
  ClsGetCustomer,
  ClsGetDivision,
  ClsGetPA,
  ClsGetSalesman,
  ClsGetWareHouse,
} from "../../Class/ClsGetSomething";
import { GetSession } from "../../Class/ClsSession";
import { ClsAlert, ClsModalAlert } from "../../Class/ClsAlert";
import { ClsModelTblMain1 } from "../../Model/ClsEntryModel";
import { ClsN2 } from "../../Class/ClsN2";
import { removeComma } from "../../Class/ClsVariousFormula";
import { InsertVoucher } from "../../Controller/Insert";

export default function FrmVoucherAS() {
  const [autoNum, setAutoNum] = useState(null);
  const [modalShow, setmodalShow] = useState(false);
  const [SelectWarehouse, setSelectWarehouse] = useState([]);
  const [SelectCustomer, setSelectCusomter] = useState([]);
  const [SelectPA, setSelectPA] = useState([]);
  const [SelectSalesman, setSelectSalesman] = useState([]);
  const [SelectDivision, setSelectDivision] = useState([]);
  const [CBAccountNumber, setCBAccountNumber] = useState(false);
  const [btnLoading, setbtnLoading] = useState(false);

  const [tblData, setTblData] = useState([]);
  const [tblMain1, setTblMain1] = useState(ClsModelTblMain1());
  const [WHCode, setWHCode] = useState("");
  const [ControlNo, setControlNo] = useState(null);
  const [AT, setAT] = useState(null);
  const [Referrence, setReferrence] = useState(null);

  const refWHCode = useRef(null);
  const refControlNo = useRef(null);
  const refAT = useRef(null);
  const refTDate = useRef(null);
  const refReferrence = useRef(null);
  const refASMcode = useRef(null);
  const refDivisionCode = useRef(null);
  const refRemarks = useRef(null);

  useEffect(() => {
    AutoNumber();
    FetchingWarehouse();
    FetchingCustomer();
    FetchingAccountTitle();
    FetchingSalesman();
    FetchingDivision();
  }, [CBAccountNumber, tblMain1]);

  async function AutoNumber() {
    const result = await ClsAutoNumber({
      voucher: "AS",
      cncode: GetSession().cnCode,
    });
    setAutoNum(result);
    setReferrence("AS#" + result);
    // setinputReferrence("AS#" + result);
  }
  async function FetchingWarehouse() {
    const data = await ClsGetWareHouse();
    return setSelectWarehouse(data);
  }

  async function FetchingCustomer() {
    const data = await ClsGetCustomer({
      NType: "C",
      CNCode: GetSession().cnCode,
    });
    if (data === "ERROR") {
      ClsAlert({ icon: "error", title: "There's Something Error" });
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
    setSelectCusomter(result);
  }

  async function FetchingAccountTitle() {
    const data = await ClsGetPA();

    if (data === "ERROR") {
      ClsAlert({ icon: "error", title: "There's Something Error" });
      return;
    }

    if (!Array.isArray(data)) {
      console.error("Expected data to be an array, but got:", data);
      return;
    }

    const result = data
      .sort((a, b) => {
        const key = CBAccountNumber ? "pa" : "at";
        return a[key].localeCompare(b[key]);
      })
      .map((item) => {
        let label;

        if (CBAccountNumber) {
          label = item.pa + " - " + item.at;
        } else {
          label = item.at;
        }
        return {
          value: item.pa,
          label: label,
        };
      });
    await setSelectPA(result);
  }

  async function FetchingSalesman() {
    const data = await ClsGetSalesman();
    return setSelectSalesman(data);
  }

  async function FetchingDivision() {
    const data = await ClsGetDivision();
    return setSelectDivision(data);
  }

  const columns = [
    {
      name: "Description",
      selector: (row) => row.Description,
      sortable: true,
      width: "350px",
    },
    {
      name: "Qty In",
      selector: (row) => row.QtyIn,
      width: "100px",
      right: "true",
      style: {
        display: "flex",
        justifyContent: "end",
      },
    },
    {
      name: "Qty Out",
      selector: (row) => row.QtyOut,
      width: "100px",
      right: "true",
      style: {
        display: "flex",
        justifyContent: "end",
      },
    },
    {
      name: "UM",
      selector: (row) => row.UM,
      width: "100px",
    },
    {
      name: "Unit Cost",
      selector: (row) => row.UnitCost,
      width: "100px",
      right: "true",
      style: {
        display: "flex",
        justifyContent: "end",
      },
    },
    {
      name: "Total",
      selector: (row) => row.Total,
      width: "100px",
      right: "true",
      style: {
        display: "flex",
        justifyContent: "end",
      },
    },
    {
      name: "Batch No.",
      selector: (row) => row.BatchNo,
    },
    {
      name: "Exp. Date",
      selector: (row) => row.ExpDate,
    },
  ];

  const HandleChange = (e) => {
    setTblMain1((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const Cost = tblData.reduce(
    (sum, item) => sum + parseFloat(removeComma(item.Total)),
    0
  );

  const HandleSave = async () => {
    if (!WHCode) {
      refWHCode.current.focus();
    } else if (!ControlNo) {
      refControlNo.current.focus();
    } else if (!AT) {
      refAT.current.focus();
    } else if (!tblMain1.TDate) {
      refTDate.current.focus();
    } else if (!Referrence) {
      refReferrence.current.focus();
    } else if (!tblMain1.ASMCode) {
      refASMcode.current.focus();
    } else if (!tblMain1.DivisionCode) {
      refDivisionCode.current.focus();
    } else if (!tblMain1.Remarks) {
      refRemarks.current.focus();
    } else if (tblData.length === 0) {
      ClsModalAlert({ icon: "warning", title: "Incomplete Record" });
    } else {
      let formData = {
        Voucher: "AS",
        UserCode: GetSession().userCode,
        ControlNo: ControlNo.value,
        TDate: tblMain1.TDate,
        VDate: tblMain1.TDate,
        Reference: tblMain1.Referrence,
        Term: 0,
        Remarks: tblMain1.Remarks,
        CheckNo: "NA",
        CAmount: 0,
        ASMCode: tblMain1.ASMCode,
        CNCode: GetSession().cnCode,
        DivisionCode: tblMain1.DivisionCode,
        TotalDisct: 0.0,
        TotalPDisct: 0.0,

        ModelTblMain2: tblData.map((rows, index) => ({
          StockNumber: rows.StockNumber,
          PIn: Number(removeComma(rows.QtyIn)),
          POut: Number(removeComma(rows.QtyOut)),
          UP: Number(removeComma(rows.UnitCost)),
          Cost: Number(removeComma(rows.Total)),
          ActDisct: 0.0,
          PDisct: 0.0,
          VAT: 0.0,
          UM: rows.UM,
          RowNum: index,
          D1: 0.0,
          D2: 0.0,
          D3: 0.0,
          WHCode: WHCode,
        })),
        ModelTblMain3: [
          ...(Cost !== 0
            ? [
                {
                  PA: "14105",
                  Refer: tblMain1.Referrence,
                  Debit: Cost,
                  Credit: 0.0,
                  SIT: "0",
                  DivisionCode: tblMain1.DivisionCode,
                },
                {
                  PA: AT.value,
                  Refer: tblMain1.Referrence,
                  Debit: 0,
                  Credit: Cost,
                  SIT: "0",
                  DivisionCode: tblMain1.DivisionCode,
                },
              ]
            : [
                {
                  PA: AT.value,
                  Refer: tblMain1.Referrence,
                  Debit: Cost * -1,
                  Credit: Cost,
                  SIT: "0",
                  DivisionCode: tblMain1.DivisionCode,
                },
                {
                  PA: "14105",
                  Refer: tblMain1.Referrence,
                  Debit: 0.0,
                  Credit: Cost * -1,
                  SIT: "0",
                  DivisionCode: tblMain1.DivisionCode,
                },
              ]),
        ],
      };

      setbtnLoading(!btnLoading);
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
    AutoNumber();
    setTblMain1(ClsModelTblMain1());
    setTblData([]);
    setWHCode("");
    setControlNo(null);
    setAT(null);
  };
  return (
    <React.Fragment>
      <div className="row py-2 " style={{ rowGap: "5px" }}>
        <div className="col-12 d-flex justify-content-end">
          <input
            type="text"
            className="form-control text-end mb-2"
            defaultValue={autoNum}
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
            value={WHCode}
            onChange={(e) => setWHCode(e.target.value)}
            ref={refWHCode}
          >
            <option disabled value={""}>
              -----------------
            </option>
            {Array.isArray(SelectWarehouse) &&
              SelectWarehouse.map((rows, index) => (
                <React.Fragment key={index}>
                  <option value={rows.whCode}>{rows.whDesc}</option>
                </React.Fragment>
              ))}
          </select>
        </div>

        <div className="col-md-4 col-12 ">
          <label htmlFor="selectCustomer">Name:</label>
          <Select
            name="ControlNo"
            options={SelectCustomer}
            value={ControlNo}
            onChange={(e) => setControlNo(e)}
            isSearchable={true}
            ref={refControlNo}
            // ref={selectRefSupplier}
          />
        </div>
        <div className="col-md-5 col-12 ">
          <label htmlFor="selectCustomer">Account Title:</label>
          <Select
            name="Customer"
            options={SelectPA}
            value={AT}
            onChange={(e) => setAT(e)}
            isSearchable={true}
            ref={refAT}
          />
        </div>

        <div className="col-md-3 col-5">
          <label htmlFor="inputDate">Date: </label>
          <input
            type="date"
            className="form-control"
            id="inputDate"
            name="TDate"
            onChange={HandleChange}
            value={tblMain1.TDate}
            ref={refTDate}
          />
        </div>

        <div className="col-md-4 col-7">
          <label htmlFor="inputReferrence">Referrence: </label>
          <input
            type="text"
            className="form-control"
            id="inputReferrence"
            name="Referrence"
            onChange={(e) => setReferrence(e.target.value)}
            value={Referrence}
            ref={refReferrence}
          />
        </div>

        <div className="col-md-5 col-12 ">
          <label htmlFor="selectWarehouse">Salesman:</label>
          <select
            className="form-select"
            id="selectWarehouse"
            defaultValue={""}
            name="ASMCode"
            onChange={HandleChange}
            value={tblMain1.ASMCode}
            ref={refASMcode}
          >
            <option disabled value={""}>
              -----------------
            </option>
            {Array.isArray(SelectSalesman) &&
              SelectSalesman.map((rows, index) => (
                <React.Fragment key={index}>
                  <option value={rows.smCode}>{rows.smDesc}</option>
                </React.Fragment>
              ))}
          </select>
        </div>
        <div className="col-md-6 col-12 ">
          <label htmlFor="selectDivision">Division:</label>
          <select
            className="form-select"
            id="selectDivision"
            defaultValue={""}
            name="DivisionCode"
            onChange={HandleChange}
            value={tblMain1.DivisionCode}
            ref={refDivisionCode}
          >
            <option value="" disabled>
              -----------------
            </option>
            {Array.isArray(SelectDivision) &&
              SelectDivision.map((rows, index) => (
                <React.Fragment key={index}>
                  <option value={rows.divisionCode}>{rows.divisionDesc}</option>
                </React.Fragment>
              ))}
          </select>
        </div>

        <div className="col-md-6 col-12">
          <label htmlFor="inputRemarks">Remarks: </label>
          <input
            type="text"
            className="form-control"
            id="inputRemarks"
            name="Remarks"
            onChange={HandleChange}
            value={tblMain1.Remarks}
            ref={refRemarks}
          />
        </div>

        <div className="d-md-flex d-grid  gap-3 pt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="cbSavePrint"
              onChange={() => setCBAccountNumber(!CBAccountNumber)}
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
                onClick={() => HandleSave()}
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
              setData={setTblData}
            />
          </div>
        </div>

        <div className="col-12 d-md-flex d-grid justify-content-between align-items-center">
          <div className="d-md-flex d-grid align-items-center  mb-md-0 mb-2 gap-2">
            <label className="primary-text fs-5">
              Total Cost: <span className="fw-bold dark">{ClsN2(Cost)}</span>
            </label>
          </div>
        </div>

        <FrmVoucherASChild
          modalShow={modalShow}
          setmodalShow={setmodalShow}
          setTblData={setTblData}
        />
      </div>
    </React.Fragment>
  );
}
