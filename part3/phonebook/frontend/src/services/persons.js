import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newObject) =>
  axios.post(baseUrl, newObject).then((response) => response.data);

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then((response) => response.data);

const delete_ = (id) => axios.delete(`${baseUrl}/${id}`);

export { getAll, create, update, delete_ };
