import axios from "axios";
import PlsConnect from "./ClsGetConnection";

export const ClsCheckingConnection = async () => {
  try {
    const result = await axios.get(
      `${PlsConnect()}/API/WebAPI/ConnectionStatus/Online`
    );
    if (result.data === "Connected!") {
      return "Connected";
    }
    return "There's something error in api";
  } catch {
    return "Not Connected";
  }
};
