let ideas = [];

const submitIdea = document.querySelector('#submit-idea');

submitIdea.addEventListener('click', addIdea);
window.addEventListener('load', loadIdeas);

function addIdea(e) {
  e.preventDefault();
  const titleInput = document.querySelector('#title-input');
  const descriptionInput = document.querySelector('#description-input');
  const newIdea = new Idea(titleInput.value, descriptionInput.value, Date.now());
  emptyInputs(titleInput, descriptionInput);
  ideas.push(newIdea);
  newIdea.saveLocalStorage(ideas);
  renderNewIdea(newIdea);
}

function emptyInputs(titleInput, descriptionInput) {
  titleInput.value = '';
  descriptionInput.value = '';
}

function renderNewIdea(idea) {
  const ideasContainer = document.querySelector('#ideas-container');
  (ideasContainer.innerHTML = `<article class="card" data-id="${idea.id}">
    <header class="idea-header">
      <img class="star-img" src=${idea.starredImg}>
      <img class="delete-img" src="images/delete.svg">
    </header>
    <div class="idea-content">
      <h4 class="idea-card-title">${idea.title}</h5>
      <p class="idea-card-body">${idea.description}</p>
    </div>
  </article>` + ideasContainer.innerHTML);
  
  var dataIdKey = `[data-id = "${idea.id}"]`;
  var targetCard = document.querySelector(dataIdKey);
  targetCard.style.display = "block";
}

function loadIdeas(e) {
  const parsedIdeas = JSON.parse(localStorage.getItem('ideas'));
  if (parsedIdeas === null) {
    return
  } else {
    ideas = parsedIdeas;
    parsedIdeas.map(idea => {
      return renderNewIdea(idea);
    });
  }
}

document.querySelector('#ideas-container')
.addEventListener('click', function deleteCard(e) {
  if (e.target.className === "delete-img") {
    e.target.closest('.card').remove();
    let ideaIndex = getIdeaById(e);
    ideas.splice(ideaIndex, 1);
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }
})

function getIdeaById(e) {
  const targetCard = e.target.closest('.card');
  const cardId = parseInt(targetCard.getAttribute('data-id'));
  return ideas.findIndex(idea => idea.id === cardId);
}

document.querySelector('#ideas-container')
.addEventListener('click', function starCard(e) {
  if (e.target.className === 'star-img') {
    const ideaIndex = getIdeaById(e);
    ideas[ideaIndex].starred = !ideas[ideaIndex].starred;
    toggleStarImg(e);
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }
})

function toggleStarImg(e) {
  const ideaIndex = getIdeaById(e);
  const targetIdea = ideas[ideaIndex];
  if (targetIdea.starred === true) {
    targetIdea.starredImg = 'images/star-active.svg';
    e.target.src = 'images/star-active.svg';
  } else {
    targetIdea.starredImg = 'images/star.svg';
    e.target.src = 'images/star.svg';
  }
} 

document.querySelector('#show-starred-btn')
.addEventListener('click', function filterStarred() {
  ideas.forEach(idea => {
    const dataIdKey = `[data-id = "${idea.id}"]`;
    const targetCard = document.querySelector(dataIdKey);
    if (targetCard.style.display === 'block' && !idea.starred) {
      targetCard.style.display = 'none';
    } else if (targetCard.style.display === 'none') {
      targetCard.style.display = 'block';
    }
  })
});

