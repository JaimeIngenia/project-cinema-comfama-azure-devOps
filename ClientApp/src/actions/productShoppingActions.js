import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypesProductShopping";
import storeProductShopping from "../stores/productShoppingStore";

export function saveProductShopping(saveProduct) {
  return dispatcher.dispatch({
    actionType: actionTypes.CREATE_PRODUCT_SHOPPING,
    product: saveProduct,
  });
}

export function updateProductsShopping(updateProduct) {
  return dispatcher.dispatch({
    actionType: actionTypes.UPDATE_PRODUCT_SHOPPING,
    product: updateProduct,
  });
}

export function loadProductsShopping() {
  return dispatcher.dispatch({
    actionType: actionTypes.LOAD_PRODUCT_SHOPPING,
    products: storeProductShopping.getProductsShopping(),
  });
}

export function deleteProductShopping(id) {
  // debugger;
  return dispatcher.dispatch({
    actionType: actionTypes.DELETE_PRODUCT_SHOPPING,
    id: id,
  });
}
