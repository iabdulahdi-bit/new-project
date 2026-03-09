let currentEditRow = null,
  currentTableId = null;
let totalSales = 0;
let totalProfit = 0;
let salesChart;

// // Initialize Chart
window.onload = function () {
  const ctx = document.getElementById("salesChart");
  salesChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Sales",
          data: [],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } },
    },
  });
};

// Tabs
function openTab(tabId, btn) {
  document
    .querySelectorAll(".tab-content")
    .forEach((t) => t.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  document
    .querySelectorAll(".sidebar button")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

// Generic Row Creation
function createRow(values, tableId) {
  const row = document.createElement("tr");
  row.innerHTML =
    values.map((v) => `<td>${v}</td>`).join("") +
    `<td><button class="icon-btn edit-icon" onclick="openModal(this,'${tableId}')">✏️</button></td>
  <td><button class="icon-btn delete-icon" onclick="deleteRow(this,'${tableId}')">🗑️</button></td>`;
  return row;
}

// Products
function addProduct() {
  const name = prodName.value.trim();
  const price = prodPrice.value.trim();
  const cat = prodCategory.value.trim();
  const sku = prodSKU.value.trim();
  if (!name || !price || !cat || !sku) {
    alert("Fill all fields");
    return;
  }
  const row = createRow([name, price, cat, sku], "productTable");
  productTable.querySelector("tbody").appendChild(row);
  prodName.value = "";
  prodPrice.value = "";
  prodCategory.value = "";
  prodSKU.value = "";
}
function submitProducts() {
  const rows = document.querySelectorAll("#productTable tbody tr");

  if (rows.length === 0) {
    alert("No products in the table");
    return;
  }

  alert("Products submitted successfully");
}

function resetProducts() {
  document.getElementById("prodName").value = "";
  document.getElementById("prodPrice").value = "";
  document.getElementById("prodCategory").value = "";
  document.getElementById("prodSKU").value = "";
  document
    .querySelectorAll("#productTable tbody tr")
    .forEach((row) => row.remove());
  alert("Product form reset");
}

// Users
function addUser() {
  const name = userName.value.trim();
  const email = userEmail.value.trim();
  const phone = userPhone.value.trim();
  const role = userRole.value.trim();
  if (!name || !email || !phone || !role) {
    alert("Fill all fields");
    return;
  }
  const row = createRow([name, email, phone, role], "userTable");
  userTable.querySelector("tbody").appendChild(row);
  userName.value = "";
  userEmail.value = "";
  userPhone.value = "";
  userRole.value = "";
}
// Customers
function addCustomer() {
  const name = customerName.value.trim();
  const email = customerEmail.value.trim();
  const phone = customerPhone.value.trim();
  const address = customerAddress.value.trim();
  if (!name || !email || !phone || !address) {
    alert("Fill all fields");
    return;
  }
  const row = createRow([name, email, phone, address], "customerTable");
  customerTable.querySelector("tbody").appendChild(row);
  customerName.value = "";
  customerEmail.value = "";
  customerPhone.value = "";
  customerAddress.value = "";
}
function submitCustomers() {
  const rows = document.querySelectorAll("#customerTable tbody tr");
  if (rows.length === 0) {
    alert("No customers in the table");
    return;
  }
  alert("Customers submitted successfully");
}
function resetCustomers() {
  document.getElementById("customerName").value = "";
  document.getElementById("customerEmail").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("customerAddress").value = "";
  document
    .querySelectorAll("#customerTable tbody tr")
    .forEach((row) => row.remove());
  alert("Customer form reset");
}

// Orders + Update Sales
function addOrder() {
  const customer = orderCustomer.value.trim();
  const product = orderProduct.value.trim();
  const price = parseFloat(orderPrice.value.trim());
  const date = orderDate.value;
  const Phone = orderPhone.value.trim();
  const address = orderAddress.value.trim();
  if (
    !customer ||
    !product ||
    !price ||
    isNaN(price) ||
    !date ||
    !Phone ||
    !address
  ) {
    alert("Fill all fields correctly");
    return;
  }

  const row = createRow(
    [customer, product, price, date, Phone, address],
    "orderTable",
  );
  orderTable.querySelector("tbody").appendChild(row);
  totalSales += price;
  totalProfit += price * 0.2;
  document.getElementById("totalSales").textContent = totalSales.toFixed(2);
  document.getElementById("totalProfit").textContent = totalProfit.toFixed(2);
  // Update Chart
  // salesChart.data.labels.push(date);
  // salesChart.data.datasets[0].data.push(price);
  // salesChart.update();
  if (salesChart) {
    salesChart.data.labels.push(date);
    salesChart.data.datasets[0].data.push(price);
    salesChart.update();
  }
}
function submitOrders() {
  const rows = document.querySelectorAll("#orderTable tbody tr");
  if (rows.length === 0) {
    alert("No orders in the table");
    return;
  }
  alert("Orders submitted successfully");
}
function resetOrders() {
  document.getElementById("orderCustomer").value = "";
  document.getElementById("orderProduct").value = "";
  document.getElementById("orderPrice").value = "";
  document.getElementById("orderDate").value = "";
  document.getElementById("orderPhone").value = "";
  document.getElementById("orderAddress").value = "";
  document
    .querySelectorAll("#orderTable tbody tr")
    .forEach((row) => row.remove());

  alert("Order form reset");
  totalSales = 0;
  totalProfit = 0;
  document.getElementById("totalSales").textContent = totalSales.toFixed(2);
  document.getElementById("totalProfit").textContent = totalProfit.toFixed(2);
  if (salesChart) {
    salesChart.data.labels = [];
    salesChart.data.datasets[0].data = [];
    salesChart.update();
  }
}
//Edit Orders + Update Sales
function openOrderModal(btn, tableId) {
  currentEditRow = btn.closest("tr");
  const cells = currentEditRow.querySelectorAll("td");
  modalName.value = cells[0].textContent;
  modalValue.value = cells[1].textContent;
  modalExtra.value = cells[2].textContent;
  editModal.style.display = "flex";
}
function closeOrderModal() {
  document.getElementById("editModal").style.display = "none";
  currentEditRow = null;
}
function saveOrderModalEdit() {
  if (!currentEditRow) return;
  const cells = currentEditRow.querySelectorAll("td");
  cells[0].textContent = modalName.value;
  cells[1].textContent = modalValue.value;
  cells[2].textContent = modalExtra.value;
  closeOrderModal();
  alert("Order updated");
}

//delete Orders + Update Sales
function deleteOrder(btn) {
  if (confirm("Delete?")) btn.closest("tr").remove();
  alert("Order deleted");
}
//placeholder export function
function exportAllTables() {
  alert("Export feature ready for CSV implementation");
}
const ctx = document.getElementById("salesChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Oil Crops", "Grains", "Fruits", "Industrial Crops"],
    datasets: [
      {
        label: "Products by Category",
        data: [12, 19, 8, 5],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

//   delete Row
function deleteRow(btn, tableId) {
  if (confirm("Delete?")) btn.closest("tr").remove();
}
//   open Edit Modal
function openModal(btn, tableId) {
  currentEditRow = btn.closest("tr");
  currentTableId = tableId;
  const cells = currentEditRow.querySelectorAll("td");
  modalName.value = cells[0].textContent;
  modalValue.value = cells[1].textContent;
  modalExtra.value = cells[2].textContent;
  editModal.style.display = "flex";
}
//   close Edit Modal
function closeModal() {
  document.getElementById("editModal").style.display = "none";
  currentEditRow = null;
  currentTableId = null;
}
//   save Edit Modal
function saveModalEdit() {
  if (!currentEditRow) return;
  const cells = currentEditRow.querySelectorAll("td");
  cells[0].textContent = modalName.value;
  cells[1].textContent = modalValue.value;
  cells[2].textContent = modalExtra.value;
  closeModal();
}
//   placeholder export function
function exportTable(tableId) {
  alert(`Export ${tableId} ready for CSV implementation`);
}
function exportAllTables(tableId) {
  const tables = ["productTable", "userTable", "customerTable", "orderTable"];
  tables.forEach((tableId) => exportTable(tableId));
}
//   edit Orders + Update Sales
// let CurrentEditRow = null;

// function addOrder() {
//   const customer = document.getElementById("orderCustomer").value.trim();
//   const product = document.getElementById("orderProduct").value.trim();
//   const price = document.getElementById("orderPrice").value;
//   const date = document.getElementById("orderDate").value;
//   const phone = document.getElementById("orderPhone").value.trim();
//   const address = document.getElementById("orderAddress").value.trim();

//   if (!customer || !product || !price || !date || !phone || !address) {
//     alert("Fill all fields");
//     return;
//   }

//   const table = document.querySelector("#orderTable tbody");

//   if (currentEditRow) {
//     currentEditRow.cells[0].innerText = customer;
//     currentEditRow.cells[1].innerText = product;
//     currentEditRow.cells[2].innerText = price;
//     currentEditRow.cells[3].innerText = date;
//     currentEditRow.cells[4].innerText = phone;
//     currentEditRow.cells[5].innerText = address;

//     currentEditRow = null;
//   } else {
//     const row = table.insertRow();

//     row.innerHTML = `
// <td>${customer}</td>
// <td>${product}</td>
// <td>${price}</td>
// <td>${date}</td>
// <td>${phone}</td>
// <td>${address}</td>
// <td><button onclick="editOrder(this)">Edit</button></td>
// <td><button onclick="deleteOrder(this)">Delete</button></td>
// `;
//   }

//   clearOrderInputs();
// }

// function editOrder(btn) {
//   currentEditRow = btn.parentElement.parentElement;

//   document.getElementById("orderCustomer").value =
//     currentEditRow.cells[0].innerText;
//   document.getElementById("orderProduct").value =
//     currentEditRow.cells[1].innerText;
//   document.getElementById("orderPrice").value =
//     currentEditRow.cells[2].innerText;
//   document.getElementById("orderDate").value =
//     currentEditRow.cells[3].innerText;
//   document.getElementById("orderPhone").value =
//     currentEditRow.cells[4].innerText;
//   document.getElementById("orderAddress").value =
//     currentEditRow.cells[5].innerText;
// }

// function deleteOrder(btn) {
//   btn.parentElement.parentElement.remove();
// }

// function clearOrderInputs() {
//   orderCustomer.value = "";
//   orderProduct.value = "";
//   orderPrice.value = "";
//   orderDate.value = "";
//   orderPhone.value = "";
//   orderAddress.value = "";
// }
