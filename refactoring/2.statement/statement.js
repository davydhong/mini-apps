const { renderPlainText, createStatementData } = require('./createStatementData');

const statement = invoice => renderPlainText(createStatementData(invoice));

module.exports = statement;
