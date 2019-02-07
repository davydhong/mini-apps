const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

const addItem = (e) => {
  e.preventDefault();

  const text = e.target.querySelector('[name=item]').value;
  console.log(text);
  const item = {
    text,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  e.target.reset();
};

const populateList = (plates = [], platesList) => {
  platesList.innerHTML = plates
    .map(
      (plate, i) => `
    <li>
      <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
      <label for="item${i}">${plate.text}</label>
    </li>
    `,
    )
    .join('');
};

addItems.addEventListener('submit', addItem);
populateList(items, itemsList);

const toggleDone = (e) => {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const { index } = el.dataset;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
};

itemsList.addEventListener('click', toggleDone);
