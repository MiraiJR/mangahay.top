const isClient = typeof window !== "undefined";

const JWTManager = () => {
  let inMemoryToken: Token | null = null;

  const getToken = () => {
    if (!isClient) {
      return;
    }

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
    isClient && window.localStorage.setItem("accessToken", token.accessToken);
    isClient && window.localStorage.setItem("refreshToken", token.refreshToken);
    inMemoryToken = token;
  };

  const deleteToken = () => {
    inMemoryToken = null;
    isClient && window.localStorage.removeItem("accessToken");
    isClient && window.localStorage.removeItem("refreshToken");
  };

  return {
    getToken,
    setToken,
    deleteToken,
  };
};

export default JWTManager();
