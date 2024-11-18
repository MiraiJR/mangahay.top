export const search = {
  searchResult: "Kết quả tìm kiếm",
  searchAction: {
    label: "Tìm kiếm truyện",
    placeholder: "Nhập tên truyện cần tìm",
  },
  advanceSearch: {
    label: "Tìm kiếm nâng cao",
    author: {
      label: "Tác giả",
      placeholder: "Nhập tên tác giả",
    },
    status: {
      label: "Trạng thái",
      placeholder: "Chọn trạng thái",
    },
    sort: {
      label: "Sắp xếp",
      placeholder: "Chọn sắp xếp",
    },
    genre: {
      label: "Thể loại",
    },
  },
};

export type SearchResource = typeof search;
