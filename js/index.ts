let loginUsernameField = document.getElementById("uname") as HTMLInputElement;
let loginPswField = document.getElementById("psw")as HTMLInputElement;

let regUsernameField = document.getElementById("reg-uname")as HTMLInputElement;
let regMailField = document.getElementById("reg-eMail")as HTMLInputElement;
let regStudiengangField = document.getElementById("reg-degreeCourse")as HTMLInputElement;
let regSemesterField = document.getElementById("reg-semester")as HTMLInputElement;
let regPwField = document.getElementById("reg-password")as HTMLInputElement;
let regPwRepeatField = document.getElementById("reg-password-repeat")as HTMLInputElement;

let loginBtn = document.getElementById("login");
let registerBtn = document.getElementById("register");

if(loginBtn){
    loginBtn.addEventListener("click", login);
}
if(registerBtn){
    registerBtn.addEventListener("click", register);
}



async function login(evt: MouseEvent){
    evt.preventDefault();

    let username = loginUsernameField.value;
    let password = loginPswField.value;
    if(!username || !password){
        displayMessage("error", "Nicht alle Pflichtfelder wurden ausgefüllt.");
        return;
    }
    let urlParams = new URLSearchParams();
    urlParams.append("user", username);
    urlParams.append("password", password);
    let result = await fetch(url+"/login?"+urlParams.toString());
    let response = await result.json();
    if(response.status === "ok"){
        localStorage.setItem("loginAs", response.user);
        window.location.assign("main.html");
    }
    else{
        displayMessage(response.status, response.message);
    }
}

async function register(evt: MouseEvent){
    evt.preventDefault();

    let username = regUsernameField.value;
    let mail = regMailField.value;
    let studiengang = regStudiengangField.value;
    let semester = regSemesterField.value;
    let password = regPwField.value;
    let password_repeat = regPwRepeatField.value;


    if(!username || !password || !mail || !studiengang || !semester || !password_repeat){
        displayMessage("error", "Nicht alle Pflichtfelder wurden ausgefüllt.");
        return;
    }

    if(password !== password_repeat){
        displayMessage("error", "Die Passwörter stimmen nicht überein.");
        return;
    }

    let urlParams = new URLSearchParams();
    urlParams.append("user", username);
    urlParams.append("password", password);
    urlParams.append("email", mail);
    urlParams.append("semester", semester);
    urlParams.append("studiengang", studiengang);
    let result = await fetch(url+"/register?"+urlParams.toString());
    let response = await result.json();
    if(response.status === "ok"){
        localStorage.setItem("loginAs", response.user);
        window.location.assign("main.html");
    }
    else{
        displayMessage(response.status, response.message);
    }
}