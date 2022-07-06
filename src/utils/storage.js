export function getStorage(key) {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : undefined;
}

export function setStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
