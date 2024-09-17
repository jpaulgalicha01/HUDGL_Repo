export const ClsGetActDisct = ({ grossamt, vardd1, vardd2, vardd3 }) => {
  let privdd1;
  let privdd2;
  let privdd3;

  privdd1 = grossamt * vardd1;
  privdd2 = (grossamt - privdd1) * vardd2;
  privdd3 = (grossamt - (privdd1 + privdd2)) * vardd3;
  return privdd1 + privdd2 + privdd3;
};

export const getVATAmt = ({ varVAT, varVATRate, varNetSalesAmt }) => {
  let varPrincipal;
  let VATAmount;
  if (varVAT === false) {
    VATAmount = 0.0;
  } else {
    varPrincipal = varNetSalesAmt / varVATRate;
    VATAmount = varNetSalesAmt - varPrincipal;
  }
  return VATAmount;
};

export const removeComma = (amount) => {
  let valueClean = amount.replace(/,/g, "");
  let doubleValue = parseFloat(valueClean);
  return doubleValue;
};

export const numericOnly = (number) => {
  let newNumber = number;
  if (/^\d*\.?\d*$/.test(newNumber)) {
    return newNumber;
  }
};
