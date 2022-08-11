const sessionHandler = (key, value, type) => {
<<<<<<< HEAD
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

=======
  if (type === "clear") {
    return sessionStorage.clear();
  }
  if (type === "get") {
    return sessionStorage.getItem(key);
  }
  if (type === "set") {
    return sessionStorage.setItem(key, value);
  }
  if (type === "remove") {
    return sessionStorage.removeItem(key);
  }
};
export { sessionHandler };
>>>>>>> 2c0118a4d258f32e0a871655d0443b38b99ba682
