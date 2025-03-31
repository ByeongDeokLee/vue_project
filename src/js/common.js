const utils = {
  toQueryString(object) {
    return Object.keys(object)
      .map((key) => (object[key] ? key + "=" + object[key] : ""))
      .join("&");
  },
};

export default utils;
