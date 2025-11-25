import './style.css';

export const projectHandler = (function createProjectCards() {
    const showProjectModal = document.getElementById('show-project-modal');
    const projectDialog = document.getElementById('project-dialog');
    const closeModals = document.querySelectorAll('.close-dialog');
    const prjctTitle = document.getElementById('prjct-title');
    const prjctSubmit = document.getElementById('prjct-submit');
    const prjctCont = document.querySelector('.prjct-cont');

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
    let selectedProject = null; //? The task module will read this.

    //? Constructor to create project cards
    function ProjectCards(title, tasksLibrary) {
        // this.id = crypto.randomUUID();
        this.title = title;
        this.tasksLibrary = tasksLibrary;
    }

    prjctSubmit.addEventListener('click', function(e) {
        if(prjctTitle.value) {
            e.preventDefault();
            const projectCard = new ProjectCards(prjctTitle.value, []);
            projectLibrary.push(projectCard);
            prjctTitle.value = '';
            projectDialog.close();
            addProjectCard();
        }
    });

    function addProjectCard() {
        prjctCont.innerHTML = '';
        for(let i = 0; i < projectLibrary.length; i++) {
            const project = projectLibrary[i];

            let newPrjctCard = document.createElement('div');
            newPrjctCard.setAttribute('id', `${projectLibrary[i].id}`);

            newPrjctCard.innerHTML += `
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

            //? Select each project card (will be used by the tasks module)
            newPrjctCard.addEventListener('click', function(){
                selectedProject = project;

                //todo Make sure to learn more about this
                //? This notifies the tasks module
                document.dispatchEvent(
                    new CustomEvent('projectSelected', { detail: project })
                );
            });

            prjctCont.appendChild(newPrjctCard);
        };
    };

    //? Export to task module
    return {
        projectLibrary,
        get selectedProject() {
            return selectedProject;
        }
    };

})();



// export { createProjectModals };