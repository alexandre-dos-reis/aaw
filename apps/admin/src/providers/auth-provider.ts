import { AuthProvider } from "react-admin";
import { env } from "~/utils/env";
import jwt from "jwt-decode";
import { typedLocalStorage } from "~/utils/typed-local-storage";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const req = new Request(`${env.API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      }),
      credentials: "include",
    });

    try {
      const res = (await fetch(req)) as Response & { message: string };
      if (res.status < 200 || res.status >= 300) {
        throw new Error(res.message);
      }
      const json: { token: string } = await res.json();
      const user: { email: string; name: string; id: string } = jwt(json.token);

      typedLocalStorage.set("auth", json);
      typedLocalStorage.set("user", {
        id: user.id,
        name: user.name,
        email: user.email,
      });

      return { redirectTo: "/Artwork" };
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  logout: () => {
    typedLocalStorage.remove("user");
    typedLocalStorage.remove("auth");
    return Promise.resolve();
  },
  checkAuth: () =>
    typedLocalStorage.get("user") ? Promise.resolve() : Promise.reject(),
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      typedLocalStorage.remove("user");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: () => {
    const user = typedLocalStorage.get("user");
    return Promise.resolve({
      id: user?.id || "",
      fullName: user?.name,
    });
  },
  getPermissions: () => Promise.resolve(""),
};
