import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypesUsers__api";

const CHANGE_EVENT = "change";
let _users = [];

class productShoppingStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  getUser() {
    return _users;
  }
  getUserBySlug(slug) {
    return _users.find((course) => course.codigoSeguridad === slug);
  }
}

const store = new productShoppingStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.DELETE_CATEGORY:
      _users = _users.filter((course) => course.id !== parseInt(action.id, 10));
      store.emitChange();
      break;

    case actionTypes.CREATE_CATEGORY:
      _users.push(action.category);
      store.emitChange();
      break;

    case actionTypes.UPDATE_CATEGORY:
      _users = _users.map((course) =>
        course.id === action.category.id ? action.category : course
      );
      store.emitChange();
      break;

    case actionTypes.LOAD_USER__API:
      _users = action.users;
      store.emitChange();
      break;
    default:
    // no poner nada aqui
  }
});

export default store;
