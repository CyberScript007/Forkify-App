import { API_URL } from './config';
import { API_TIMEOUT } from './config';

// Building of a reject promise
const rejectPromise = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('The request took too long 💥💥💥'));
    }, 1000 * sec);
  });
};

export const helperFetchRecipe = async function (id) {
  try {
    const res = await Promise.race([
      fetch(`${API_URL}${id}`),
      rejectPromise(API_TIMEOUT),
    ]);

    // rejecting the promise if response.ok is not true
    if (!res.ok) throw new Error(`${res.status} bad request 💥💥💥`);

    // storing data
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const helperFetchSearchRecipe = async function (query) {
  try {
    const res = await Promise.race([
      fetch(`${API_URL}?search=${query}`),
      rejectPromise(API_TIMEOUT),
    ]);

    // rejecting the promise if response.ok is not true
    if (!res.ok) throw new Error(`${res.status} bad request 💥💥💥`);

    // storing data
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
