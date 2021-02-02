import * as Http from "http";
import * as Mongo from "mongodb";
import {IncomingMessage, ServerResponse} from "http";
import {URL} from "url";

export namespace Server {

    export class ServerKlasse {
        
        private readonly http_port: number;
        private db: Mongo.MongoClient | null = null; /*Null weil server noch nicht gestartet*/
        private nutzerCollection: Mongo.Collection | null = null; /*Findet collection nicht da server nicht gestartet, daher null*/
        private abonnierCollection: Mongo.Collection | null = null;
        private beitragsCollection: Mongo.Collection | null = null;
        private dbName: string = "twitterpaul";
        private mongodbVerbindungsURL: string = "mongodb+srv://gispaulphillip:v1Ba0P5lT5lHe8jv@gispaulphillipwise2020.xf65h.mongodb.net/"+this.dbName+"?retryWrites=true&w=majority";

        constructor() {
            console.log("Starte den Server"); //Ausgabe für mich selbst
            this.http_port = Number(process.env.PORT);//Übergibt this.http_port den Port der Anfrage
            if (!this.http_port) //wenn kein Port übergeben wurde dann 8100 port speichern
                this.http_port = 8100;
            this.datenbankVerbinden(); //Startet Methode zum Verbinden zum Server
            this.httpServerStarten(); //Startet Methode zum Erstellen des Servers
        }


        private httpServerStarten() {
            Http.createServer(this.ServerAntwort.bind(this)).listen(this.http_port); //Erstellt den Server und bindet an die Methode onMessage, durch das listen befindet er sich in einem dauerzustand und schaltet nicht direkt wieder ab
        }

        private async ServerAntwort(req: IncomingMessage, res: ServerResponse) { //asynchrone Methode, da wir auf den server warten, es wird Incomingmessage übergeben, sowie die Server Antwort
            console.log("Nachricht angekommen: ", req.url); //um die requeste Url anzuzeigen.
            let antwort = {}; //Ausgabe wird hier gespeichert, standardmäßig schon ein URL ist falsch
            if (req.url === "/") { //falls URL leer ist 
                res.write(JSON.stringify(antwort)); //schreibe die Server Antwort
                res.end(); //und beende die response
                return;
            }
            
                let url = new URL(<string>req.url, "http://localhost:" + this.http_port); //Neues Objekt URL angelegt, dem wird die requested url übergeben, sowie eine base namens Localhost mit dem Port angehängt.

                switch (url.pathname) { //switch case um die verschiedenen urls zu filtern
                    case "/login": //bei /login wird handlelogin ausgeführt
                        antwort = await this.loginMethode(url.searchParams); //handlelogin wird aufgerufen und es werden die Parameter der angefragten url übergeben, die antwort der methode wird in responsetext gespeichert
                        break;
                    case "/register": //bei /login wird handlelogin ausgeführt
                        antwort = await this.registrierMethode(url.searchParams); //das selbe nur für die handleregisterMethode
                        break;
                    case "/liste":
                        antwort = await this.getNutzerMethode(url.searchParams); //das selbe nur für die userlist methode
                        break;
                    case "/abonnieren":
                        antwort = await this.abo(url.searchParams); //das selbe nur für die userlist methode
                        break;
                    case "/deabonnieren":
                        antwort = await this.deabo(url.searchParams); //das selbe nur für die userlist methode
                        break;
                    case "/profiledit":
                        antwort = await this.profilBearbeiten(url.searchParams); //das selbe nur für die userlist methode
                        break;
                    case "/post":
                        antwort = await this.post(url.searchParams); //das selbe nur für die userlist methode
                        break;
                    case "/getposts":
                        antwort = await this.getPosts(url.searchParams); //das selbe nur für die userlist methode                        break;
                        break;
                    case "/getprofile":
                        antwort = await this.getProfile(url.searchParams); 
                        break;
                    }
            console.log(antwort);
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.write(JSON.stringify(antwort)); //wird and den client zurückgegeben
            res.end(); //beendet den responseprozess
        }

