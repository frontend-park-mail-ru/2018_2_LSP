'use strict';

function addElement(tag, text, div, id, func) {
    let elem = document.createElement(tag);
    elem.textContent = text;
    if (id != "") elem.id = id;
    //elem.onclick = function() {createRulesPage()};
    elem.onclick = func;
    div.appendChild(elem);
}

function backToLandingPage() {
    let p = document.createElement("p");
    p.textContent = "Назад";
    document.body.appendChild(p);
    p.onclick = function() {createLandingPage()};
}

function backToMainMenu() {
    let p = document.createElement("p");
    p.textContent = "Назад в меню";
    document.body.appendChild(p);
    p.onclick = function() {createMenu()};
}

function makeInputField(fieldName, form, type, placeholder) {
    let p = document.createElement("p");
    p.textContent = fieldName;
    form.appendChild(p);

    let field = document.createElement("input");
    field.setAttribute("type", type);
    field.setAttribute("placeholder", placeholder);
    field.classList.add("inputs");
    form.appendChild(field);
    form.appendChild(document.createElement('br'));
}

function createProfilePage() {
    //document.body.innerHTML = "";
    let div = document.getElementById("content_block");
    div.innerHTML = "";
    div.classList.replace("landingPageContent", "menu");
    
    addElement("h2","Профиль", div, "");
}

function createLeadersPage() {
    //document.body.innerHTML = "";
    let div = document.getElementById("content_block");
    div.innerHTML = "";
    div.classList.replace("landingPageContent", "menu");

    addElement("h2","Рейтинг", div, "");
    backToMainMenu();
}

function createMenu() {
    //document.body.innerHTML = "";
    let header = document.getElementById("header_block");
    header.innerHTML = "";
    addElement("span","UserName ", header,"");
    addElement("span"," Профиль", header, "", createProfilePage);

    let div = document.getElementById("content_block");
    div.innerHTML = "";
    div.classList.replace("landingPageContent", "menu");

    addElement("h2","Меню", div, "");
    addElement("p","1 игрок", div, "");
    addElement("p","Мультиплеер", div, "");
    addElement("p","Рейтинг", div, "", createLeadersPage);
}

function createRulesPage() {
    document.body.innerHTML = "";
    addElement("h2","Правила игры Шакал", document.body, "");
    backToLandingPage();
}

function createSignInPage() {
    backToLandingPage();

    document.getElementById("header_block").innerHTML = "";
    let div = document.getElementById("content_block");
    div.innerHTML = "";
    div.classList.replace("landingPageContent", "formPage");

    addElement("h2","Вход", div, "");

    let form = document.createElement("form");
    form.setAttribute("method", "post");

    makeInputField("Email ", form, "text", "email");
    makeInputField("Пароль ", form, "text", "*******");
    
    // let btn = document.createElement("button");
    // btn.textContent = "Войти";
    // form.appendChild(btn);
    addElement("button","Войти", form, "");
    div.appendChild(form);
}

function createSignUpPage() {
    backToLandingPage();

    document.getElementById("header_block").innerHTML = "";
    let div = document.getElementById("content_block");
    div.innerHTML = "";
    div.classList.replace("landingPageContent", "formPage");
    document.getElementById("header_block").innerHTML = "";

    addElement("h2","Регистрация", div, "");

    let form = document.createElement("form");
    form.setAttribute("method", "post");

    makeInputField("Имя ",form, "text", "Имя");
    makeInputField("Email ", form, "text", "email");
    makeInputField("Пароль ", form, "text", "*****");
    makeInputField("Потвердите пароль ", form, "text", "*****");
    
    // let btn = document.createElement("button");
    // btn.textContent = "Ok";
    // form.appendChild(btn);
    addElement("button","Ok", form, "");
    div.appendChild(form);
}

function createLandingPage() {
    document.body.innerHTML = "";

    let headerBlock = document.createElement("div");
    document.body.appendChild(headerBlock);
    headerBlock.classList.add("landingPageHeader");
    headerBlock.id = "header_block";

    addElement("p","Войти", headerBlock,"", createSignInPage);
    addElement("p","Зарегестрироваться", headerBlock,"", createSignUpPage);
    //----------------------------------------------------------

    let contentBlock = document.createElement("div");
    document.body.appendChild(contentBlock);
    contentBlock.classList.add("landingPageContent");
    contentBlock.id = "content_block";

    addElement("h1","Jackal", contentBlock, "");
    addElement("p","Играть", contentBlock,"", createMenu);
    addElement("p","Правила игры", contentBlock,"", createRulesPage);
}

createLandingPage();