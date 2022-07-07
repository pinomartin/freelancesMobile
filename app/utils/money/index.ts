export const secondsToMoney = (
  seconds: number,
  amountPerHour: number,
): number => {
  if (seconds > 0) {
    const hourPortion = seconds / 3600;
    const estimatedTotalAmount = Number(
      (hourPortion * amountPerHour).toFixed(2),
    );
    return estimatedTotalAmount;
  }

  return 0;
};

export const getEstimatedTotalVSCurrentAmount = (
  estimatedProjectHours: number,
  estimatedProjectAmountXHour: number,
  realTotalAmount: number,
): number => {
  const difference = Number(
    (
      estimatedProjectHours * estimatedProjectAmountXHour -
      realTotalAmount
    ).toFixed(2),
  );
  if (difference < 0) {
    return 0;
  }
  return difference;
};
