const sessionHandler = (key, value, type) => {
    if (type === "clear"){
      return sessionStorage.clear();
    }
    if (type=== "get"){
      return sessionStorage.getItem(key);
    }
    if (type === "set"){
      return sessionStorage.setItem(key, value);
    }
    if (type === "remove"){
      return sessionStorage.removeItem(key);
    }
  };
  
  export { sessionHandler};
