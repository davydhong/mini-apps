const Site = require('./Site');
const Customer = require('./Customer');

const site = new Site(new Customer());

const aCustomer = site.customer;
/* ;...lotsofinterveningcode... */
let customerName;
if (aCustomer === 'unknown') customerName = 'occupant';
else customerName = aCustomer.name;

const plan = aCustomer === 'unknown' ? registry.billingPlans.basic : aCustomer.billingPlan;

if (aCustomer !== 'unknown') aCustomer.billingPlan = newPlan;
const weeksDelinquent = aCustomer === 'unknown' ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;
