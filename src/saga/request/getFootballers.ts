import { API_FOOTBALLERS } from '../../api';

export function getFootballersAPI() {
  return fetch(API_FOOTBALLERS)
    .then(response => response.json())
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

export function fetchProfileData() {
  let userPromise = fetchUser();
  return {
    footballers: wrapPromise(userPromise),
  };
}

export type Footballer = {
  id: number;
  avatar: string;
  name: string;
  cardLevel: number;
  OVR: string;
};

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise: Promise<Footballer>) {
  let status = 'pending';
  let result: Footballer;
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

function fetchUser(): Promise<Footballer> {
  return new Promise((resolve, reject) => {
    fetch(API_FOOTBALLERS)
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}
