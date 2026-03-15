function loadTasks(){
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  let user = localStorage.getItem("loggedUser");
  if(!user){ window.location="index.html"; return; }

  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.filter(t=>t.user===user).forEach((t,i)=>{
    let div = document.createElement("div");
    div.className="task";
    div.innerHTML=`
      <input type="checkbox" ${t.done?"checked":""} onchange="toggleTask(${i})">
      <b>${t.subject}</b> - ${t.task}
      <button onclick="deleteTask(${i})">❌</button>
    `;
    list.appendChild(div);
  });
}

function addTask(){
  let subject = document.getElementById("subject").value || "General";
  let task = document.getElementById("task").value;
  if(!task) return;

  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  let user = localStorage.getItem("loggedUser");
  tasks.push({user:user, subject:subject, task:task, done:false});
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function toggleTask(i){
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks[i].done = !tasks[i].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(i){
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.splice(i,1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

window.onload = loadTasks;
