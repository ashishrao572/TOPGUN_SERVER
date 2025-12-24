const getCurrentIndianQuarter = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const quarterMap = {
    0: 'Q4', 1: 'Q4', 2: 'Q4',     // Jan-Mar: Q4 of previous FY
    3: 'Q1', 4: 'Q1', 5: 'Q1',     // Apr-Jun: Q1
    6: 'Q2', 7: 'Q2', 8: 'Q2',     // Jul-Sep: Q2
    9: 'Q3', 10: 'Q3', 11: 'Q3',   // Oct-Dec: Q3
  };
    
  const quarter = quarterMap[month]; // Get the current quarter based on the month
  const financialYear = (month < 3) ? year - 1 : year; // For Q4 (Jan-Mar), financial year is previous calendar year
  return { quarter, financialYear }; // Return the quarter and financial year
};

 const getPreviousIndianQuarter = (steps) => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  // Map months to quarters and their FY offset
  const monthToQuarter = [
    { quarter: 'Q4', offset: -1 }, // Jan
    { quarter: 'Q4', offset: -1 }, // Feb
    { quarter: 'Q4', offset: -1 }, // Mar
    { quarter: 'Q1', offset: 0 },  // Apr
    { quarter: 'Q1', offset: 0 },  // May
    { quarter: 'Q1', offset: 0 },  // Jun
    { quarter: 'Q2', offset: 0 },  // Jul
    { quarter: 'Q2', offset: 0 },  // Aug
    { quarter: 'Q2', offset: 0 },  // Sep
    { quarter: 'Q3', offset: 0 },  // Oct
    { quarter: 'Q3', offset: 0 },  // Nov
    { quarter: 'Q3', offset: 0 },  // Dec
  ];

  // Get current quarter index (Q1=0, Q2=1, Q3=2, Q4=3)
  const { quarter, offset } = monthToQuarter[month];
  const quarterMap = { Q1: 0, Q2: 1, Q3: 2, Q4: 3 };
  let currentQuarterIdx = quarterMap[quarter];
  let prevFY = year + offset;

  // Move back by `steps` quarters
  let total = currentQuarterIdx - steps;
  while (total < 0) {
    total += 4;
    prevFY -= 1;
  }
  const prevQuarterIdx = total % 4;
  const idxToQuarter = ['Q1', 'Q2', 'Q3', 'Q4'];
  return {
    quarter: idxToQuarter[prevQuarterIdx],
    financialYear: prevFY,
  };
};

module.exports = { getCurrentIndianQuarter, getPreviousIndianQuarter };