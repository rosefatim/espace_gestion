import { emailText, passwordText } from "../constants/credential";

const validatorConnect = (email, password) => {
  if (email === emailText && password === passwordText) {
    return true;
  }
  return false;
};

export { validatorConnect };
