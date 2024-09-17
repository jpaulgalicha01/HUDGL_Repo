export function UserSession(data) {
  sessionStorage.setItem("UserSession", JSON.stringify(data));
}

export function GetSession() {
  return JSON.parse(sessionStorage.getItem("UserSession"));
}

export function clearLocalStorageItem(key) {
  sessionStorage.removeItem(key);
}

export const ExpireComponentToken = () => {
  const varuserSession = GetSession();
  if (varuserSession !== null) {
    varuserSession.expiryTimeStamp = new Date(
      new Date().getTime() + varuserSession.expiresIn * 1000
    );
    if (
      varuserSession !== null &&
      new Date() < varuserSession.expiryTimeStamp
    ) {
      return varuserSession.token;
    } else if (new Date() > varuserSession.expiryTimeStamp) {
      clearLocalStorageItem("UserSession");
    }
  } else {
    return null;
  }
};
