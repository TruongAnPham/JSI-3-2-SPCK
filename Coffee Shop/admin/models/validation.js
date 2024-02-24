export default function Validation() {
  const getEle = (id) => document.getElementById(id);

  this.kiemTraRong = function (value, errorId, mess) {
    if (value === "") {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }
    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };

  this.kiemTraDoDaiKiTu = function (value, errorId, mess, min, max) {
    if (min <= value.length && value.length <= max) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraChuoiKiTu = function (value, errorId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraPattern = function (value, pattern, errorId, mess) {
    if (value.match(pattern)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraLoai = function (idSelect, errorId, mess) {
    if (getEle(idSelect).selectedIndex !== 0) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };
}
