import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypesProduct__api";
import * as productApi from "../api/ProductsApi";

export function loadProducts() {
  return productApi.getProducts().then((products) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_PRODUCT__API,
      products: products,
    });
  });
}

export function updateProducts(updateProduct) {
  return dispatcher.dispatch({
    actionType: actionTypes.UPDATE_PRODUCT__API,
    product: updateProduct,
  });
}
