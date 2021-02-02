"use strict";
var url = "http://localhost:8100";
function displayMessage(type, message) {
    var field = document.getElementById("message-field");
    if (!field) {
        return;
    }
    switch (type) {
        case "ok":
            field.setAttribute("style", "color:green;");
            break;
        case "error":
            field.setAttribute("style", "color:red;");
            break;
        default:
            break;
    }
    field.innerHTML = message;
}
