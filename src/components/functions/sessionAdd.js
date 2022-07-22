const sessionAdd = (key, value) => {
  return sessionStorage.setItem(key, value);
};

export { sessionAdd };
