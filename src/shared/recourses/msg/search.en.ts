import { SearchResource } from "./search.vi";

export const search: SearchResource = {
  searchResult: "Search Results",
  searchAction: {
    label: "Search Comics",
    placeholder: "Enter the comic name to search",
  },
  advanceSearch: {
    label: "Advanced Search",
    author: {
      label: "Author",
      placeholder: "Enter the author's name",
    },
    status: {
      label: "Status",
      placeholder: "Select status",
    },
    sort: {
      label: "Sort",
      placeholder: "Select sorting option",
    },
    genre: {
      label: "Genre",
    },
  },
};
