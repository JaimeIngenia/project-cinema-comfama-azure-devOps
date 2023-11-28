import dispatcher from "../appDispatcher";
// import * as categoriaOracleApi from '../api/categoriaOracleApi'
import actionTypes from "./actionTypesUser";
import * as userApi from "../api/UserApi";

export function saveUser(product) {
  return dispatcher.dispatch({
    actionType: actionTypes.CREATE_CATEGORY,
    //SE QUIERE PASAR EL CURSO COMO PARTE DE LA ACCION
    // product: saveProduct
  });
}

export function loadUsers() {
  return userApi.getUsers().then((users) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_USER,
      users: users,
    });
  });
}

export function deleteUser(id) {
  return dispatcher.dispatch({
    actionType: "DELETE_CATEGORY",
    id: id,
  });
}