        private async getProfile(urlparams: URLSearchParams){
            if (!this.nutzerCollection) { // wenn die usercollection nicht vorhanden, dann db error
                return { status:"error", message: "Fehler mit der Datenbank" };
            }
            let user = urlparams.get("user");
            if(!user){
                return {status:"error", message: "Du bist nicht angemeldet."};
            }
            let users = await this.nutzerCollection.find({user: user}).toArray();
            if(!users || users.length === 0){
                return {status:"error", message: "Kein User gefunden."};
            } 
            return {status: "ok", user: users[0]};
        }

        private async getNutzerMethode(urlparams : URLSearchParams): Promise<{}>{
            if (!this.nutzerCollection || !this.abonnierCollection) { // wenn die usercollection nicht vorhanden, dann db error
                return { status:"error", message: "Fehler mit der Datenbank" };
            }
            let user = urlparams.get("user");
            if(!user){
                return {status:"error", message: "Du bist nicht angemeldet."};
            }
            let allUsers = await this.nutzerCollection.find({}).toArray();
            let followedUsers = await this.abonnierCollection.find({user}).toArray();
            let returnAllArray = allUsers.map((entry) => entry.user);
            let returnFollowedArray = followedUsers.map((entry) => entry.abo);

            let ownIndex = returnAllArray.indexOf(user);
            if(ownIndex === -1){
                return {status: "error", message: "Der User ist nicht mehr existent."};
            }
            returnAllArray.splice(ownIndex, 1);
            

            return {status:"ok", allUsers: returnAllArray, followedUsers: returnFollowedArray};
        }

        private async abo(urlparams : URLSearchParams): Promise<{}>{
            if (!this.abonnierCollection) { // wenn die usercollection nicht vorhanden, dann db error
                return { status:"error", message: "Fehler mit der Datenbank" };
            }
            let user = urlparams.get("user");
            let target = urlparams.get("target");
            if(!user || !target){
                return {status:"error", message: "Es wurden nicht alle benötigten Daten übergeben."};
            }

            await this.abonnierCollection.insertOne({user: user, abo: target});


            return {status:"ok"};
        }

        private async deabo(urlparams : URLSearchParams): Promise<{}>{
            if (!this.abonnierCollection) { // wenn die usercollection nicht vorhanden, dann db error
                return { status:"error", message: "Fehler mit der Datenbank" };
            }
            let user = urlparams.get("user");
            let target = urlparams.get("target");
            if(!user || !target){
                return {status:"error", message: "Es wurden nicht alle benötigten Daten übergeben."};
            }
            await this.abonnierCollection.deleteOne({user: user, abo: target});

            return {status:"ok"};
        }

        private async profilBearbeiten(urlparams : URLSearchParams): Promise<{}>{
            if (!this.nutzerCollection) { // wenn die usercollection nicht vorhanden, dann db error
                return { status:"error", message: "Fehler mit der Datenbank" };
            }
            let user = urlparams.get("user");
            let email = urlparams.get("email");
            let password = urlparams.get("password");
            let semester = urlparams.get("semester");
            let studiengang = urlparams.get("studiengang");

            if(!user || !email || !semester || !studiengang){
                return {status:"error", message: "Es wurden nicht alle benötigten Daten übergeben."};
            }

            let newUser: {user: string, email: string, semester: string, studiengang: string, password?: string} = {user, email, semester, studiengang};
            if(password){
                newUser.password = password;
            }
            
            await this.nutzerCollection.updateOne({user}, {$set: newUser});

            return {status:"ok", message:"Erfolgreich editiert."};
        }

        private async post(urlparams : URLSearchParams): Promise<{}>{
            if (!this.beitragsCollection) { // wenn die usercollection nicht vorhanden, dann db error
                return { status:"error", message: "Fehler mit der Datenbank" };
            }
            let user = urlparams.get("user");
            let text = urlparams.get("text");
            if(!user || !text){
                return {status:"error", message: "Es wurden nicht alle benötigten Daten übergeben."};
            }

            await this.beitragsCollection.insertOne({user, text, date: new Date()});

            return {status:"ok"};
        }

        private async getPosts(urlparams : URLSearchParams): Promise<{}>{
            if (!this.abonnierCollection || !this.beitragsCollection) { // wenn die usercollection nicht vorhanden, dann db error
                return { status:"error", message: "Fehler mit der Datenbank" };
            }
            let user = urlparams.get("user");
            if(!user){
                return {status:"error", message: "Es wurden nicht alle benötigten Daten übergeben."};
            }
            let abos = await this.abonnierCollection.find({user: user}).toArray();
            let nameArray = abos.map((entry) => entry.abo);
            nameArray.unshift(user); //eigenen User hinzufügen

            let posts = await this.beitragsCollection.find({user : {$in: nameArray}}).sort({date: -1}).toArray();

            return {status:"ok", posts};
        }

