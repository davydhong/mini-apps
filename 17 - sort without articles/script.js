const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const list = document.getElementById('bands');

const removeArticle = (aTitle) => {
  const articles = ['A', 'An', 'The'];
  const array = aTitle.split(' ');
  if (articles.includes(array[0])) array.shift();
  return array.join(' ');
};

const compareWithoutArticle = (a, b) => (removeArticle(a) > removeArticle(b) ? 1 : -1);

const sortedBands = bands.sort((a, b) => compareWithoutArticle(a, b));

const elementToList = element => `<li>${element}</li>`;

list.innerHTML = sortedBands.map(band => elementToList(band)).join('');
