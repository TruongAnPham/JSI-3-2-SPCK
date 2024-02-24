import Api from "../services/api.js";
import item from "../models/item.js";
import { CustomModal } from "./utils.js";
import Validation from "../models/validation.js";


const api = new Api();
const validate = new Validation(); // Fix: Add 'new' keyword to initialize the Validation object
let itemUpdateId = null;

const getEle = (id) => document.getElementById(id);

const renderUI = (data) => {
  let content = "";
  if (data && data.length > 0) {
    data.forEach((item) => {
      content += `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.price}</td>
        <td style="text-align: center">
            <img width="150" height="150" src="${item.image}" alt="" />
        </td>
        <td>${item.description}</td>
        <td>${item.ingredient}</td>
        <td class="style="text-align: center">
          <button id='btnEdit' class="btn my-3 me-1" data-bs-toggle="modal"
              data-bs-target="#exampleModal" onclick="editItem('${item.id}')">Edit <i class="fa-solid fa-pen-to-square"></i></button>
          <button id='btnDelete' class="btn" onclick="removeItem('${item.id}')">Delete <i class="fa-solid fa-trash"></i></button>
        </td>
    </tr>
    `;
    });
  }
  const tbodyitem = getEle("tbodyitem");
  if (tbodyitem) {
    tbodyitem.innerHTML = content;
  } else {
    console.error("Element with ID 'tbodyitem' not found.");
  }
};

const getItemInfo = () => {
  let name = getEle("name").value;
  let description = getEle("description").value;
  let price = getEle("price").value;
  let image = getEle("image").value;
  let ingredient = getEle("ingredient").value;
  
  let isValid = true;

  isValid &=
    validate.kiemTraRong(name, "tbPN", "(*) Vui lòng nhập tên") &&
    validate.kiemTraDoDaiKiTu(
      name,
      "tbPN",
      "(*) Vui lòng nhập 2-50 kí tự",
      2,
      50
    );

  isValid &=
    validate.kiemTraRong(description, "tbDescription", "(*) Vui lòng nhập mô tả") &&
    validate.kiemTraDoDaiKiTu(
      description,
      "tbDescription",
      "(*) Vui lòng nhập 2-1000 kí tự",
      2,
      1000
    );

  isValid &= validate.kiemTraRong(price, "tbPrice", "(*) Vui lòng nhập giá");

  isValid &=
    validate.kiemTraRong(image, "tbIL", "(*) Vui lòng thêm hình ảnh") &&
    validate.kiemTraDoDaiKiTu(
      image,
      "tbIL",
      2,
      10
    );

  isValid &=
    validate.kiemTraRong(
      ingredient,
      "tbFC",
      "(*) Vui lòng thêm nguyên liệu"
    ) &&
    validate.kiemTraDoDaiKiTu(
      ingredient,
      "tbFC",
      "(*) Vui lòng nhập 2-30 kí tự",
      2,
      30
    );

  if (!isValid) {
    return null;
  }

  const newItem = new item(
    "", // Assuming the ID will be assigned by the backend
    name,
    description,
    price,
    image,
    ingredient
  );
  return newItem;
};

// const getInforItem = () => {
//   const name = getEle("name").value;
//   const description = getEle("description").value;
//   const price = getEle("price").value;
//   const image = getEle("image").value;
//   const ingredient = getEle("ingredient").value;

//   return {
//     name: name,
//     description: description,
//     price: price,
//     image: image,
//     ingredient: ingredient
//   };
// };

