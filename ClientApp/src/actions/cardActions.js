import dispatcher from "../appDispatcher";
// import * as categoriaOracleApi from '../api/categoriaOracleApi'
import actionTypes from "./actionTypesCard";
import * as creditCardsApi from "../api/CreditCardApi";

export function saveCard(creditCart) {
  return dispatcher.dispatch({
    actionType: actionTypes.CREATE_CARD,
    //SE QUIERE PASAR EL CURSO COMO PARTE DE LA ACCION
    creditCart: creditCart,
  });
}

export function loadCards() {
  return creditCardsApi.getCreditCards().then((creditCards) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_CARD,
      creditCards: creditCards,
    });
  });
}

export function deleteProduct(id) {
  return dispatcher.dispatch({
    actionType: "DELETE_CATEGORY",
    id: id,
  });
}
