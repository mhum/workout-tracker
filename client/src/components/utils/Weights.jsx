const memo = {
  LA: {},
  ES: {}
};

const calculateLiftAmount = (repMax, percent) => {
  const memoValue = memo.LA[`${repMax}-${percent}`];
  if (memoValue) {
    return memoValue;
  }

  if (percent) {
    const workingMax = Math.round((repMax * 0.9) / 5) * 5;
    const amount = Math.round((workingMax * percent) / 5) * 5;

    memo.LA[`${repMax}-${percent}`] = amount;
    return amount;
  }

  memo.LA[`${repMax}-${percent}`] = 0;
  return 0;
};

const calculateEachSide = (repMax, percent) => {
  const memoValue = memo.ES[`${repMax}-${percent}`];
  if (memoValue) {
    return memoValue;
  }

  const calculatedWeight = (calculateLiftAmount(repMax, percent) - 45) / 2;

  if (calculatedWeight < 0) {
    memo.ES[`${repMax}-${percent}`] = 0;
    return 0;
  }

  memo.ES[`${repMax}-${percent}`] = calculatedWeight;
  return calculatedWeight;
};

export {
  calculateLiftAmount,
  calculateEachSide
};
