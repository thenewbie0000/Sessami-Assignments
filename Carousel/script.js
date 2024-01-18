let index = 0;
let slide = document.querySelectorAll(".slide");

function clear() {
  for (let i = 0; i < slide.length; i++) {
    slide[i].style.display = "none";
  }
}

function next() {
  clear();
  if (index === slide.length - 1){
    index = -1;
  }
  index++;
  slide[index].style.display = "block";
}

function prev() {
  clear();
  if (index === 0){
    index = slide.length;
  }
  index--;
  slide[index].style.display = "block";
}

function start() {
  clear();
  slide[index].style.display = "block";
}
start();