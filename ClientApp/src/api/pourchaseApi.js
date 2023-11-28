import { handleResponse, handleError } from "./apiUtils";

const baseUrlPourchase = process.env.REACT_APP_API_URL + "/pourchase/";

export function getPourchase() {
  return fetch(baseUrlPourchase).then(handleResponse).catch(handleError);
}

export function savePourchase(course) {
  return fetch(baseUrlPourchase + (course.id || ""), {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...course,
      // Parse authorId to a number (in case it was sent as a string).
      //   authorId: parseInt(course.authorId, 10),
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
