import { post } from "utils/request";

export const getHistory = data => post("/mock/getHistory", data);
