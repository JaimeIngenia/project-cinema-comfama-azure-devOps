import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypesUsers__api";
import * as userApi from "../api/UserApi";

export function loadUsers() {
  //   debugger;
  return userApi.getUsers().then((users) => {
    // console.log("usersJaime: " + users);
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_USER__API,
      users: users,
    });
  });
}
