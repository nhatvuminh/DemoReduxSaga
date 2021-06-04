import {API_FOOTBALLERS} from '../../api';

export function getFootballersAPI() {
  return fetch(API_FOOTBALLERS)
    .then(response => response.json())
    .then(response => ({response}))
    .catch(error => ({error}));
}

export function fetchProfileData() {
  let userPromise = fetchUser();
  return {
    footballers: wrapPromise(userPromise),
  };
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e;
    },
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}

function fetchUser() {
  return new Promise((resolve, reject) => {
    fetch(API_FOOTBALLERS)
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}
