const storageRootName = 'public_blogs.';

// save local storage
export function saveLocalStorage(key: string, value: any) {
    localStorage.setItem(storageRootName + key, JSON.stringify(value));
}

// get local storage
export function getLocalStorage(key: string) {
    const value = localStorage.getItem(storageRootName + key);
    return value ? JSON.parse(value) : null;
}

// remove local storage
export function removeLocalStorage(key: string) {
    localStorage.removeItem(storageRootName + key);
}


// save token
export function saveToken(token: string) {
    saveLocalStorage('token', token);
}

// get token
export function getToken() {
    return getLocalStorage('token');
}
