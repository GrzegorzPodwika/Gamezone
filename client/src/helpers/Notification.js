import { notification } from "antd";

export const createNotification = (type, message) => {
  notification[type]({
    message: capitalize(type),
    description: message,
    placement: "bottomRight",
  });
};

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
