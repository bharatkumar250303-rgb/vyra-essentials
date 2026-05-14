function addToCart(id, name, price, image) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(item => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {

    cart.push({
      id,
      name,
      price,
      image,
      quantity: 1
    });

  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "/cart";
}