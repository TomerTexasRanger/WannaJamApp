import axios from "axios";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

export const login = async (email, password) => {
  const { data } = await axios.post("/api/auth", { email, password });
  localStorage.setItem(tokenKey, data.token);
};

export default login;
