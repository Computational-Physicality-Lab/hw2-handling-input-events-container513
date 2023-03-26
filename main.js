// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

let initProducts = () => {
    // To see the shirts object, run:
    // console.log(shirts);

    let shirt_list = document.getElementsByClassName("shirt_list")[0];
    for (let i = 0; i < shirts.length; i++) {
        let shirt = shirts[i];
        let newdiv = document.createElement("div");
        newdiv.setAttribute("class", "shirt");
        let img = document.createElement("img");
        let default_color = Object.keys(shirt.colors)[0];
        let default_side = Object.keys(Object.values(shirt.colors)[0])[0];
        console.log(typeof(default_side));

        img.setAttribute("src", shirt.colors[default_color][default_side]);
        img.onclick = () => {
            location.href = "details.html";
            localStorage.setItem("name", shirt.name);
            localStorage.setItem("price", shirt.price);
            localStorage.setItem("description", shirt.description);
            localStorage.setItem("colors", JSON.stringify(shirt.colors));
            localStorage.setItem("default", JSON.stringify(shirt.default));
            localStorage.setItem("image_color", Object.keys(shirt.colors)[0]);
            localStorage.setItem("image_side", "front");
        }
        let head = document.createElement("div");
        head.innerHTML = shirt.name;
        head.setAttribute("class", "shirt_name");
        let des = document.createElement("div");
        let cnt = Object.keys(shirt.colors).length;
        des.innerHTML = "Available in " + cnt + " colors";
        des.setAttribute("class", "shirt_des");
        let quickView = document.createElement("button");
        quickView.innerHTML = "Quick View";
        quickView.onclick = () => {
            location.href = "not_implemented.html"
        };
        let seePage = document.createElement("button");
        seePage.innerHTML = "See Page";
        seePage.onclick = () => {
            location.href = "details.html"
            localStorage.setItem("name", shirt.name)
            localStorage.setItem("price", shirt.price);
            localStorage.setItem("description", shirt.description);
            localStorage.setItem("colors", JSON.stringify(shirt.colors));
            localStorage.setItem("default", JSON.stringify(shirt.default));
            localStorage.setItem("image_color", Object.keys(shirt.colors)[0]);
            localStorage.setItem("image_side", "front");
        };
        newdiv.appendChild(img);
        newdiv.appendChild(head);
        newdiv.appendChild(des);
        newdiv.appendChild(quickView);
        newdiv.appendChild(seePage);
        shirt_list.appendChild(newdiv);
    }
    // Your Code Here
};

let initDetails = () => {
    // To see the shirts object, run:
    // console.log(shirts);
    let product_name = document.getElementsByClassName("product_name")[0];
    product_name.innerHTML = localStorage.getItem("name");

    let product = document.getElementsByClassName("product")[0];

    let product_img = document.createElement("img");
    let available_colors = JSON.parse(localStorage.getItem("colors"));
    console.log(localStorage.getItem("image_color"));
    console.log(available_colors[localStorage.getItem("image_color")]);
    product_img.setAttribute("src", available_colors[localStorage.getItem("image_color")][localStorage.getItem("image_side")]);



    let content = document.createElement("div");
    content.setAttribute("class", "product_content");
    let prices = document.createElement("div");
    prices.setAttribute("class", "product_prices");
    prices.innerHTML = localStorage.getItem("price");
    let description = document.createElement("div");
    description.setAttribute("class", "product_description");
    description.innerHTML = localStorage.getItem("description");
    let side = document.createElement("div");
    let color = document.createElement("div");
    content.appendChild(prices);
    content.appendChild(description);
    content.appendChild(side);
    side.setAttribute("class", "product_side");
    side.innerHTML = "Side: ";
    color.innerHTML = "Color: ";
    color.setAttribute("class", "product_color");
    let colors = Object.keys(JSON.parse(localStorage.getItem("colors")));
    let sides = ["Front", "Back"];
    for (let i = 0; i < sides.length; i++) {
        let but = document.createElement("button");
        but.setAttribute("class", "sides_button");
        but.innerHTML = sides[i];
        but.onclick = () => {
            localStorage.setItem("image_side", sides[i].toLowerCase());
            product_img.setAttribute("src", available_colors[localStorage.getItem("image_color")][localStorage.getItem("image_side")]);
        };
        side.appendChild(but);
    }
    for (let i = 0; i < colors.length; i++) {
        let but = document.createElement("button");
        but.setAttribute("class", "colors_button");
        but.style.backgroundColor = colors[i];
        but.innerHTML = colors[i];
        but.onclick = () => {
            localStorage.setItem("image_color", colors[i].toLowerCase());
            product_img.setAttribute("src", available_colors[localStorage.getItem("image_color")][localStorage.getItem("image_side")]);
        };
        color.appendChild(but);
    }
    content.appendChild(color);
    product.appendChild(product_img);
    product.appendChild(content);
    // Your Code Here
};