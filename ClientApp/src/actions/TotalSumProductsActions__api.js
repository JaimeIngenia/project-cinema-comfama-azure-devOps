import dispatcher from "../appDispatcher";
// import * as categoriaOracleApi from '../api/categoriaOracleApi'
import actionTypes from "./actionTypesTotalSumProducts__api";

export function moreCount() {
  // debugger;
  //   console.log("estoy aqui!");
  return dispatcher.dispatch({
    actionType: actionTypes.MORE_COUNT,
  });
}

export function lessCount() {
  return dispatcher.dispatch({
    actionType: actionTypes.LESS_COUNT,
  });
}

export function saveTotalSumProducts__api(saveProduct) {
  return dispatcher.dispatch({
    actionType: actionTypes.CREATE_TOTAL_SUM_PRODUCTS__API,
    totalSumProducts__ap: saveProduct,
  });
}
