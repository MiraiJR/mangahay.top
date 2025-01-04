const isClient = typeof window !== "undefined";

const JWTManager = () => {
  let inMemoryToken: Token | null = null;
  let onDeleteTokenCallback: (() => void) | null = null;

  const getToken = () => {
    if (!isClient) {
      return null;
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
    if (isClient) {
      window.localStorage.setItem("accessToken", token.accessToken);
      window.localStorage.setItem("refreshToken", token.refreshToken);
    }
    inMemoryToken = token;
  };

  const deleteToken = () => {
    inMemoryToken = null;
    if (isClient) {
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("refreshToken");
    }
    if (onDeleteTokenCallback) {
      onDeleteTokenCallback();
    }
  };

  const onDeleteToken = (callback: () => void) => {
    onDeleteTokenCallback = callback;
  };

  return {
    getToken,
    setToken,
    deleteToken,
    onDeleteToken,
  };
};

export default JWTManager();
