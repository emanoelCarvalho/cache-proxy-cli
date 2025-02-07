const cache = new Map();

const getFromCache = (key) => {
    return cache.get(key);
}

const setToCache = (key, value) => {
    cache.set(key, value)
}

module.exports = {
    getFromCache,
    setToCache
}