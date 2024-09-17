import {
  GetAutoNum,
  GetBatchList,
  GetCustomer,
  GetDivision,
  GetPA,
  GetProducts,
  GetProductsDetails,
  GetSalesman,
  GetTaxWithheldRate,
  GetVATRate,
  GetWareHouse,
} from "../Controller/Get";

export async function ClsAutoNumber(props) {
  return await GetAutoNum(props);
}

export async function ClsGetCustomer(props) {
  return await GetCustomer(props);
}

export async function ClsGetWareHouse() {
  return await GetWareHouse();
}

export async function ClsGetProducts() {
  return await GetProducts();
}

export async function ClsGetProductsDetails(props) {
  return await GetProductsDetails(props);
}

export async function ClsGetVATRate() {
  return await GetVATRate();
}

export async function ClsGetTaxWithheldRate(whCode) {
  return await GetTaxWithheldRate(whCode);
}

export async function ClsGetPA() {
  return await GetPA();
}

export async function ClsGetSalesman() {
  return await GetSalesman();
}

export async function ClsGetDivision() {
  return await GetDivision();
}

export async function ClsGetBatchList(props) {
  return await GetBatchList(props);
}
