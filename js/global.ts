const url = "https://abgabepaulphillip.herokuapp.com";


function displayMessage(type: string, message: string){
    let field = document.getElementById("message-field");
    if(!field){
        return;
    }
    switch(type){
        case "ok":
            field.setAttribute("style", "color:green;");
            break;
        case "error":
            field.setAttribute("style", "color:red;")
            break;
        default:
            break;
    }
    field.innerHTML = message;
}