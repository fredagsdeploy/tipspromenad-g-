import uuid4 from "uuid/v4";

export const getDeviceId = () => {
  const prevId = localStorage.getItem("device_id");

  if (prevId) {
    return prevId;
  } else {
    const uid = uuid4();
    localStorage.setItem("device_id", uid);
    return uid;
  }
};
