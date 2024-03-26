const unitChange = (type, number, unit, isRemin) => {
    //1.kwh：容量、电量
    let divisor;
    let suffix;
    
    if (type === 1) {
      divisor = 1000;
      suffix = ["kWh", "MWh", "GWh"];
    } else if (type === 3) {
      divisor = 1000;
      suffix = ["kW", "MW", "GW"];
    } else if (type === 4) {
      divisor = 1000;
      suffix = ["kVar", "MVar", "Var"];
    } else if (type === 5) {
      divisor = 1000;
      suffix = ["kVA", "MVA", "GVA"];
    } else if (type === 6) {
      divisor = 1000;
      suffix = ["kVarh", "MVarh", "GVarh"];
    }
  
    let convertedNumber;
    if (number >= 0) {
      if (number < 1000) {
        convertedNumber = isRemin ? number.toFixed(2) : number;
        unit = suffix[0] + unit;
      } else if (number < 1000 * 1000) {
        convertedNumber = isRemin ? (number / divisor).toFixed(2) : (number / divisor);
        unit = suffix[1] + unit;
      } else {
        convertedNumber = isRemin ? (number / divisor / 1000).toFixed(2) : (number / divisor / 1000);
        unit = suffix[2] + unit;
      }
    } else {
      number = -number;
      if (number < 1000) {
        convertedNumber = isRemin ? -number.toFixed(2) : -number;
        unit = suffix[0] + unit;
      } else if (number < 1000 * 1000) {
        convertedNumber = isRemin ? -(number / divisor).toFixed(2) : -(number / divisor);
        unit = suffix[1] + unit;
      } else {
        convertedNumber = isRemin ? -(number / divisor / 10000).toFixed(2) : -(number / divisor / 10000);
        unit = suffix[2] + unit;
      }
    }
    return { number: convertedNumber, unit: unit };
}
const unitMoney =(type, number, unit, isRemin)=>{
    let divisor = 10000;
    let suffix = ["", "万", "亿"];;
    let convertedNumber;
    if (number >= 0) {
        if (number < 1000) {
          convertedNumber = isRemin ? number.toFixed(2) : number;
          unit = suffix[0] + unit;
        } else if (number < 1000 * 10000) {
          convertedNumber = isRemin ? (number / divisor).toFixed(2) : (number / divisor);
          unit = suffix[1] + unit;
        } else {
          convertedNumber = isRemin ? (number / divisor / 10000).toFixed(2) : (number / divisor / 1000);
          unit = suffix[2] + unit;
        }
      } else {
        number = -number;
        if (number < 1000) {
          convertedNumber = isRemin ? -number.toFixed(2) : -number;
          unit = suffix[0] + unit;
        } else if (number < 1000 * 10000) {
          convertedNumber = isRemin ? -(number / divisor).toFixed(2) : -(number / divisor);
          unit = suffix[1] + unit;
        } else {
          convertedNumber = isRemin ? -(number / divisor / 10000).toFixed(2) : -(number / divisor / 10000);
          unit = suffix[2] + unit;
        }
      }
      return { number: convertedNumber, unit: unit };
}
export {unitChange,unitMoney};