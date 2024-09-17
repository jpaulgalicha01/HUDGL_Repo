import axios from "axios";
import PlsConnect from "../Class/ClsGetConnection";

export const LoginController = async (formdata) => {
  try {
    const result = await axios.get(
      `${PlsConnect()}/API/HUDGLWebAPI/CheckUserName?strUserName=${
        formdata.username
      }&strPassword=${formdata.password}`
    );

    return result.data;
  } catch (error) {
    console.error(error);
    return "There's Something Error. Please Try Again";
  }
};

export const GetToken = async (formdata) => {
  try {
    const result = await axios.get(
      `${PlsConnect()}/API/HUDGLWebAPI/GetToken?strUserName=${
        formdata.username
      }&strPassword=${formdata.password}`
    );

    return result;
  } catch {
    return "There's Something Error";
  }
};

export const InsertVoucher = async ({ tblMain1 }) => {
  try {
    const result = await axios.post(
      `${PlsConnect()}/API/WEBAPI/InsertModeltblMain1`,
      tblMain1
    );
    return result.data;
  } catch (err) {
    console.error(err);
    return "ERROR";
  }
};
