let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

function saveToLocal() {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

function renderTable() {
  const tbody = document.getElementById('inventoryBody');
  tbody.innerHTML = '';
  let totalStock = 0;

  inventory.forEach((item, index) => {
    const row = document.createElement('tr');
    totalStock += Number(item.quantity);

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${(item.quantity * item.price).toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editProduct(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById('totalProducts').innerText = inventory.length;
  document.getElementById('totalStock').innerText = totalStock;
}

function addProduct() {
  const name = document.getElementById('productName').value.trim();
  const quantity = parseInt(document.getElementById('productQuantity').value);
  const price = parseFloat(document.getElementById('productPrice').value);

  if (!name || isNaN(quantity) || isNaN(price)) {
    alert("Please enter valid product data.");
    return;
  }

  inventory.push({ name, quantity, price });
  saveToLocal();
  renderTable();

  // Clear inputs
  document.getElementById('productName').value = '';
  document.getElementById('productQuantity').value = '';
  document.getElementById('productPrice').value = '';
}

function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    inventory.splice(index, 1);
    saveToLocal();
    renderTable();
  }
}

function editProduct(index) {
  const item = inventory[index];
  const newName = prompt("Edit Product Name:", item.name);
  const newQty = parseInt(prompt("Edit Quantity:", item.quantity));
  const newPrice = parseFloat(prompt("Edit Price:", item.price));

  if (newName && !isNaN(newQty) && !isNaN(newPrice)) {
    inventory[index] = { name: newName, quantity: newQty, price: newPrice };
    saveToLocal();
    renderTable();
  } else {
    alert("Invalid input. Changes not saved.");
  }
}

function searchProduct() {
  const filter = document.getElementById("searchInput").value.toUpperCase();
  const table = document.getElementById("inventoryTable");
  const tr = table.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      const txtValue = td.textContent || td.innerText;
      tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
  }
}

// Initialize
renderTable();
