/*global main*/

// eslint-disable-next-line no-unused-vars
function r_l1335(rawData) {
  return main.r_l1335(rawData);
}

// eslint-disable-next-line no-unused-vars
function nevgen_format(rawData) {
  return JSON.parse(rawData).reduce((prevVal, curVal) => prevVal + curVal, "");
}
