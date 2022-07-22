const regexVerifier = (regex, value) => {
  const test = regex.exec(value);

  if (!test) {
    return false;
  }
  return true;
};

export { regexVerifier };
