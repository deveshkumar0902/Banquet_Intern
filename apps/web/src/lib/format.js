const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});
const num = new Intl.NumberFormat('en-IN');

/** 150000 → '₹1,50,000' */
export const formatINR = (n) => inr.format(n);
/** 25000 → '25,000' */
export const formatNumber = (n) => num.format(n);
