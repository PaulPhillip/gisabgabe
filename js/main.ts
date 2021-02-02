let postsDiv = document.getElementById("posts");

let postInput = document.getElementById("message") as HTMLInputElement;

let postBtn = document.getElementById("sendmessage");

if(postBtn){
    postBtn.addEventListener("click", post);
}


async function post(evt: MouseEvent){
    evt.preventDefault();
    let user = localStorage.getItem("loginAs");
    let post = postInput.value;

    if(!user || !post){
        displayMessage("error", "Es wurden nicht alle benötigten Felder ausgefüllt");
        return;
    }

    let urlparams = new URLSearchParams();
    urlparams.append("user", user);
    urlparams.append("text", post);

    let result = await fetch(url+"/post?"+urlparams.toString());
    let response = await result.json();
    if(response.status === "ok"){
        renderMain();
    }
    else{
        displayMessage(response.status, response.message);
    }
}

async function renderMain(){
    if(!postsDiv){
        return;
    }
    postsDiv.innerHTML = '';
    let user = localStorage.getItem("loginAs");
    if(!user){
        displayMessage("error", "Du bist vermutlich nicht angemeldet, du kannst deshalb die Posts nicht sehen.");
        return;
    }

    let urlparams = new URLSearchParams();
    urlparams.append("user", user);

    let result = await fetch(url+"/getposts?"+urlparams.toString());
    let response = await result.json();
    if(response.status === "ok" && response.posts){
        let posts = response.posts;
        for (let post of posts){
            postsDiv.appendChild(newPostElement(post));
        }
    }
    else{
        displayMessage(response.status, response.message);
    }
}
renderMain();

function newPostElement(post: {user: string; text: string; date: string}) : HTMLElement{
    let div = document.createElement('div');
    let userSpan = document.createElement('span');
    let textP = document.createElement('p');
    let datumSpan = document.createElement('span');

    div.setAttribute('class', 'post');
    userSpan.setAttribute('class', 'post-username');
    textP.setAttribute('class', 'post-text');
    datumSpan.setAttribute('class', 'post-date')

    userSpan.innerHTML = post.user;
    textP.innerHTML = post.text;
    datumSpan.innerHTML = new Date(post.date).toISOString();

    div.appendChild(userSpan);
    div.appendChild(textP);
    div.appendChild(datumSpan);

    return div;
}