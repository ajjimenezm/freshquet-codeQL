function getSearchHistory() {
    const history = localStorage.getItem("searchHistory");
    return history ? JSON.parse(history) : [];
}

function addSearchHistory(search: string | null) {
    if (!search) return;
    const history = getSearchHistory();
    history.push(search);
    localStorage.setItem("searchHistory", JSON.stringify(history));
}

function clearSearchHistory() {
    localStorage.removeItem("searchHistory");
}

function removeSearchHistory(search: string) {
    const history = getSearchHistory();
    const index = history.indexOf(search);
    if (index > -1) {
        history.splice(index, 1);
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }
}

function checkIfSearchHistoryExists(search: string | null) {
    if (!search) return false;
    const history = getSearchHistory();
    return history.indexOf(search) > -1;
}

export {
    getSearchHistory,
    addSearchHistory,
    clearSearchHistory,
    removeSearchHistory,
    checkIfSearchHistoryExists,
};
