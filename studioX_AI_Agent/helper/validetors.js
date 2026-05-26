const isEmpty = (value) => {

  if (!value || value.trim() === "" || value == undefined || value == null) {
    return true;
  }

  return false;
};

export {isEmpty};