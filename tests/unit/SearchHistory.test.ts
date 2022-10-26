import {
    getSearchHistory,
    addSearchHistory,
    clearSearchHistory,
    removeSearchHistory,
    checkIfSearchHistoryExists,
} from "../../src/libs/SearchHistory";
import LocalStorageMock from "../../mocks/localStorageMock";

const localStorageMock = new LocalStorageMock();

describe("SearchHistory", () => {
    beforeEach(() => {
        localStorageMock.clear();
    });

    it("should return empty array if no history exists", () => {
        expect(getSearchHistory()).toEqual([]);
    });

    it("should return the history if it exists", () => {
        localStorageMock.setItem("searchHistory", JSON.stringify(["test"]));
        expect(getSearchHistory()).toEqual(["test"]);
    });

    it("should add a search to the history", () => {
        addSearchHistory("test");
        expect(getSearchHistory()).toEqual(["test"]);
    });

    it("should not add a search to the history if it already exists", () => {
        addSearchHistory("test");
        addSearchHistory("test");
        expect(getSearchHistory()).toEqual(["test"]);
    });

    it("should clear the history", () => {
        addSearchHistory("test");
        clearSearchHistory();
        expect(getSearchHistory()).toEqual([]);
    });

    it("should remove a search from the history", () => {
        addSearchHistory("test");
        removeSearchHistory("test");
        expect(getSearchHistory()).toEqual([]);
    });

    it("should return false if a search does not exist in the history", () => {
        expect(checkIfSearchHistoryExists("test")).toEqual(false);
    });

    it("should return true if a search exists in the history", () => {
        addSearchHistory("test");
        expect(checkIfSearchHistoryExists("test")).toEqual(true);
    });
});
