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

export const arrCount = arr => {
    let counts = {};
    for (let i = 0; i < arr.length; i++) {
        let num = arr[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts;
}

export const uniqueify = (arr, func) => {
    const simples = func(arr);
    const counts = arrCount(simples);
    return simples.map((el, ind) => (
        (counts[el] > 1) ? arr[ind] : el
    ));
}
