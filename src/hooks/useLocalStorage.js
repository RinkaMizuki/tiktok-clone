function useLocalStorage() {
  const getLocalStorage = (key) => {
    const result = localStorage.getItem(key);
    if (result) return JSON.parse(result);
    else return {};
  };

  const setLocalStorage = (key, value = {}) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return { getLocalStorage, setLocalStorage };
}

export default useLocalStorage;
