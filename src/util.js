export function pathToName(f) {
    if (Array.isArray(f)) return f.map((p) => pathToName(p));
    return f.split('\\').pop().split('/').pop().split('.').reverse()[1];
}
