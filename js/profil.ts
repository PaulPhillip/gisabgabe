let editUsernameField = document.getElementById("username")as HTMLInputElement;
let ediMailField = document.getElementById("eMail")as HTMLInputElement;
let ediStudiengangField = document.getElementById("degreeCourse")as HTMLInputElement;
let ediSemesterField = document.getElementById("semester")as HTMLInputElement;
let ediPwField = document.getElementById("password")as HTMLInputElement;
let ediPwRepeatField = document.getElementById("password-repeat")as HTMLInputElement;

let editBtn = document.getElementById("profilSet");

if(editBtn){
    editBtn.addEventListener("click", editProfile);
}

async function editProfile(evt: MouseEvent){
    evt.preventDefault();

    let username = editUsernameField.value;
    let mail = ediMailField.value;
    let studiengang = ediStudiengangField.value;
    let semester = ediSemesterField.value;
    let password = ediPwField.value;
    let password_repeat = ediPwRepeatField.value;


    if(!username || !mail || !studiengang || !semester){
        displayMessage("error", "Nicht alle Pflichtfelder wurden ausgefüllt.");
        return;
    }

    if(password !== password_repeat){
        displayMessage("error", "Die Passwörter stimmen nicht überein.");
        return;
    }

    let urlParams = new URLSearchParams();
    urlParams.append("user", username);
    if(password){
        urlParams.append("password", password);
    }    
    urlParams.append("email", mail);
    urlParams.append("semester", semester);
    urlParams.append("studiengang", studiengang);
    let result = await fetch(url+"/profiledit?"+urlParams.toString());
    let response = await result.json();
    if(response){
        displayMessage(response.status, response.message);
        renderProfile();
    }
}

async function renderProfile(){
    let user = localStorage.getItem("loginAs");
    if(!user){
        displayMessage("error", "Du bist nicht angemeldet.");
        return;
    }
    let urlParams = new URLSearchParams();
    urlParams.append("user", user);
    let result = await fetch(url+"/getprofile?"+urlParams.toString());
    let response = await result.json();
    if(response.status === "error"){
        displayMessage(response.status, response.message);
    }
    else{
        editUsernameField.value = response.user.user;
        ediMailField.value= response.user.email;
        ediStudiengangField.value= response.user.studiengang;
        ediSemesterField.value= response.user.semester;
    }
}

renderProfile();