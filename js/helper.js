import { API_TIMEOUT } from './config';

// Building of a reject promise
const rejectPromise = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('The request took too long 💥💥💥'));
    }, 1000 * sec);
  });
};

export const helperFetchApi = async function (url, upload = undefined) {
  try {
    const fetchData = upload
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: upload,
        })
      : fetch(url);
    const res = await Promise.race([fetchData, rejectPromise(API_TIMEOUT)]);

    // rejecting the promise if response.ok is not true
    if (!res.ok) throw new Error(` ${res.status} bad request 💥💥💥`);

    // storing data
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
