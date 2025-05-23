const makeAddressString = (obj: any): string => {
  let str = "";
  if (obj?.name) {
    str += obj.name + ", ";
  }
  if (obj?.address) {
    str += obj.address + ", ";
  }
  if (obj?.city) {
    str += obj.city + ", ";
  }
  if (obj?.state) {
    str += obj.state + ", ";
  }
  if (obj?.pincode) {
    str += obj.pincode + ", ";
  }
  if (obj?.phone) {
    str += obj.phone + ", ";
  }

  if (str.slice(str.length - 2, str.length) === ", ") {
    return str.slice(0, str.length - 2);
  }
  return str;
};

export { makeAddressString };
