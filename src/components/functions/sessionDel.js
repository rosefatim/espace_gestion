import  secureLocalStorage  from  "react-secure-storage";

const sessionDelete = (key) => {
            // sessionStorage||localStorage
  return secureLocalStorage.removeItem(key);
};

export { sessionDelete };
