/*global RAW_DATA_ME*/

// eslint-disable-next-line no-unused-vars
const main = (function myFunction() {

  const buildNevgenMatrix = function (nevgenRows) {
    /*
    newgenRow = [
     Probability = 98.30%,
     Fitness = 56.53% [0.89]      ,
     R1b U106>Z381> Z301>L48> L47>Z159>> CTS6353
    ]
    */
    const nevgenMatrixRaw = nevgenRows.map(
      (row) => String(row).replace("\r\n", "")
      .split("\t"));
    const nevgenMatrix = nevgenMatrixRaw.map(
      function (prediction) {
        console.log(prediction);
        const haplogroupBreadCrumbs = prediction[2];
        const probability = prediction[0].slice(14).slice(0, -1);
        const fitnessRaw = prediction[1].slice(10);
        const fitnessMatch = fitnessRaw.match(/(\d+(\.\d+){0,1})%/);
        const fitness = (
          fitnessMatch
          ? fitnessMatch[1]
          : 0
        );
        const fitness2Match = fitnessRaw.match(/\[(\d+(\.\d+){0,1})\]/);
        const fitness2 = (
          fitness2Match
          ? fitness2Match[1]
          : 0
        );
        return [haplogroupBreadCrumbs, probability, fitness, fitness2];
      });

    return nevgenMatrix;
  };

  const totalPercentL1335 = function (nevgenMatrix) {
    return Number(
      Array.from(
        nevgenMatrix).reduce(
        function (prevVal, prediction) {

          if (!prediction[0]) {
            return prevVal;
          } else if (
            (prediction[0].slice(0, 4) === "R1b" + String.fromCharCode(32))
            && (prediction[0].search("L1335") > -1)) {
            const pct = Number(prediction[1]);
            return prevVal + pct;
          } else {
            return prevVal;
          }

        }, 0)).toFixed(2);
  };

  const r_l1335 = function (rawData = RAW_DATA_ME) {
    /*
    rawData = [
     "Probability = 98.30%\t
     Fitness = 56.53% [0.89]      \t
     R1b U106>Z381> Z301>L48> L47>Z159>> CTS6353\r\n",
     ...
    ]
    */

    const nevgenRows = Array.from(JSON.parse(rawData));
    const nevgenMatrix = buildNevgenMatrix(nevgenRows.slice(0, -1));
    const r_l1335_pct = totalPercentL1335(nevgenMatrix);

    if (r_l1335_pct > 0) {
      // console.log(r_l1335_pct);
      return [
        ["R1b L1335", r_l1335_pct]
      ];
    } else {
      return [
        [
          nevgenMatrix[0][0],
          nevgenMatrix[0][1],
          nevgenMatrix[0][2],
          nevgenMatrix[0][3]
        ]
      ];
    }
  };

  return {
    r_l1335
  };

}());
