async function hash(text){
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b=>b.toString(16).padStart(2,"0")).join("");
}

async function register(){
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  if(!user || !pass){ alert("Fill both fields"); return; }

  let hashPass = await hash(pass);
  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if(users[user]){ alert("User exists"); return; }

  users[user] = hashPass;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account created");
}

async function login(){
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  let users = JSON.parse(localStorage.getItem("users") || "{}");
  let hashPass = await hash(pass);

  if(users[user] === hashPass){
    localStorage.setItem("loggedUser", user);
    window.location = "dashboard.html";
  }else{
    alert("Wrong login");
  }
}

function toggleTheme(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}
