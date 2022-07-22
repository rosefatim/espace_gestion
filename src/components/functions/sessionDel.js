const sessionDelete = (key) => {
  return sessionStorage.removeItem(key);
};

export { sessionDelete };
