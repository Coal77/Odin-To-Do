import './style.css';

const showProjectModal = document.getElementById('show-project-modal');
const projectDialog = document.getElementById('project-dialog');
const closeModals = document.querySelectorAll('.close-dialog');
const prjctTitle = document.getElementById('prjct-title');
const prjctSubmit = document.getElementById('prjct-submit');
const prjctCont = document.querySelector('.prjct-cont');
const cardDel = document.querySelector('.cardDel');

//? Function to show the project modal
showProjectModal.addEventListener('click', () => {
    projectDialog.showModal();
});
//? Function to close modals
closeModals.forEach((btn) => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const dialog = btn.closest('dialog');
        dialog.close();
    })
});

const projectLibrary = [];
//? function to create project cards
function ProjectCards(title) {
    this.title = title;
}

prjctSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    projectDialog.close();
    const projectCard = new ProjectCards(prjctTitle.value);
    projectLibrary.push(projectCard);
    prjctTitle.value = '';
    addProjectCard();
})

function addProjectCard() {
    prjctCont.innerHTML = '';
    for(let i = 0; i < projectLibrary.length; i++) {
        let newPrjctCard = document.createElement('div');
        newPrjctCard.innerHTML = `
            <p>${projectLibrary[i].title}</p>
            <div class='cardDel'>&#x00D7</div>
        `;
        newPrjctCard.style.cssText = 'display: flex; align-items: center; justify-content: space-between;';
        const cardDel = newPrjctCard.querySelector('.cardDel');

        //? This deletes the project card
        cardDel.addEventListener('click', function() {
            let childNode = newPrjctCard;
            let parentNode = childNode.parentNode;
            parentNode.removeChild(childNode);
            projectLibrary.splice(i, 1);
        });
        prjctCont.appendChild(newPrjctCard)
    }
}



export { showProjectModal, closeModals, prjctSubmit };