import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypesCreditCard__api";
import * as creditCardsApi from "../api/CreditCardApi";
import * as creditCardApi from "../api/CreditCardApi";

export function loadCards() {
  return creditCardsApi.getCreditCards().then((creditCards) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_CARD__API,
      creditCards: creditCards,
    });
  });
}

// export function saveCard(creditCart) {
//   return dispatcher.dispatch({
//     actionType: actionTypes.CREATE_CARD,
//     creditCart: creditCart,
//   });
// }

export function saveCreditCard__api(course) {
  return creditCardApi.saveCreditCard(course).then((savedCourse) => {
    // Hey dispatcher , ve y dime todas las historias que un curso fue solamente creado
    dispatcher.dispatch({
      actionType: actionTypes.CREATE_CARD__API,
      creditCart: savedCourse,
    });
  });
}

export function updateCreditCards__api(updateProduct) {
  return dispatcher.dispatch({
    actionType: actionTypes.UPDATE_CARD__API,
    creditCards: updateProduct,
  });
}

// export function saveCourse(course) {
//   return courseApi.saveCourse(course).then((savedCourse) => {
//     // Hey dispatcher , ve y dime todas las historias que un curso fue solamente creado
//     dispatcher.dispatch({
//       actionType: course.id
//         ? actionTypes.UPDATE_COURSE
//         : actionTypes.CREATE_COURSE,
//       course: savedCourse,
//     });
//   });
// }
