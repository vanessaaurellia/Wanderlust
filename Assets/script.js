const _spawner = document.getElementById("article-spawner");

const _json_data = {
    "Tanah Lot": {
        "image-link": "./Pictures/Tanah Lot.jpg",
        "deskripsi-singkat": "Tanah Lot is a rock formation off the Indonesian island of Bali."
    },
    "Raja Ampat": {
        "image-link": "./Pictures/Raja Ampat.jpg",
        "deskripsi-singkat": "The Raja Ampat Islands are an Indonesian archipelago off the northwest tip of Bird’s Head."
    },
    "Tangkuban Perahu": {
        "image-link": "./Pictures/Tangkuban.png",
        "deskripsi-singkat": "Tangkuban Parahu is a stratovolcano 30 km north of the city of Bandung."
    },
    "Borobudur Temple": {
        "image-link": "./Pictures/Borobudur.jpg",
        "deskripsi-singkat": "Borobudur, or Barabudur is a 9th-century Mahayana Buddhist temple in Magelang Regency."
    }
}

function spawn() {
    Object.keys(_json_data).forEach((e) => {
        let name = e;
        let description = _json_data[e]["deskripsi-singkat"];
        let url_img = _json_data[e]["image-link"];

        var card = document.createElement("div");
        card.id = "card";

        var image_view = document.createElement("img");
        image_view.src = url_img;

        var small_text = document.createElement("div");
        small_text.id = "description";

        var header4 = document.createElement("h4");
        header4.innerHTML = name;
        var paragraph = document.createElement("p");
        paragraph.innerHTML = description

        small_text.appendChild(header4);
        small_text.appendChild(paragraph);

        card.appendChild(image_view);
        card.appendChild(small_text);
        
        _spawner.appendChild(card);
    })
}

spawn();

function checkLogin() {
    let loginData = localStorage.getItem('session');
    if (loginData) {
        $('a[href="register.html"]').remove();
        $('a[href="login.html"]')
            .attr('href', 'javascript:void(0)')
            .html('Logout')
            .attr('id', 'logout')
            .attr('onclick', 'logout()');
    } else {
        $('a[href="suggestion.html"]').remove();
    }
}

checkLogin();

function logout() {
    localStorage.removeItem('session');
    window.alert('You have been logged out');
    window.location = "index.html";
};

