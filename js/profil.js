"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var editUsernameField = document.getElementById("username");
var ediMailField = document.getElementById("eMail");
var ediStudiengangField = document.getElementById("degreeCourse");
var ediSemesterField = document.getElementById("semester");
var ediPwField = document.getElementById("password");
var ediPwRepeatField = document.getElementById("password-repeat");
var editBtn = document.getElementById("profilSet");
if (editBtn) {
    editBtn.addEventListener("click", editProfile);
}
function editProfile(evt) {
    return __awaiter(this, void 0, void 0, function () {
        var username, mail, studiengang, semester, password, password_repeat, urlParams, result, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    evt.preventDefault();
                    username = editUsernameField.value;
                    mail = ediMailField.value;
                    studiengang = ediStudiengangField.value;
                    semester = ediSemesterField.value;
                    password = ediPwField.value;
                    password_repeat = ediPwRepeatField.value;
                    if (!username || !mail || !studiengang || !semester) {
                        displayMessage("error", "Nicht alle Pflichtfelder wurden ausgefüllt.");
                        return [2 /*return*/];
                    }
                    if (password !== password_repeat) {
                        displayMessage("error", "Die Passwörter stimmen nicht überein.");
                        return [2 /*return*/];
                    }
                    urlParams = new URLSearchParams();
                    urlParams.append("user", username);
                    if (password) {
                        urlParams.append("password", password);
                    }
                    urlParams.append("email", mail);
                    urlParams.append("semester", semester);
                    urlParams.append("studiengang", studiengang);
                    return [4 /*yield*/, fetch(url + "/profiledit?" + urlParams.toString())];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    response = _a.sent();
                    if (response) {
                        displayMessage(response.status, response.message);
                        renderProfile();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function renderProfile() {
    return __awaiter(this, void 0, void 0, function () {
        var user, urlParams, result, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = localStorage.getItem("loginAs");
                    if (!user) {
                        displayMessage("error", "Du bist nicht angemeldet.");
                        return [2 /*return*/];
                    }
                    urlParams = new URLSearchParams();
                    urlParams.append("user", user);
                    return [4 /*yield*/, fetch(url + "/getprofile?" + urlParams.toString())];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    response = _a.sent();
                    if (response.status === "error") {
                        displayMessage(response.status, response.message);
                    }
                    else {
                        editUsernameField.value = response.user.user;
                        ediMailField.value = response.user.email;
                        ediStudiengangField.value = response.user.studiengang;
                        ediSemesterField.value = response.user.semester;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
renderProfile();
