import { handleResponse, handleError } from "./apiUtils";

const baseUrlCreditCards = process.env.REACT_APP_API_URL + "/debitCards/";

export function getCreditCards() {
  return fetch(baseUrlCreditCards).then(handleResponse).catch(handleError);
}

export function saveCreditCard(course) {
  return fetch(baseUrlCreditCards + (course.id || ""), {
    method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...course,
      // Parse authorId to a number (in case it was sent as a string).
      // authorId: parseInt(course.authorId, 10),
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

// export function saveCreditCard(course) {
//   return fetch(baseUrl + (course.id || ""), {
//     method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify({
//       ...course,
//       // Parse authorId to a number (in case it was sent as a string).
//       authorId: parseInt(course.authorId, 10),
//     }),
//   })
//     .then(handleResponse)
//     .catch(handleError);
// }
