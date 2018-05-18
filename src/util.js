function pathToName(fpath) {
    return fpath.map((name) =>
    name.split('\\').pop().split('/').pop()
    .split('.').reverse()[1]);
}

module.exports = { pathToName }