import  secureLocalStorage  from  "react-secure-storage";

const sessionGet = (key) => {
          // sessionStorage || localStorage
  return secureLocalStorage.getItem(key);
};

export { sessionGet };