        private async datenbankVerbinden(): Promise<void> { //methode um mit der datenbank zu verbinden
            this.db = new Mongo.MongoClient(this.mongodbVerbindungsURL, { useNewUrlParser: true }); //anlegen der MongoDb variable, beinhaltet mongo db link mit passwort und login zur DB
            await this.db.connect(); //wartet darauf mit der db zu verbinden
            this.nutzerCollection = this.db.db(this.dbName).collection("benutzer"); //speichert die collection benutzen in usercollection
            this.abonnierCollection = this.db.db(this.dbName).collection("abonnenten");
            this.beitragsCollection = this.db.db(this.dbName).collection("nachrichten");
        }

        private async loginMethode(params: URLSearchParams): Promise<{}> { 
            if (!this.nutzerCollection) { // wenn die usercollection nicht vorhanden, dann db error
                return { status:"error", message: "Fehler mit der Datenbank" };
            }
            let passwortVonUebergebeneAnfrage = params.get('password'); //ansonsten speichere in die variable psw, email die parameter von password und email die beim login übergeben wurden
            let user = params.get('user');
            if (!passwortVonUebergebeneAnfrage || !user) { //wenn eins davon leer bzw falsch ist dann gebe error zurück
                return { status:"error", message: "Pflichtfelder nicht ausgefüllt."};
            }
            
                let benutzerArray = await this.nutzerCollection.find({user: user, password: passwortVonUebergebeneAnfrage}).toArray(); //warte darauf dass in der collection alle einträge gefunden werden, die mit der email nd passwort übereinstimmen und speichere sie in einem array
                if (benutzerArray.length === 0) { //wenn das array leer ist, ist auch kein benutzer vorhanden, also error ausgeben
                    return {status: "error", message:"Benutzer konnte nicht gefunden werden"};
                }
           
            return {status:"ok", user: user}; //ansonsten gebe success zurück, um ein erfolgreiches einloggen zu simulieren
        }

        private async registrierMethode(params: URLSearchParams): Promise<{}> {
            if (!this.nutzerCollection) { //erneuter test ob die datenbank auch verbunden ist, wenn nein dann error
                return { status:"error", message: "Fehler mit der Datenbank" };
            }//wenn ja dann 
            let userVonUebergebeneAnfrage = params.get('user');//speichere die parameter des vornames in die variable vorname, genauso auch bei den restlihcen
            let passwordVonUebergebeneAnfrage = params.get('password');
            let mailVonUebergebeneAnfrage = params.get('email');
            let semester = params.get('semester');
            let studiengang = params.get('studiengang');

            if (!userVonUebergebeneAnfrage || !passwordVonUebergebeneAnfrage || !mailVonUebergebeneAnfrage || !semester || !studiengang) { //wenn eins davon leer oder falsch ist gebe error aus
                return { status:"error", message: "Pflichtfelder nicht ausgefüllt."};
            }

            
                let benutzerArray = await this.nutzerCollection.find({user: userVonUebergebeneAnfrage}).toArray(); // selbe prinzip wie die methode handleLogin
                if (benutzerArray && benutzerArray.length > 0) { //wenn der array und die länge des arrays größer als 0 sind heißt es, dass es unter dieser email addresse bereits einen nutzer gibt
                    return {status: "error", message:"Dieser Benutzer existiert bereits."};
                }

                await this.nutzerCollection.insertOne({ //wenn das nicht der fall ist dann füge in die collection vorname, nachname passwort und email ein
                    user: userVonUebergebeneAnfrage,
                    email: mailVonUebergebeneAnfrage,
                    password: passwordVonUebergebeneAnfrage,
                    semester: semester,
                    studiengang: studiengang
                });
           
                return {status:"ok", user: userVonUebergebeneAnfrage}; //bei erfolgreichen abschließen der aktion
        }
    }
}

new Server.ServerKlasse();/*Einstiegspunkt*/