const addItem = () => {
  let item = getItemInfo();
  if (!item) return;
  const isValidName = validate.kiemTraRong(item.name, "tbPN", "(*) Vui lòng nhập tên");
  const isValidDescription = validate.kiemTraRong(item.description, "tbDescription", "(*) Vui lòng nhập mô tả");
  const isValidPrice = validate.kiemTraRong(item.price, "tbPrice", "(*) Vui lòng nhập giá");
  const isValidImage = validate.kiemTraRong(item.image, "tbIL", "(*) Vui lòng thêm hình ảnh");
  const isValidIngredient = validate.kiemTraRong(item.ingredient, "tbFC", "(*) Vui lòng thêm nguyên liệu");

  if (!isValidName || !isValidDescription || !isValidPrice || !isValidImage || !isValidIngredient) {
    return;
  }
  api
    .callApi("coffee", "post", item)
    .then(() => {
      getItemList();
      CustomModal.alertSuccess("Add item successfully");
      document.getElementsByClassName("close")[0].click();
    })
    .catch((err) => console.log(err));
};

const editItem = (id) => {
  getEle("btnAdditem").style.display = "none";
  getEle("btnUpdate").style.display = "block";
  api
    .callApi(`coffee/${id}`, "get", null)
    .then((item) => {
      getEle("name").value = item.name;
      getEle("description").value = item.description;
      getEle("price").value = item.price;
      getEle("image").value = item.image;
      getEle("ingredient").value = item.ingredient;
      itemUpdateId = item.id;
    })
    .catch((err) => console.log(err));
};

window.editItem = editItem;

const removeItem = async (id) => {
  const result = await api.callApi(`coffee/${id}`, "delete", null); // Adjusted endpoint
  let res = await CustomModal.alertDelete(
    `This item will be deleted, you can't undo this action`
  );
  if (res.isConfirmed) {
    getItemList();
    CustomModal.alertSuccess(`Delete item successfully`);
    document.getElementsByClassName("close")[0].click();
  }
};

window.removeItem = removeItem;

getEle("btnAdditem").onclick = function () {
  addItem();
};

getEle("btnAdd").onclick = function () {
  getEle("btnAdditem").style.display = "block";
  getEle("btnUpdate").style.display = "none";
  document.getElementById("modal__form").reset();
};

getEle("btnUpdate").onclick = function () {
  const item = getInforitem();
  if (!item) return;
  api
    .callApi(`coffee/${itemUpdateId}`, "put", item)
    .then(() => {
      getListitem();
      CustomModal.alertSuccess("Update item successfully");
      document.getElementsByClassName("close")[0].click();
    })
    .catch((err) => console.log(err));
};

const searchitemByName = async (itemName) => {
  try {
    const items = await api.callApi(`coffee`, "get", null);
    const filteritems = items.filter((item) =>
    item.name.toLowerCase().includes(itemName.toLowerCase())
    );
    renderUI(filteritems);
  } catch (err) {
    console.log(err);
  }
};

getEle("searchButton").addEventListener("click", () => {
  const searchInput = getEle("searchInput").value;
  const itemName = searchInput;

  if (itemName.trim() !== "") {
    searchitemByName(itemName);
  }
});

getEle("searchInput").addEventListener("keyup", () => {
  const searchInput = getEle("searchInput").value;
  if (searchInput.trim() === "") {
    getListitem();
  }
});

getEle("default").addEventListener("click", async () => {
  getEle("default").style.display = "none";
  getEle("sortUp").style.display = "inline-block";
  getEle("sortDown").style.display = "none";
  try {
    const result = await api.callApi("itemStore", "get", null);
    const sortUp = result.sort((a, b) => b.price - a.price);
    renderUI(sortUp);
  } catch (err) {
    console.log(err);
  }
});

getEle("sortUp").addEventListener("click", async () => {
  getEle("default").style.display = "none";
  getEle("sortUp").style.display = "none";
  getEle("sortDown").style.display = "inline-block";
  try {
    const result = await api.callApi("itemStore", "get", null);
    const sortUp = result.sort((a, b) => a.price - b.price);
    renderUI(sortUp);
  } catch (err) {
    console.log(err);
  }
});

getEle("sortDown").addEventListener("click", () => {
  getEle("default").style.display = "inline-block";
  getEle("sortUp").style.display = "none";
  getEle("sortDown").style.display = "none";
  getListitem();
});
