import { isNullish } from "./guards";

function parse(value) {
  return JSON.parse(value);
}

function stringify(value) {
  if (value == null) return "null";

  return JSON.stringify(value);
}

function storageFactory(storage) {
  return Object.freeze({
    get(key, defaults) {
      const value = parse(storage.getItem(key));

      if (isNullish(value) && !isNullish(defaults)) {
        return defaults;
      }

      return value;
    },
    put(key, value) {
      storage.setItem(key, stringify(value));
    },
    remove(key) {
      storage.removeItem(key);
    },
  });
}

export const LocalStorage = storageFactory(localStorage);
