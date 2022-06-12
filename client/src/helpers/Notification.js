import { notification } from "antd";

export const createNotification = (message = "", type = NOTIFICATION.ERROR) => {
  notification[type]({
    message: capitalize(type),
    description: message,
    placement: "bottomRight",
  });
};

export const NOTIFICATION = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info"
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
