export const loginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginError = (error) => ({
  type: "LOGIN_ERROR",
  payload: error,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const FOLLOW = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const UNFOLLOW = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
