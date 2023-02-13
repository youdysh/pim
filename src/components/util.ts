import BigNumber from "bignumber.js";

const baseStringElements = "0123456789qwertyiopasdfghklzxcvbnmQWERTYIOPASDFGHKLZXCVBNM!@?#*,.+-=/"

export const hexToOther = (hexString: string) => {
    let decimalValue = new BigNumber(hexString, 16);
    let base70String = '';
    while (decimalValue.gt(0)) {
        let remainder = decimalValue.mod(baseStringElements.length);
        base70String = baseStringElements.at(remainder.toNumber()) + base70String;
        decimalValue = decimalValue.dividedToIntegerBy(baseStringElements.length);
    }
    return base70String;
}
