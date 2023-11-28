import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypesProduct";
import storeProduct from "../stores/productStore";

export function saveProduct(product) {
  return dispatcher.dispatch({
    actionType: actionTypes.CREATE_PRODUCT,
    product: product,
  });
}

export function updateProducts(updateProduct) {
  return dispatcher.dispatch({
    actionType: actionTypes.UPDATE_PRODUCT,
    product: updateProduct,
  });
}

export function loadProducts() {
  return dispatcher.dispatch({
    actionType: actionTypes.LOAD_PRODUCT,
    products: storeProduct.getProducts(),
  });
}

export function deleteProduct(id) {
  return dispatcher.dispatch({
    actionType: actionTypes.DELETE_PRODUCT,
    id: id,
  });
}
