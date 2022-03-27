const validate = {
  isEmpty: (data) => {
    if(data === "" || data === null){
      return false
    }
    return true;
  },
  isMailer: (data) => {
    const rex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return String(data).match(rex);
  },
  isLimitLenght: (data,min,max) => {
    if (String(data).length < min || String(data).length > max) {
      return false;
    }
    return true;
  },
  isMatchPass: (data) => {
    if (
      !String(data).match("^[a-zA-Z0-9]{3,30}$")
    ) {
      return false;
    }
    return true;
  },
  isNumber:(data)=>{
      if(String(data).match('^[0-9]+$')){
          return true
      }
      return false
  }
};

export default validate;
