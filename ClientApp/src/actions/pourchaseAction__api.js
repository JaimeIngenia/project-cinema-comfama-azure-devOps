import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypesPourchase__api";
import storeProductShopping from "../stores/productShoppingStore";
import * as pourchaseApi from "../api/pourchaseApi";

export function savePourchase(saveProduct) {
  return pourchaseApi.savePourchase(saveProduct).then((savePourchase) => {
    dispatcher.dispatch({
      actionType: actionTypes.CREATE_PURCHASE__API,
      pourchase: savePourchase,
    });
  });
}

export function updatePourchase(updateProduct) {
  return dispatcher.dispatch({
    actionType: actionTypes.UPDATE_PURCHASE__API,
    pourchase: updateProduct,
  });
}

export function loadPourchase() {
  return dispatcher.dispatch({
    actionType: actionTypes.LOAD_PURCHASE__API,
    pourchase: storeProductShopping.getProductsShopping(),
  });
}

export function deletePourchase(id) {
  // debugger;
  return dispatcher.dispatch({
    actionType: actionTypes.DELETE_PURCHASE__API,
    id: id,
  });
}
