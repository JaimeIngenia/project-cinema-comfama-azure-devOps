import { handleResponse, handleError } from "./apiUtils";

const baseUrlUsers = process.env.REACT_APP_API_URL + "/users/";

export function getUsers() {
  return fetch(baseUrlUsers).then(handleResponse).catch(handleError);
}
