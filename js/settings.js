const translations={
en:{addHomework:"Add Homework / Exam", yourTasks:"Your Tasks", subject:"Subject", task:"Task description", loginBtn:"Login", createBtn:"Create Account", languageLabel:"Language", dashboardTitle:"📚 Homework Planner", addBtn:"Add", themeBtn:"🌙 / ☀️"},
nl:{addHomework:"Voeg Huiswerk / Toets Toe", yourTasks:"Jouw Taken", subject:"Vak", task:"Beschrijving", loginBtn:"Inloggen", createBtn:"Account Maken", languageLabel:"Taal", dashboardTitle:"📚 Huiswerk Planner", addBtn:"Toevoegen", themeBtn:"🌙 / ☀️"}
};

function setLanguage(lang){
  localStorage.setItem("language",lang);
  applyLanguage();
}

function applyLanguage(){
  const lang=localStorage.getItem("language")||"en";
  const t=translations[lang];
  document.querySelectorAll("[data-text]").forEach(el=>{
    const key=el.getAttribute("data-text");
    if(t[key]) el.innerText=t[key];
    if(el.tagName==="INPUT" && t[key]) el.placeholder=t[key];
  });
}

window.onload=function(){
  const savedTheme=localStorage.getItem("theme")||"light";
  document.body.classList.remove("light","dark");
  document.body.classList.add(savedTheme);
  applyLanguage();
};

function exportSave(){
  let data=JSON.stringify(localStorage);
  let blob=new Blob([data]);
  let a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="homework-save.json";
  a.click();
}

function importSave(file){
  let reader=new FileReader();
  reader.onload=()=>{
    let data=JSON.parse(reader.result);
    for(let key in data){ localStorage.setItem(key,data[key]); }
    location.reload();
  };
  reader.readAsText(file);
}
