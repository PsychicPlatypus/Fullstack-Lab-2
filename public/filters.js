export function sortByTitleAsc(a, b) {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}

export function sortByTitleDesc(a, b) {
    if (a.title > b.title) {
        return -1;
    }
    if (a.title < b.title) {
        return 1;
    }
    return 0;
}

export function sortByAuthorAsc(a, b) {
    if (a.author < b.author) {
        return -1;
    }
    if (a.author > b.author) {
        return 1;
    }
    return 0;
}

export function sortByAuthorDesc(a, b) {
    if (a.author > b.author) {
        return -1;
    }
    if (a.author < b.author) {
        return 1;
    }
    return 0;
}

export function sortByPriceAsc(a, b) {
    if (a.price < b.price) {
        return -1;
    }
    if (a.price > b.price) {
        return 1;
    }
    return 0;
}

export function sortByPriceDesc(a, b) {
    if (a.price > b.price) {
        return -1;
    }
    if (a.price < b.price) {
        return 1;
    }
    return 0;
}
