import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypesPourchase__api";

const CHANGE_EVENT = "change";
let _pourchase = [];

class pourchaseStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  getPourches() {
    return _pourchase;
  }
  getCardByPourchase(slug) {
    return _pourchase.find((course) => course.codigoSeguridad === slug);
  }
}

const store = new pourchaseStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.DELETE_PURCHASE__API:
      _pourchase = _pourchase.filter(
        (course) => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;

    case actionTypes.CREATE_PURCHASE__API:
      _pourchase.push(action.pourchase);
      store.emitChange();
      break;

    case actionTypes.UPDATE_PURCHASE__API:
      _pourchase = _pourchase.map((p) =>
        p.id === action.pourchase.id ? action.pourchase : p
      );
      store.emitChange();
      break;

    case actionTypes.LOAD_PURCHASE__API:
      _pourchase = action.pourchase;
      store.emitChange();
      break;
    default:
    // no poner nada aqui
  }
});

export default store;
