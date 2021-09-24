import axios from "axios";

export const registrati = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/registrati`, user);

export const login = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, user);
