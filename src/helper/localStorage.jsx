export const getCartData = () => {
  let localCartData = localStorage.getItem("latkanCart");
  const parseData = JSON.parse(localCartData);
  if (!Array.isArray(parseData)) return [];
  return parseData;
};

export const setCartData = (cart) => {
  return localStorage.setItem("latkanCart", JSON.stringify(cart));
};

export const getWishData = () => {
  let localWishData = localStorage.getItem("Wishlist");
  const parseData = JSON.parse(localWishData);
  if (!Array.isArray(parseData)) return [];
  return parseData;
};

export const setWishData = (cart) => {
  return localStorage.setItem("Wishlist", JSON.stringify(cart));
};
