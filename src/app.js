const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const TopupHandler = require('./Intents/Topup.intent')
const app = express();

const {
  WebhookClient
} = require('dialogflow-fulfillment');

app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({
    success: true
  });
})

app.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  let intentMap = new Map();
  intentMap.set('Topup', TopupHandler);
  agent.handleRequest(intentMap);
});

module.exports = {
    app
}
