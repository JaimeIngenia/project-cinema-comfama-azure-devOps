import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypesProduct__api";

const CHANGE_EVENT = "change";

let _products = [];

class productStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  getProducts() {
    return _products;
  }

  getProductById(id) {
    return _products.find((p) => p.id === id);
  }
}

const store = new productStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.DELETE_PRODUCT:
      _products = _products.filter(
        (course) => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;

    case actionTypes.CREATE_PRODUCT:
      _products.push(action.product);
      store.emitChange();
      break;

    case actionTypes.UPDATE_PRODUCT__API:
      _products = _products.map((p) =>
        p.id === action.product.id ? action.product : p
      ); // Se filtra el id del producto la acción con el id del elemento del product, entonces se guarda el producto de la accion
      store.emitChange();
      break;

    case actionTypes.LOAD_PRODUCT__API:
      _products = action.products;
      store.emitChange();
      break;
    default:
      break;
  }
});

export default store;
