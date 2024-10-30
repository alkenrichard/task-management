import { Product } from "../data/product";

const product = Product;

const productReducer = (state = product, action) => {
  switch (action.type) {
    case "DELETE_PRODUCT":
      return action.payload;

    case "INSERT_PRODUCT":
      const updatedData = [...state];
      updatedData.push(action.payload);
      localStorage.setItem("product", JSON.stringify(updatedData));

      return updatedData;

    default:
      return state;
  }
};

export { productReducer };
