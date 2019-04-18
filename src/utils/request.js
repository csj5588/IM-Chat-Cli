import { request } from './fetch';
import { stringify } from "query-string";

const get = (url, data, more = {}) =>
  request(
    `${url}?${stringify(data)}`,
    {
      method: "GET",
    },
    more
  );

const post = (url, data, more = {}) =>
  request(
    url,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    more
  );

export { get, post };