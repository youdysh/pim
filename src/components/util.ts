import BigNumber from "bignumber.js";

const baseStringElements = "0123456789qwertyiopasdfghklzxcvbnmQWERTYIOPASDFGHKLZXCVBNM!@?#*,.+-=/"

// 16进制转为其他进制
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
export const passwordAndTitleToCode = (password: string, title: string) => {
    const index = findThirdNumber(password) + 1
    return password.slice(0, index) + title + password.slice(index);
}
export const findThirdNumber = (str: string) => {
    let count = 0;
    let number = 0;
    for (let i = 0; i < str.length; i++) {
        if (!isNaN(Number(str[i]))) {
            count++;
            if (count === 3) {
                number = i;
                break;
            }
        }
    }
    return number;
}

const smallLetters = "abcdefghijklmnopqrstuvwxyz";
const bigLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const specialCharacters = "!@?#*,.+-=/";
export const checkPassword = (password: string) => {
    const status = {
        numberCount: password.match(/\d/g)?.length,
        smallLetterCount: password.match(/[a-z]/g)?.length,
        bigLetterCount: password.match(/[A-Z]/g)?.length,
        specialCount: password.match(/[!@?#*,.+-=/]/g)?.length,
    }

    console.log(status)
    return password
}