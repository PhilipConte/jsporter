export function pathToName(f) {
    if (Array.isArray(f)) return f.map((p) => pathToName(p));
    return f.split('\\').pop().split('/').pop().split('.').reverse()[1];
}

export const isKeyInStore = (store, key) => (
    store.has(key)
    && store.get(key).length
    && (
        store.get(key).length > 1
        || store.get(key)[0] != null
    )
);
