const calculateLiftAmount = (repMax, percent) => {
  const workingMax = Math.round((repMax * 0.9) / 5) * 5;

  if (percent) {
    return Math.round((workingMax * percent) / 5) * 5;
  }
  return 0;
};

const calculateEachSide = (repMax, percent) => {
  const calculatedWeight = (calculateLiftAmount(repMax, percent) - 45) / 2;

  if (calculatedWeight < 0) {
    return 0;
  }

  return calculatedWeight;
};

export {
  calculateLiftAmount,
  calculateEachSide
};
