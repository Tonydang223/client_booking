export const getLocalStorage = (value) => {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem(value);
    }
    return null;
  } catch (error) {
    return null;
  }
};
export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem(key, value);
  }
};
export const getAllLocalStorage = (key, value) => {
  try {
    if (typeof window !== "undefined") {
      let newobj = {};
      const keys = Object.keys(localStorage);
      keys.map((key) => (newobj[key] = localStorage.getItem(key)));
      return newobj
    }
    return null;
  } catch (error) {
    return null;
  }
};
