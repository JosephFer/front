import { API_URL } from "../URLs";

export const GET_ALL_COMIDA = API_URL + 'menu/getall?tamPag=10&page=1';
export const CREATE_COMIDA = API_URL + 'menu/add';
export const UPDATE_COMIDA = API_URL + 'menu/update';
export const DELETE_COMIDA = API_URL + 'menu/delete/:idMenu';