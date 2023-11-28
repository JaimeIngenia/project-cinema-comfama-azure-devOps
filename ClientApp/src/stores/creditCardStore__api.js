import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypesCreditCard__api";

const CHANGE_EVENT = "change";
let _cards = [];

class cardStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  getCards() {
    return _cards;
  }
  getCardBySlug(slug) {
    return _cards.find((course) => course.codigoSeguridad === slug);
  }
}

const store = new cardStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.DELETE_CATEGORY:
      _cards = _cards.filter((course) => course.id !== parseInt(action.id, 10));
      store.emitChange();
      break;

    case actionTypes.CREATE_CARD__API:
      _cards.push(action.creditCart);
      store.emitChange();
      break;

    case actionTypes.UPDATE_CARD__API:
      _cards = _cards.map((p) =>
        p.id === action.creditCards.id ? action.creditCards : p
      );
      store.emitChange();
      break;

    case actionTypes.LOAD_CARD__API:
      _cards = action.creditCards;
      store.emitChange();
      break;
    default:
    // no poner nada aqui
  }
});

export default store;
