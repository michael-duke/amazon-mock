import dayjs from "https://unpkg.com/dayjs@1.11.19/esm/index.js";

export function formatOrderDate(date) {
  return dayjs(date).format("MMMM D");
}

export function formatDeliveryDate(date) {
  return dayjs(date).format("dddd, MMMM D");
}

function formatBusinessDate(deliveryDays) {
  let date = dayjs();
  let daysCounted = 0;

  while (daysCounted < deliveryDays) {
    date = date.add(1, "day");

    // Use the helper in the loop
    if (!isWeekend(date)) daysCounted++;
  }

  return date.format("dddd, MMMM D");
}

// Helper: Returns true if the date is Sat (6) or Sun (0)
export const isWeekend = (date) => {
  const day = dayjs(date).day();
  return day === 0 || day === 6;
};

export default formatBusinessDate;
