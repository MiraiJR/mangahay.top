export const profile = {
  personalInformation: "Thông tin cá nhân",
  notification: "Thông báo",
  listFollowedComic: "Truyện đang theo dõi",
  setting: "Cài đặt",
  profileField: {
    displayName: {
      label: "Tên hiển thị",
      placeholder: "Cập nhật tên hiển thị",
    },
    phone: {
      label: "Số điện thoại",
      placeholder: "Cập nhật số điện thoại",
    },
    email: {
      label: "Địa chỉ email",
      placeholder: "Cập nhật địa chỉ email",
    },
    updateButton: "Cập nhật",
  },
  notificationPage: {
    type: {
      read: "Đã đọc",
      unread: "Chưa đọc",
    },
    list: "Danh sách thông báo",
    markAllReadButton: "Đánh dấu đã đọc hết",
    removeAllButton: "Xoá tất cả",
  },
  followingComicPage: {
    emptyList: "Bạn chưa theo dõi truyện nào cả!",
    label: "Danh sách truyện đang theo dõi",
    unfollowingComicSuccess: "Huỷ theo dõi truyện thành công!",
    action: {
      unfollow: "Huỷ theo dõi",
    },
  },
  settingPage: {
    viewStyle: {
      label: "Kiểu xem",
      placeholder: "Chọn kiểu xem chương",
      default: "Mặc định (lướt từ trên xuống dưới)",
      leftToRight: "Kiểu lướt từ trái sang phải",
      theNumberOfImagePerSlide: "Số lượng trang truyện mỗi lần hiển thị",
    },
    updateSettingSuccess: "Cập nhập cài đặt thành công!",
    saveButton: "Lưu cài đặt",
  },
};

export type ProfileResource = typeof profile;
