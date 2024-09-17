import axios from "axios";
import PlsConnect from "../Class/ClsGetConnection";

export async function GetAutoNum({ voucher, cncode }) {
  try {
    const result = await new axios.get(
      `${PlsConnect()}/API/WebAPI/GetAutoNum?strVoucher=${voucher}&strCnCode=${cncode}`
    );
    return result.data;
  } catch (err) {
    console.error(err);
    return "Error";
  }
}

export async function GetCustomer(props) {
  try {
    const result = await axios.get(
      `${PlsConnect()}/API/WebAPI/GetCustomerName?strNtype=${
        props.NType
      }&strCNCode=${props.CNCode}`
    );
    return result.data;
  } catch (err) {
    console.error(err);
    return "Error";
  }
}

export async function GetWareHouse() {
  try {
    const result = await axios.get(`${PlsConnect()}/API/WebAPI/GetWarehouse`);
    return result.data;
  } catch (err) {
    console.error(err);
    return "ERROR";
  }
}

export async function GetProducts() {
  try {
    const result = await axios.get(`${PlsConnect()}/API/WebAPI/GetProducts`);
    return result.data;
  } catch (err) {
    console.error(err);
    return "ERROR";
  }
}

export async function GetProductsDetails(props) {
  try {
    const result = await axios.get(
      `${PlsConnect()}/API/WebAPI/GetProductsDetails?strStockNumber=${
        props.stocknumber
      }&strSPO=${props.spo}`
    );
    return result.data;
  } catch (err) {
    console.error(err);
    return "ERROR";
  }
}

export async function GetVATRate() {
  try {
    const result = await axios.get(`${PlsConnect()}/API/WebAPI/GetVATRate`);
    return result.data;
  } catch (err) {
    console.error(err);
    return "ERROR";
  }
}

export async function GetTaxWithheldRate(whCode) {
  try {
    const result = await axios.get(
      `${PlsConnect()}/API/WebAPI/GetTaxWithheldRate?strTWHCode=${whCode}`
    );
    return result.data;
  } catch (err) {
    console.error(err);
    return "ERROR";
  }
}

export async function GetPA() {
  try {
    const result = await axios.get(`${PlsConnect()}/API/WebAPI/GetPA`);
    return result.data;
  } catch (err) {
    console.error(err);
    return "ERROR";
  }
}

export async function GetSalesman() {
  try {
    const result = await axios.get(`${PlsConnect()}/API/WebAPI/GetSalesman`);
    return result.data;
  } catch (err) {
    console.error(err);
    return "ERROR";
  }
}

export async function GetDivision() {
  try {
    const result = await axios.get(`${PlsConnect()}/API/WebAPI/GetDivision`);
    return result.data;
  } catch (err) {
    console.error(err);
    return "ERROR";
  }
}

export async function GetBatchList(props) {
  try {
    const result = await axios.get(
      `${PlsConnect()}/API/WebAPI/GetBatchList?strStockNumber=${
        props.stockNumber
      }`
    );
    return result.data;
  } catch (err) {
    console.error(err);
    return "ERROR";
  }
}
