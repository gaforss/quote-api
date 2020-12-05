const randomQuote = document.getElementById('random-quote');
const allQuotes = document.getElementById('all-quotes');
const quoteContainer = document.getElementById('container');
const quoteText = document.querySelector('.quote');
const attributionText = document.querySelector('.attribution');

// Define a variable that equals a function that will reference the 'quote-container' id and empty the content
const resetQuotes = () => {
  quoteContainer.innerHTML = '';
}

// Create an inital error function to handle invalid responses
const renderError = response => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

// Fetch All Quotes (Reference Server.js GET Route Handler)
allQuotes.addEventListener('click', () => {
  fetch('/api/quotes')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});

// Fetch Random Quote (Reference Server.js GET Route Handler)
randomQuote.addEventListener('click', () => {
  fetch('/api/quotes/random')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes([response.quote]);
  });
});

// Create New Quote (DIV) within the referenced array data
const renderQuotes = (quotes = []) => {
    resetQuotes();
    if (quotes.length > 0) {
      quotes.forEach(quote => {
        const newQuote = document.createElement('div');
        newQuote.className = 'single-quote';
        newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
        <div class="attribution">- ${quote.name}</div>`;
        quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}