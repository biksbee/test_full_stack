import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider  = {
    login: ({ username, password }) => {
        const request = new Request('http://localhost:3000/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(authInfo => {
                localStorage.setItem('token', JSON.stringify(authInfo));
                return Promise.resolve();
            });
    },
    logout: () => {
        localStorage.removeItem(("token"));
        return Promise.resolve();
    },
    checkError: ({status}) => {
        if(status === 401 || status === 403){
            localStorage.removeItem("token");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem("token")
        ? Promise.resolve()
        : Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getIdentity: async () => {
        const id = JSON.parse(localStorage.getItem('token') ?? '');
        const request = new Request(`http://localhost:3000/users/${id.id}`, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(authInfo => {
                return Promise.resolve(authInfo);
            });
    }
}