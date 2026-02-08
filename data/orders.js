export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

export function getOrder(orderId) {
  return orders.find((order) => order.id === orderId);
}

export async function placeOrder(cart) {
  try {
    const response = await fetch("https://supersimplebackend.dev/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    if (!response.ok) throw new Error("Order failed. Please try again");
    const order = await response.json();
    return order;
  } catch (error) {
    console.log("Error placing order: " + error);
  }
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
