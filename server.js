const express = require('express');
const app = express();

const {quotes} = require('./data');
const {getRandomElement} = require('./utils');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(PORT, () => {
	console.log(`I am listening on port ${PORT}`);
});

// Get Random Quote
app.get('/api/quotes/random', (req, res, next) => {
	const randomQuote = getRandomElement(quotes);
	res.send({
		quote: randomQuote
	});
});

// Filter on All Quotes
app.get('/api/quotes', (req, res) => {
	const allQuotes = quotes.filter(author => {
		return author.name === req.query.name;
	});
	if (req.query.name) {
		res.send ({
			quotes: allQuotes
		});
	} else {
		res.send({
			quotes: quotes
		});
	}
});

//POST new quote
app.post('/api/quotes', (res, req, next) => {
	const newQuote = req.query.quote;
	const newName = req.query.name;
	if (newQuote != '' && newName != '') {
		quotes.push({
			quote: newQuote,
			name: newName
		});
		res.send({
			quote: {
				quote: newQuote,
				name: newName
			}
		}); 
	} else {
		res.status(404).send('Invalid Request');
	}
});