import dayjs from "https://unpkg.com/dayjs@1.11.19/esm/index.js";

function formatDate(deliveryDay) {
  return dayjs().add(deliveryDay, "day").format("dddd, MMMM D");
}

export default formatDate;
