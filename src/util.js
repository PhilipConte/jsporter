export function pathToName(f) {
    function conv(n) { return n.split('\\').pop()
        .split('/').pop().split('.').reverse()[1];}
    return (Array.isArray(f))? f.map((p) => conv(p)): conv(f);
}
