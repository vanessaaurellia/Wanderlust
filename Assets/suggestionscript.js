var save = document.getElementsByClassName("form-control");

function reply() {
    var card = document.createElement("div");
    card.classList.add('card');

    var divImage = document.createElement('div');
    divImage.classList.add('image');
    var image = document.createElement('img');
    image.classList.add('picture')
    image.setAttribute('src', 'Pictures/Photo.png');
    divImage.appendChild(image);
    card.appendChild(divImage);

    var para = document.createElement("h4");
    para.classList.add('namereply')
    para.innerHTML = save[0].value;
    card.appendChild(para);

    var para1 = document.createElement("p");
    para1.classList.add('commentreply')
    para1.innerHTML = save[1].value;
    card.appendChild(para1);

    save[1].value = '';

    var div = document.getElementById('komentar');
    div.appendChild(card);
}

function checkLogin() {
    let loginData = JSON.parse(localStorage.getItem('session'));
    if (loginData) {
        document.getElementById('nameform').setAttribute('disabled', true);
        document.getElementById('nameform').value = loginData.name;
    } else {
        window.alert('You are not authorized! Please login first');
        window.location = "login.html";
    }
}

checkLogin();