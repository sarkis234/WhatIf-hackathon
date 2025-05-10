const form = document.querySelector('.form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const text = form.promptInput.value;

  const response = await fetch(`/ask/${text}`, {
    method: 'GET',
  });
  const responseText = await response.text();
  const resText = document.createElement('p');
  resText.textContent = responseText;
  document.querySelector('body').appendChild(resText);
  console.log(responseText);
})