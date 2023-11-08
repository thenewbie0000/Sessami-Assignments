const modal = document.querySelector('.modal');
const openButton = document.querySelector('.btn');
const closeButton = document.querySelector('.close');

openButton.addEventListener('click',()=>{
    modal.style.display = 'block';
});
closeButton.addEventListener('click',()=>{
    modal.style.display = 'none';
});
document.addEventListener("keydown", (event) => {
    if ((event.key === ' ' || event.key === 'Spacebar' || event.key === "Escape" || event.key ==="Enter") && modal.style.display === 'block'){
        modal.style.display = 'none';
    }
});