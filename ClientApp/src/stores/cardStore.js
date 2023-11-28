import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypesCard";

const CHANGE_EVENT = "change";
let _cards = [
  {
    id: 1,
    cardHolderName: "Rebecca Soto :",
    cardNumber: "9999 8888 9999 0909",
    expDate: "02/2022",
    cvc: "123",
  },
];

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

    case actionTypes.CREATE_CARD:
      _cards.push(action.creditCart);
      store.emitChange();
      break;

    case actionTypes.UPDATE_CATEGORY:
      _cards = _cards.map((course) =>
        course.id === action.category.id ? action.category : course
      );
      store.emitChange();
      break;

    case actionTypes.LOAD_CARD:
      _cards = action.creditCards;
      store.emitChange();
      break;
    default:
    // no poner nada aqui
  }
});

export default store;
