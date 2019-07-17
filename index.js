let ideas = [];

const submitIdea = document.querySelector('#submit-idea');

submitIdea.addEventListener('click', addIdea);
window.addEventListener('load', loadIdeas);

function addIdea(e) {
  e.preventDefault();
  const titleInput = document.querySelector('#title-input');
  const descriptionInput = document.querySelector('#description-input')
  const newIdea = new Idea(titleInput.value, descriptionInput.value, Date.now());
  ideas.push(newIdea);
  newIdea.saveLocalStorage(ideas);
  renderNewIdea(newIdea);
}

function renderNewIdea(idea) {
  const ideasContainer = document.querySelector('#ideas-container');
  (ideasContainer.innerHTML = `<article class="card" data-id="${idea.id}">
    <header class="idea-header">
      <img class="star-img" src=${idea.starredImg}>
      <img class="delete-img" src="images/delete.svg">
    </header>
    <div class="idea-content">
      <h5 contenteditable="true" class="idea-card-title">${idea.title}</h5>
      <p contenteditable="true" class="idea-card-body">${idea.description}</p>
    </div>
    <footer class="idea-footer">
      <img class="quality-up-img" src="images/upvote.svg">
      <h5 class="idea-card-quality">Quality:<span id="idea-card-quality">${idea.quality}</span></h5>
      <img class="quality-down-img" src="images/downvote.svg">
    </footer>
  </article>` + ideasContainer.innerHTML);
}

function loadIdeas(e) {
  const parsedIdeas = JSON.parse(localStorage.getItem('ideas'));
  if (parsedIdeas === null) {
    return
  } else {
    ideas = parsedIdeas;
    console.log(ideas);
    parsedIdeas.map(idea => {
      return renderNewIdea(idea);
    })
  }
}

document.querySelector('#ideas-container').addEventListener('click', function deleteCard(e) {
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

document.querySelector('#ideas-container').addEventListener('click', function starCard(e) {
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

