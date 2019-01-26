const Scroll = require('./CatalogItem');

const record = {
  id: 12345,
  catalogData: {
    title: 'book',
    tags: 'SiFi',
  },
  lastCleaned: '20110115',
};
const LocalDate = {
  parse: i => i,
};

const scroll = new Scroll(record.id, record.catalogData.title, record.catalogData.tags, LocalDate.parse(record.lastCleaned));

const scrolls = aDocument.map(record => new Scroll(record.id, record.catalogData.title, record.catalogData.tags, LocalDate.parse(record.lastCleaned)));
