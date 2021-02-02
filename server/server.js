"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var Http = __importStar(require("http"));
var Mongo = __importStar(require("mongodb"));
var url_1 = require("url");
var Server;
(function (Server) {
    var ServerKlasse = /** @class */ (function () {
        function ServerKlasse() {
            this.db = null; /*Null weil server noch nicht gestartet*/
            this.nutzerCollection = null; /*Findet collection nicht da server nicht gestartet, daher null*/
            this.abonnierCollection = null;
            this.beitragsCollection = null;
            this.dbName = "twitterpaul";
            this.mongodbVerbindungsURL = "mongodb+srv://gispaulphillip:v1Ba0P5lT5lHe8jv@gispaulphillipwise2020.xf65h.mongodb.net/" + this.dbName + "?retryWrites=true&w=majority";
            console.log("Starte den Server"); //Ausgabe für mich selbst
            this.http_port = Number(process.env.PORT); //Übergibt this.http_port den Port der Anfrage
            if (!this.http_port) //wenn kein Port übergeben wurde dann 8100 port speichern
                this.http_port = 8100;
            this.datenbankVerbinden(); //Startet Methode zum Verbinden zum Server
            this.httpServerStarten(); //Startet Methode zum Erstellen des Servers
        }
        ServerKlasse.prototype.httpServerStarten = function () {
            Http.createServer(this.ServerAntwort.bind(this)).listen(this.http_port); //Erstellt den Server und bindet an die Methode onMessage, durch das listen befindet er sich in einem dauerzustand und schaltet nicht direkt wieder ab
        };
        ServerKlasse.prototype.ServerAntwort = function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var antwort, url, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log("Nachricht angekommen: ", req.url); //um die requeste Url anzuzeigen.
                            antwort = {};
                            if (req.url === "/") { //falls URL leer ist 
                                res.write(JSON.stringify(antwort)); //schreibe die Server Antwort
                                res.end(); //und beende die response
                                return [2 /*return*/];
                            }
                            url = new url_1.URL(req.url, "http://localhost:" + this.http_port);
                            _a = url.pathname;
                            switch (_a) {
                                case "/login": return [3 /*break*/, 1];
                                case "/register": return [3 /*break*/, 3];
                                case "/liste": return [3 /*break*/, 5];
                                case "/abonnieren": return [3 /*break*/, 7];
                                case "/deabonnieren": return [3 /*break*/, 9];
                                case "/profiledit": return [3 /*break*/, 11];
                                case "/post": return [3 /*break*/, 13];
                                case "/getposts": return [3 /*break*/, 15];
                                case "/getprofile": return [3 /*break*/, 17];
                            }
                            return [3 /*break*/, 19];
                        case 1: return [4 /*yield*/, this.loginMethode(url.searchParams)];
                        case 2:
                            antwort = _b.sent(); //handlelogin wird aufgerufen und es werden die Parameter der angefragten url übergeben, die antwort der methode wird in responsetext gespeichert
                            return [3 /*break*/, 19];
                        case 3: return [4 /*yield*/, this.registrierMethode(url.searchParams)];
                        case 4:
                            antwort = _b.sent(); //das selbe nur für die handleregisterMethode
                            return [3 /*break*/, 19];
                        case 5: return [4 /*yield*/, this.getNutzerMethode(url.searchParams)];
                        case 6:
                            antwort = _b.sent(); //das selbe nur für die userlist methode
                            return [3 /*break*/, 19];
                        case 7: return [4 /*yield*/, this.abo(url.searchParams)];
                        case 8:
                            antwort = _b.sent(); //das selbe nur für die userlist methode
                            return [3 /*break*/, 19];
                        case 9: return [4 /*yield*/, this.deabo(url.searchParams)];
                        case 10:
                            antwort = _b.sent(); //das selbe nur für die userlist methode
                            return [3 /*break*/, 19];
                        case 11: return [4 /*yield*/, this.profilBearbeiten(url.searchParams)];
                        case 12:
                            antwort = _b.sent(); //das selbe nur für die userlist methode
                            return [3 /*break*/, 19];
                        case 13: return [4 /*yield*/, this.post(url.searchParams)];
                        case 14:
                            antwort = _b.sent(); //das selbe nur für die userlist methode
                            return [3 /*break*/, 19];
                        case 15: return [4 /*yield*/, this.getPosts(url.searchParams)];
                        case 16:
                            antwort = _b.sent(); //das selbe nur für die userlist methode                        break;
                            return [3 /*break*/, 19];
                        case 17: return [4 /*yield*/, this.getProfile(url.searchParams)];
                        case 18:
                            antwort = _b.sent();
                            return [3 /*break*/, 19];
                        case 19:
                            console.log(antwort);
                            res.setHeader("Access-Control-Allow-Origin", "*");
                            res.write(JSON.stringify(antwort)); //wird and den client zurückgegeben
                            res.end(); //beendet den responseprozess
                            return [2 /*return*/];
                    }
                });
            });
        };
        ServerKlasse.prototype.getProfile = function (urlparams) {
            return __awaiter(this, void 0, void 0, function () {
                var user, users;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.nutzerCollection) { // wenn die usercollection nicht vorhanden, dann db error
                                return [2 /*return*/, { status: "error", message: "Fehler mit der Datenbank" }];
                            }
                            user = urlparams.get("user");
                            if (!user) {
                                return [2 /*return*/, { status: "error", message: "Du bist nicht angemeldet." }];
                            }
                            return [4 /*yield*/, this.nutzerCollection.find({ user: user }).toArray()];
                        case 1:
                            users = _a.sent();
                            if (!users || users.length === 0) {
                                return [2 /*return*/, { status: "error", message: "Kein User gefunden." }];
                            }
                            return [2 /*return*/, { status: "ok", user: users[0] }];
                    }
                });
            });
        };
        ServerKlasse.prototype.getNutzerMethode = function (urlparams) {
            return __awaiter(this, void 0, void 0, function () {
                var user, allUsers, followedUsers, returnAllArray, returnFollowedArray, ownIndex;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.nutzerCollection || !this.abonnierCollection) { // wenn die usercollection nicht vorhanden, dann db error
                                return [2 /*return*/, { status: "error", message: "Fehler mit der Datenbank" }];
                            }
                            user = urlparams.get("user");
                            if (!user) {
                                return [2 /*return*/, { status: "error", message: "Du bist nicht angemeldet." }];
                            }
                            return [4 /*yield*/, this.nutzerCollection.find({}).toArray()];
                        case 1:
                            allUsers = _a.sent();
                            return [4 /*yield*/, this.abonnierCollection.find({ user: user }).toArray()];
                        case 2:
                            followedUsers = _a.sent();
                            returnAllArray = allUsers.map(function (entry) { return entry.user; });
                            returnFollowedArray = followedUsers.map(function (entry) { return entry.abo; });
                            ownIndex = returnAllArray.indexOf(user);
                            if (ownIndex === -1) {
                                return [2 /*return*/, { status: "error", message: "Der User ist nicht mehr existent." }];
                            }
                            returnAllArray.splice(ownIndex, 1);
                            return [2 /*return*/, { status: "ok", allUsers: returnAllArray, followedUsers: returnFollowedArray }];
                    }
                });
            });
        };
        ServerKlasse.prototype.abo = function (urlparams) {
            return __awaiter(this, void 0, void 0, function () {
                var user, target;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.abonnierCollection) { // wenn die usercollection nicht vorhanden, dann db error
                                return [2 /*return*/, { status: "error", message: "Fehler mit der Datenbank" }];
                            }
                            user = urlparams.get("user");
                            target = urlparams.get("target");
                            if (!user || !target) {
                                return [2 /*return*/, { status: "error", message: "Es wurden nicht alle benötigten Daten übergeben." }];
                            }
                            return [4 /*yield*/, this.abonnierCollection.insertOne({ user: user, abo: target })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { status: "ok" }];
                    }
                });
            });
        };
        ServerKlasse.prototype.deabo = function (urlparams) {
            return __awaiter(this, void 0, void 0, function () {
                var user, target;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.abonnierCollection) { // wenn die usercollection nicht vorhanden, dann db error
                                return [2 /*return*/, { status: "error", message: "Fehler mit der Datenbank" }];
                            }
                            user = urlparams.get("user");
                            target = urlparams.get("target");
                            if (!user || !target) {
                                return [2 /*return*/, { status: "error", message: "Es wurden nicht alle benötigten Daten übergeben." }];
                            }
                            return [4 /*yield*/, this.abonnierCollection.deleteOne({ user: user, abo: target })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { status: "ok" }];
                    }
                });
            });
        };
        ServerKlasse.prototype.profilBearbeiten = function (urlparams) {
            return __awaiter(this, void 0, void 0, function () {
                var user, email, password, semester, studiengang, newUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.nutzerCollection) { // wenn die usercollection nicht vorhanden, dann db error
                                return [2 /*return*/, { status: "error", message: "Fehler mit der Datenbank" }];
                            }
                            user = urlparams.get("user");
                            email = urlparams.get("email");
                            password = urlparams.get("password");
                            semester = urlparams.get("semester");
                            studiengang = urlparams.get("studiengang");
                            if (!user || !email || !semester || !studiengang) {
                                return [2 /*return*/, { status: "error", message: "Es wurden nicht alle benötigten Daten übergeben." }];
                            }
                            newUser = { user: user, email: email, semester: semester, studiengang: studiengang };
                            if (password) {
                                newUser.password = password;
                            }
                            return [4 /*yield*/, this.nutzerCollection.updateOne({ user: user }, { $set: newUser })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { status: "ok", message: "Erfolgreich editiert." }];
                    }
                });
            });
        };
        ServerKlasse.prototype.post = function (urlparams) {
            return __awaiter(this, void 0, void 0, function () {
                var user, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.beitragsCollection) { // wenn die usercollection nicht vorhanden, dann db error
                                return [2 /*return*/, { status: "error", message: "Fehler mit der Datenbank" }];
                            }
                            user = urlparams.get("user");
                            text = urlparams.get("text");
                            if (!user || !text) {
                                return [2 /*return*/, { status: "error", message: "Es wurden nicht alle benötigten Daten übergeben." }];
                            }
                            return [4 /*yield*/, this.beitragsCollection.insertOne({ user: user, text: text, date: new Date() })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { status: "ok" }];
                    }
                });
            });
        };
        ServerKlasse.prototype.getPosts = function (urlparams) {
            return __awaiter(this, void 0, void 0, function () {
                var user, abos, nameArray, posts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.abonnierCollection || !this.beitragsCollection) { // wenn die usercollection nicht vorhanden, dann db error
                                return [2 /*return*/, { status: "error", message: "Fehler mit der Datenbank" }];
                            }
                            user = urlparams.get("user");
                            if (!user) {
                                return [2 /*return*/, { status: "error", message: "Es wurden nicht alle benötigten Daten übergeben." }];
                            }
                            return [4 /*yield*/, this.abonnierCollection.find({ user: user }).toArray()];
                        case 1:
                            abos = _a.sent();
                            nameArray = abos.map(function (entry) { return entry.abo; });
                            nameArray.unshift(user); //eigenen User hinzufügen
                            return [4 /*yield*/, this.beitragsCollection.find({ user: { $in: nameArray } }).sort({ date: -1 }).toArray()];
                        case 2:
                            posts = _a.sent();
                            return [2 /*return*/, { status: "ok", posts: posts }];
                    }
                });
            });
        };
        ServerKlasse.prototype.datenbankVerbinden = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.db = new Mongo.MongoClient(this.mongodbVerbindungsURL, { useNewUrlParser: true }); //anlegen der MongoDb variable, beinhaltet mongo db link mit passwort und login zur DB
                            return [4 /*yield*/, this.db.connect()];
                        case 1:
                            _a.sent(); //wartet darauf mit der db zu verbinden
                            this.nutzerCollection = this.db.db(this.dbName).collection("benutzer"); //speichert die collection benutzen in usercollection
                            this.abonnierCollection = this.db.db(this.dbName).collection("abonnenten");
                            this.beitragsCollection = this.db.db(this.dbName).collection("nachrichten");
                            return [2 /*return*/];
                    }
                });
            });
        };
        ServerKlasse.prototype.loginMethode = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var passwortVonUebergebeneAnfrage, user, benutzerArray;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.nutzerCollection) { // wenn die usercollection nicht vorhanden, dann db error
                                return [2 /*return*/, { status: "error", message: "Fehler mit der Datenbank" }];
                            }
                            passwortVonUebergebeneAnfrage = params.get('password');
                            user = params.get('user');
                            if (!passwortVonUebergebeneAnfrage || !user) { //wenn eins davon leer bzw falsch ist dann gebe error zurück
                                return [2 /*return*/, { status: "error", message: "Pflichtfelder nicht ausgefüllt." }];
                            }
                            return [4 /*yield*/, this.nutzerCollection.find({ user: user, password: passwortVonUebergebeneAnfrage }).toArray()];
                        case 1:
                            benutzerArray = _a.sent();
                            if (benutzerArray.length === 0) { //wenn das array leer ist, ist auch kein benutzer vorhanden, also error ausgeben
                                return [2 /*return*/, { status: "error", message: "Benutzer konnte nicht gefunden werden" }];
                            }
                            return [2 /*return*/, { status: "ok", user: user }]; //ansonsten gebe success zurück, um ein erfolgreiches einloggen zu simulieren
                    }
                });
            });
        };
        ServerKlasse.prototype.registrierMethode = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var userVonUebergebeneAnfrage, passwordVonUebergebeneAnfrage, mailVonUebergebeneAnfrage, semester, studiengang, benutzerArray;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.nutzerCollection) { //erneuter test ob die datenbank auch verbunden ist, wenn nein dann error
                                return [2 /*return*/, { status: "error", message: "Fehler mit der Datenbank" }];
                            } //wenn ja dann 
                            userVonUebergebeneAnfrage = params.get('user');
                            passwordVonUebergebeneAnfrage = params.get('password');
                            mailVonUebergebeneAnfrage = params.get('email');
                            semester = params.get('semester');
                            studiengang = params.get('studiengang');
                            if (!userVonUebergebeneAnfrage || !passwordVonUebergebeneAnfrage || !mailVonUebergebeneAnfrage || !semester || !studiengang) { //wenn eins davon leer oder falsch ist gebe error aus
                                return [2 /*return*/, { status: "error", message: "Pflichtfelder nicht ausgefüllt." }];
                            }
                            return [4 /*yield*/, this.nutzerCollection.find({ user: userVonUebergebeneAnfrage }).toArray()];
                        case 1:
                            benutzerArray = _a.sent();
                            if (benutzerArray && benutzerArray.length > 0) { //wenn der array und die länge des arrays größer als 0 sind heißt es, dass es unter dieser email addresse bereits einen nutzer gibt
                                return [2 /*return*/, { status: "error", message: "Dieser Benutzer existiert bereits." }];
                            }
                            return [4 /*yield*/, this.nutzerCollection.insertOne({
                                    user: userVonUebergebeneAnfrage,
                                    email: mailVonUebergebeneAnfrage,
                                    password: passwordVonUebergebeneAnfrage,
                                    semester: semester,
                                    studiengang: studiengang
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { status: "ok", user: userVonUebergebeneAnfrage }]; //bei erfolgreichen abschließen der aktion
                    }
                });
            });
        };
        return ServerKlasse;
    }());
    Server.ServerKlasse = ServerKlasse;
})(Server = exports.Server || (exports.Server = {}));
new Server.ServerKlasse(); /*Einstiegspunkt*/
