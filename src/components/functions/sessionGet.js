const sessionGet = (key) => {
  return sessionStorage.getItem(key);
};

export { sessionGet };
