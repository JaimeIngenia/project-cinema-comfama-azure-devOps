import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypesProductShopping";

const CHANGE_EVENT = "change";

let _productsShopping = [];

class ProductShoppingStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  getProductsShopping() {
    return _productsShopping;
  }
  getProductShoppingById(id) {
    return _productsShopping.find((p) => p.id === id);
  }

  getTotalCant() {
    let suma = 0;
    _productsShopping.forEach((ps) => (suma += ps.count));
    return suma;
  }
  getTotaSumProductsPrice() {
    let sumaPrices = 0;
    _productsShopping.forEach((ps) => (sumaPrices += Number(ps.price)));
    return sumaPrices;
  }
}

const store = new ProductShoppingStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.DELETE_PRODUCT_SHOPPING:
      // debugger;
      _productsShopping = _productsShopping.filter(
        (course) => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;

    case actionTypes.CREATE_PRODUCT_SHOPPING:
      _productsShopping.push(action.product);
      store.emitChange();
      break;

    case actionTypes.UPDATE_PRODUCT_SHOPPING:
      _productsShopping = _productsShopping.map((p) =>
        p.id === action.product.id ? action.product : p
      );
      store.emitChange();
      break;

    case actionTypes.LOAD_PRODUCT_SHOPPING:
      _productsShopping = action.LOAD_PRODUCT_SHOPPING;
      store.emitChange();
      break;
    default:
      break;
  }
});

export default store;
