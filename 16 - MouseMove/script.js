const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 100;

const shadow = (e) => {
  const { offsetWidth: width, offsetHeight: height } = hero;

  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    x += e.target.offsetLeft;
    y += e.target.offsetTop;
  }
  //! offsetLeft is reset to 0 for the child element. Making correction for the child element.
  const xWalk = Math.round(x / width * walk - walk / 2);
  const yWalk = Math.round(y / height * walk - walk / 2);

  text.style.textShadow = `${xWalk}px ${yWalk}px 0 red`;

  console.log(x, y);
};

hero.addEventListener('mousemove', shadow);
