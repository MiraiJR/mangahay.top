import { ProfileResource } from "./profile.vi";

export const profile: ProfileResource = {
  personalInformation: "Personal Information",
  notification: "Notification",
  listFollowedComic: "Followed Comics",
  setting: "Settings",
  profileField: {
    displayName: {
      label: "Display Name",
      placeholder: "Update display name",
    },
    phone: {
      label: "Phone Number",
      placeholder: "Update phone number",
    },
    email: {
      label: "Email Address",
      placeholder: "Update email address",
    },
    updateButton: "Update",
  },
  notificationPage: {
    type: {
      read: "Read",
      unread: "Unread",
    },
    list: "Notification List",
    markAllReadButton: "Mark All as Read",
    removeAllButton: "Delete All",
  },
  followingComicPage: {
    emptyList: "You have not followed any comics yet!",
    label: "Followed Comics List",
    unfollowingComicSuccess: "Successfully unfollowed the comic!",
    action: {
      unfollow: "Unfollow",
    },
  },
  settingPage: {
    viewStyle: {
      label: "View Style",
      placeholder: "Select chapter view style",
      default: "Default (scroll from top to bottom)",
      leftToRight: "Scroll from left to right",
      theNumberOfImagePerSlide: "Number of pages displayed per slide",
    },
    updateSettingSuccess: "Settings updated successfully!",
    saveButton: "Save Settings",
  },
};
