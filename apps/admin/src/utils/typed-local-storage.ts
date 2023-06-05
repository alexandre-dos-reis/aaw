interface Keymaps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  auth: {
    token: string;
  };
}

type Key = keyof Keymaps;

export const typedLocalStorage = {
  set: <TKey extends Key>(key: TKey, value: Keymaps[TKey]) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get: <TKey extends Key>(key: TKey) => {
    const json = localStorage.getItem(key);
    return json ? (JSON.parse(json) as Keymaps[TKey]) : null;
  },

  remove: <TKey extends Key>(key: TKey) => {
    localStorage.removeItem(key);
  },
};
