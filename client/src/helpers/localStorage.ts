const addToLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key: string): any => {
  return JSON.parse(localStorage.getItem(key) || "[]") || [];
};

export { addToLocalStorage, getFromLocalStorage };
