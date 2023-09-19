const JWTManager = () => {
  let inMemoryToken: Token | null = null;

  const getToken = () => {
    if (
      window.localStorage.getItem("accessToken") &&
      inMemoryToken === null &&
      window.localStorage.getItem("refreshToken")
    ) {
      inMemoryToken = {
        accessToken: window.localStorage.getItem("accessToken") ?? "",
        refreshToken: window.localStorage.getItem("refreshToken") ?? "",
      };
    }

    return inMemoryToken;
  };

  const setToken = (token: Token) => {
    window.localStorage.setItem("accessToken", token.accessToken);
    window.localStorage.setItem("refreshToken", token.refreshToken);
    inMemoryToken = token;
  };

  const deleteToken = () => {
    inMemoryToken = null;
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
  };

  return {
    getToken,
    setToken,
    deleteToken,
  };
};

export default JWTManager();
