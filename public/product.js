let products = [];
let isEditMode = false;
let editedIndex;

/// selecting frontEnd elements
const addButton = document.getElementById('add-product-button');
const deleteAllButton = document.getElementById('delete-all-products');
const productList = document.getElementById('product-list');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productDescriptionInput = document.getElementById('product-description');
const productQuantityInput = document.getElementById('product-quantity');

/// add product
const handleSubmit = async () => {
  const productName = productNameInput.value;
  const productPrice = parseInt(productPriceInput.value); // since all form input values are always in string in HTML, parsing these into integer value
  const productDescription = productDescriptionInput.value;
  const productQuantity = parseInt(productQuantityInput.value);

  if (
    productName == '' ||
    isNaN(productPrice) ||
    isNaN(productQuantity) ||
    productDescription == ''
  ) {
    alert('Fields cannot be empty and price/quantity must be numbers.');
    return;
  }

  const product = {
    name: productName,
    price: productPrice,
    description: productDescription,
    quantity: productQuantity,
  };

  if (isEditMode) {
    try {
      const editProduct = await axios.patch(
        `/products/${products[editedIndex]._id}`,
        product
      );

      isEditMode = false;
      editedIndex = undefined;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      // Add a new product
      const createProduct = await axios.post('/products', { ...product });
    } catch (error) {
      console.log(error);
    }
  }

  handleUpdate();
  clearFormInputs();
};

// clear form inputs
function clearFormInputs() {
  productNameInput.value = '';
  productPriceInput.value = '';
  productDescriptionInput.value = '';
  productQuantityInput.value = '';
}

// update product list
const handleUpdate = async () => {
  try {
    const response = await axios.get('/products');
    products = response.data;
  } catch (error) {
    console.log(error);
  }

  productList.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    // Skip the product being edited in edit mode
    if (isEditMode && i === editedIndex) {
      continue;
    }

    const product = products[i];

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.innerHTML = `
      Product Name: ${product.name} <br>
      Price: Rs.${product.price} <br>
      Quantity: ${product.quantity} <br>
      Total: Rs.${product.price * product.quantity}
    `;

    const editButton = document.createElement('button');
    editButton.textContent = 'Update';
    editButton.addEventListener('click', function () {
      handleEdit(i);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
      handleDelete(i);
    });

    span.appendChild(deleteButton);
    span.appendChild(editButton);
    li.appendChild(span);
    productList.appendChild(li);
  }
};

// edit product
const handleEdit = (index) => {
  const currentProduct = products[index];

  isEditMode = true;
  editedIndex = index;

  // Update the input fields with the current product information
  productNameInput.value = currentProduct.name;
  productPriceInput.value = currentProduct.price;
  productDescriptionInput.value = currentProduct.description;
  productQuantityInput.value = currentProduct.quantity;

  // deletes the currently editing product from list
  products.splice(index, 1);
  handleUpdate();
  return currentProduct;
};

// deletes the selected product
const handleDelete = (index) => {
  axios.delete(`/products/${products[index]._id}`);
  handleUpdate();
};

// deletes all products
const handleDeleteAll = () => {
  axios.delete('/products');
  handleUpdate();
};

window.onload = handleUpdate;
deleteAllButton.addEventListener('click', handleDeleteAll);
addButton.addEventListener('click', handleSubmit);
