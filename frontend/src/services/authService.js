import http from "../utils/http-client";

const login = (data) => {
  return http.post("/login", data, {
    transformResponse: [
      (result) => {
        const parsed = JSON.parse(result);
        localStorage.setItem("authUser", JSON.stringify(parsed));
        return parsed;
      },
    ],
  });
};

const register = (data) => {
  return http.post("/register", data);
};

/*
const logout = () => {
    return http.get('/', null, {
        transformResponse: [(result) => {
            localStorage.removeItem('authUser');
            return JSON.parse(result);
        }]
    });
}
*/

const getAuthUser = () => {
  return JSON.parse(localStorage.getItem("authUser"));
};

const getAccountInfo = () => {
  return JSON.parse(localStorage.getItem("accountInfo"));
};

const methods = {
  login,
  register,
  getAuthUser,
  getAccountInfo,
};

export default methods;
