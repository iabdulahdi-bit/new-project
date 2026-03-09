function addProduct() {
  const name = document.getElementById("pname").value.trim();
  const price = document.getElementById("pprice").value.trim();
  const category = document.getElementById("pcategory").value.trim();

  if (name === "" || price === "" || category === "") {
    alert("Fill all fields");
    return;
  }

  const table = document.querySelector("table tbody");

  const id = table.rows.length + 1;

  const row = table.insertRow();

  row.innerHTML = `
    <td>${id}</td>
    <td>${name}</td>
    <td>$${price}</td>
    <td>${category}</td>
    <td>
      <i class="fas fa-trash" onclick="deleteProduct(this)"></i>
    </td>
  `;

  document.getElementById("pname").value = "";
  document.getElementById("pprice").value = "";
  document.getElementById("pcategory").value = "";
}

function deleteProduct(btn) {
  const row = btn.parentElement.parentElement;
  row.remove();
}
