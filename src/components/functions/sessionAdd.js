import  secureLocalStorage  from  "react-secure-storage";


const sessionAdd = (key, value) => {
            // sessionStorage || localStorage
  return secureLocalStorage.setItem(key, value);
};

export { sessionAdd };
