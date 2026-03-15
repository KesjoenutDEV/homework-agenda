function logout(){localStorage.removeItem("loggedUser");window.location="index.html";}

function loadTasks(){
  let tasks=JSON.parse(localStorage.getItem("tasks")||"[]");
  let user=localStorage.getItem("loggedUser");
  if(!user){window.location="index.html";return;}
  let list=document.getElementById("taskList");
  list.innerHTML="";
  tasks.filter(t=>t.user===user).forEach((t,i)=>{
    let div=document.createElement("div");
    div.className="task"+(t.done?" done":"");
    let assignments="";
    if(t.assignments){
      assignments=t.assignments.map((a,j)=>`<label><input type="checkbox" onchange="toggleAssignment(${i},${j})"${a.done?" checked":""}> ${a.name}</label>`).join(", ");
    }
    div.innerHTML=`<div><b>${t.subject}</b> (${t.date}) ${t.examWeight?`[Exam ${t.examWeight}%]`:""}<br>${t.task}<br>${assignments}</div><button onclick="deleteTask(${i})">Delete</button>`;
    list.appendChild(div);
  });
}

function addTask(){
  let day=document.getElementById("day").value;
  let subject=document.getElementById("subject").value||"General";
  let task=document.getElementById("task").value||"";
  let num=document.getElementById("num").value;
  let assignments=[];
  if(num){assignments=num.split(",").map(n=>({name:n.trim(),done:false}));}
  let examWeight=document.getElementById("examWeight").value;
  let studyDate=document.getElementById("studyDate").value;
  if(!day){alert("Set a date");return;}
  let user=localStorage.getItem("loggedUser");
  let tasks=JSON.parse(localStorage.getItem("tasks")||"[]");
  tasks.push({user:user,date:day,subject:subject,task:task,assignments:assignments,examWeight:examWeight,studyDate:studyDate,done:false});
  localStorage.setItem("tasks",JSON.stringify(tasks));
  loadTasks();
  loadCalendar();
}

function deleteTask(i){if(!confirm("Are you sure you want to delete this task?")) return;let tasks=JSON.parse(localStorage.getItem("tasks")||"[]");tasks.splice(i,1);localStorage.setItem("tasks",JSON.stringify(tasks));loadTasks();loadCalendar();}

function toggleAssignment(taskIndex,assignIndex){
  let tasks=JSON.parse(localStorage.getItem("tasks")||"[]");
  tasks[taskIndex].assignments[assignIndex].done=!tasks[taskIndex].assignments[assignIndex].done;
  const behavior=window.taskBehavior||"fade";
  if(tasks[taskIndex].assignments.every(a=>a.done)) tasks[taskIndex].done=true;
  else tasks[taskIndex].done=false;
  localStorage.setItem("tasks",JSON.stringify(tasks));
  loadTasks();
  loadCalendar();
}

function loadCalendar(){
  const calendarEl=document.getElementById("calendar");
  calendarEl.innerHTML="";
  const today=new Date();
  const weekStart=new Date(today.setDate(today.getDate() - today.getDay() +1));
  const weekDays=[];
  for(let i=0;i<7;i++){
    const d=new Date(weekStart);
    d.setDate(weekStart.getDate()+i);
    weekDays.push(d);
  }

  weekDays.forEach(d=>{
    const div=document.createElement("div");
    div.className="calendar-day";
    div.dataset.date=d.toISOString().split("T")[0];
    div.innerHTML=`<h4>${d.toLocaleDateString(undefined,{weekday:"short",day:"numeric"})}</h4>`;
    calendarEl.appendChild(div);
  });

  let tasks=JSON.parse(localStorage.getItem("tasks")||"[]");
  let user=localStorage.getItem("loggedUser");
  tasks.filter(t=>t.user===user).forEach((t,ti)=>{
    const dayDiv=document.querySelector(`.calendar-day[data-date='${t.date}']`);
    if(dayDiv){
      t.assignments.forEach((a,ai)=>{
        const taskEl=document.createElement("div");
        taskEl.className="calendar-task"+(a.done?" done":"");
        taskEl.innerText=`${t.subject}: ${a.name}`;
        taskEl.onclick=function(){toggleAssignment(ti,ai);}
        dayDiv.appendChild(taskEl);
      });
    }
  });
}

window.onload=function(){loadTasks(); loadCalendar();};
