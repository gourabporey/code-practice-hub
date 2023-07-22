const getRootContainer = () => document.getElementById('root');

const getCommentValue = () => document.querySelector('#comment').value;

const createCenteredDiv = () => {
  const centeredDiv = document.createElement('div');
  centeredDiv.classList.add('absolute-center');
  return centeredDiv;
};

const showCommentOnCenter = () => {
  const centeredDiv = createCenteredDiv();
  const root = getRootContainer();
  centeredDiv.innerText = getCommentValue();
  root.appendChild(centeredDiv);
};

const enterText = () => {
  const clickBtn = document.querySelector('input[type=button]');
  clickBtn.onclick = showCommentOnCenter;
};

window.onload = enterText;
