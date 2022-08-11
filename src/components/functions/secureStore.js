<<<<<<< HEAD
import  secureLocalStorage  from  "react-secure-storage";


const secureHandler = (key, value, type) => {
  if (type === "clear"){
    return secureLocalStorage.clear();
  }
  if (type=== "get"){
    return secureLocalStorage.getItem(key);
  }
  if (type === "set"){
    return secureLocalStorage.setItem(key, value);
  }
  if (type === "remove"){
    return secureLocalStorage.removeItem(key);
  }
};

export { secureHandler};



=======
import secureLocalStorage from "react-secure-storage";

const secureHandler = (key, value, type) => {
  if (type === "clear") {
    return secureLocalStorage.clear();
  }
  if (type === "get") {
    return secureLocalStorage.getItem(key);
  }
  if (type === "set") {
    return secureLocalStorage.setItem(key, value);
  }
  if (type === "remove") {
    return secureLocalStorage.removeItem(key);
  }
};
export { secureHandler };
>>>>>>> 2c0118a4d258f32e0a871655d0443b38b99ba682
