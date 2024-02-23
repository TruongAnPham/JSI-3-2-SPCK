document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById("myForm"),
        imgInput = document.querySelector(".img"),
        file = document.getElementById("imgInput"),
        userName = document.getElementById("name"),
        subtitle = document.getElementById("Subtitle"), // Changed from Subtitle to subtitle
        ingrediences = document.getElementById("Ingrediences"), // Changed from Ingrediences to ingrediences
        prices = document.getElementById("Prices"), // Changed from Prices to prices
        comewith = document.getElementById("Comewith"), // Changed from Comewith to comewith
        submitBtn = document.querySelector(".submit"),
        userInfo = document.getElementById("data"),
        modal = document.getElementById("userForm"),
        modalTitle = document.querySelector("#userForm .modal-title"),
        newUserBtn = document.querySelector(".newUser");

    let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

    let isEdit = false, editId;
    showInfo();

    newUserBtn.addEventListener('click', ()=> {
        submitBtn.innerText = 'Submit',
        modalTitle.innerText = "Fill the Form"
        isEdit = false
        imgInput.src = "./image/Profile Icon.webp"
        form.reset()
    });

    file.onchange = function(){
        if(file.files[0].size < 1000000){  // 1MB = 1000000
            var fileReader = new FileReader();

            fileReader.onload = function(e){
                imgUrl = e.target.result
                imgInput.src = imgUrl
            };

            fileReader.readAsDataURL(file.files[0]);
        }
        else{
            alert("This file is too large!")
        }
    };

    function showInfo(){
        document.querySelectorAll('.Details').forEach(info => info.remove());
        getData.forEach((element, index) => {
            let createElement = `<tr class="Details">
                <td>${index+1}</td>
                <td><img src="${element.picture}" alt="" width="50" height="50"></td>
                <td>${element.Name}</td>
                <td>${element.Subtitle}</td>
                <td>${element.Ingrediences}</td>
                <td>${element.Prices}</td>
                <td>${element.Comewith}</td>
                <td>
                    <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.Name}', '${element.Subtitle}', '${element.Ingrediences}', '${element.Prices}', '${element.Comewith}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                    <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.Name}', '${element.Subtitle}', '${element.Ingrediences}', '${element.Prices}', '${element.Comewith}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>           
                </td>
            </tr>`;

            userInfo.innerHTML += createElement
        })
    }
    showInfo();

    function readInfo(pic, name, subtitle, ingrediences, prices, comewith){
        document.querySelector('.showImg').src = pic,
        document.querySelector('#showName').value = name,
        document.querySelector("#showSubtitle").value = subtitle,
        document.querySelector("#showIngrediences").value = ingrediences,
        document.querySelector("#showPrices").value = prices,
        document.querySelector("#showComewith").value = comewith
    }

    function editInfo(index, pic, name, subtitle, ingrediences, prices, comewith){
        isEdit = true
        editId = index
        imgInput.src = pic
        userName.value = name // Changed from name.value = name to userName.value = name
        subtitle.value = subtitle // Changed from Subtitle.value = Subtitle to subtitle.value = subtitle
        ingrediences.value = ingrediences // Changed from Ingrediences.value = Ingrediences to ingrediences.value = ingrediences
        prices.value = prices // Changed from Prices.value = Prices to prices.value = prices
        comewith.value = comewith // Changed from Comewith.value = Comewith to comewith.value = comewith

        submitBtn.innerText = "Update"
        modalTitle.innerText = "Update The Form"
    }

    function deleteInfo(index){
        if(confirm("Are you sure want to delete?")){
            getData.splice(index, 1)
            localStorage.setItem("userProfile", JSON.stringify(getData))
            showInfo()
        }
    }

    form.addEventListener('submit', (e)=> {
        e.preventDefault()

        const information = {
            picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
            Name: userName.value, // Changed from Name: Name.value to Name: userName.value
            Subtitle: subtitle.value, // Changed from Subtitle: Subtitle.value to Subtitle: subtitle.value
            Ingrediences: ingrediences.value, // Changed from Ingrediences: Ingrediences.value to Ingrediences: ingrediences.value
            Prices: prices.value, // Changed from Prices: Prices.value to Prices: prices.value
            Comewith: comewith.value, // Changed from Comewith: Comewith.value to Comewith: comewith.value
        }

        if(!isEdit){
            getData.push(information)
        }
        else{
            isEdit = false
            getData[editId] = information
        }

        localStorage.setItem('userProfile', JSON.stringify(getData))

        submitBtn.innerText = "Submit"
        modalTitle.innerHTML = "Fill The Form"

        showInfo()

        form.reset()

        imgInput.src = "./image/Profile Icon.webp"  
    });
});
