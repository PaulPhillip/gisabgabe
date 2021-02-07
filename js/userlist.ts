let userListDiv = document.getElementById("liste");

async function renderUserlist(){
    if(!userListDiv){
        return;
    }
    userListDiv.innerHTML = '';
    let user = localStorage.getItem('loginAs');
    if(!user){
        displayMessage('error', 'Du bist nicht angemeldet');
        return;
    }
    let urlparams = new URLSearchParams();
    urlparams.append("user", user);
    let result = await fetch(url+"/liste?"+urlparams.toString());
    let response = await result.json();
    if(response.status === "error"){
        displayMessage(response.status, response.message);
    }
    else{
        if(!response.allUsers || !response.followedUsers){
            displayMessage("error", "Es konnten keine User ausgelesen werden.")
        }
        else{
            let allUsers = response.allUsers;
            let followedUsers = response.followedUsers;
            for(let user of allUsers){
                let newDiv = document.createElement('div');
                newDiv.setAttribute('class', 'list-user');
                let userSpan = document.createElement('span');
                userSpan.setAttribute('class', 'list-username');
                userSpan.innerHTML = user;
                let btn = document.createElement('button');
                if(followedUsers.includes(user)){
                    btn.innerHTML = "Deabonnieren";
                    btn.setAttribute('class', 'list-btn list-deabo');
                    btn.addEventListener('click', function() {
                        deabo(user);
                    });
                }
                else{
                    btn.innerHTML = "Abonnieren";
                    btn.setAttribute('class', 'list-btn list-abo');
                    btn.addEventListener('click', function() {
                        abo(user);
                    });
                }
                newDiv.appendChild(userSpan);
                newDiv.appendChild(btn);
                userListDiv.appendChild(newDiv);
            }
        }
    }
}
renderUserlist();

async function abo(target: string){
    let user = localStorage.getItem('loginAs');
    if(!user){
        displayMessage('error', 'Du bist nicht angemeldet');
        return;
    }
    if(!target){
        displayMessage('error', 'Du hast kein Ziel.');
        return;
    }
    let params = new URLSearchParams();
    params.append("user", user);
    params.append("target", target);
    let result = await fetch(url+"/abonnieren?"+params.toString());
    let response = await result.json();
    if(response.status === "error"){
        displayMessage(response.status, response.message);
    }
    else{
        renderUserlist();
    }
}

async function deabo(target: string){
    let user = localStorage.getItem('loginAs');
    if(!user){
        displayMessage('error', 'Du bist nicht angemeldet');
        return;
    }
    if(!target){
        displayMessage('error', 'Du hast kein Ziel.');
        return;
    }
    let params = new URLSearchParams();
    params.append("user", user);
    params.append("target", target);
    let result = await fetch(url+"/deabonnieren?"+params.toString());
    let response = await result.json();
    if(response.status === "error"){
        displayMessage(response.status, response.message);
    }
    else{
        renderUserlist();
    }
}