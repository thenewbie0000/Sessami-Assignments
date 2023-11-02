const inputBox = document.getElementById("input-box");
const  listContainer= document.getElementById("list-container");

function addTask(){
  if(inputBox.value === ''){
    alert('First write the note!');
  }
  else{
    let li = document.createElement("li");
    li.innerHTML= inputBox.value;
    listContainer.appendChild(li);
    let bin = document.createElement("img");
    bin.src = "images/trash-solid.png";
    li.appendChild(bin);
  }
  inputBox.value = "";
}


listContainer.addEventListener("click", function(event){
  if(event.target.tagName === "LI"){
    event.target.classList.toggle("checked");
  }
  else if (event.target.tagName === "IMG") {
    event.target.parentElement.remove();
  }
}, false);