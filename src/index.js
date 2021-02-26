let randomQuoteURL="https://quote-garden.herokuapp.com/api/v3/quotes/random";
let quote = document.querySelector(".quote");
let author = document.querySelector(".author-button p");
let genre = document.querySelector(".author-button span");

let currentAuthor;

const getRandomQuote = () =>{
    quote.innerHTML = "Quote here";
    author.innerHTML = "Author";
    genre.innerHTML = "Quote genre";

    fetch(randomQuoteURL)
    .then(response => response.json())
    .then(
        response => {
            quote.innerHTML= response.data[0].quoteText;
            author.innerHTML= response.data[0].quoteAuthor;
            genre.innerHTML= response.data[0].quoteGenre;
            currentAuthor = response.data[0].quoteAuthor;
        }
    )
};

let mainContainer = document.querySelector(".main-container");
let backButton = document.querySelector(".back-button");

const getAuthorCuotes = () =>{
    mainContainer.innerHTML=`<h1>Loading, please wait</h1>`;
    let authorQuoteURL = `https://quote-garden.herokuapp.com/api/v3/quotes?author=${currentAuthor}`;
    let authorCuotes=[];
    backButton.style.display="flex";
    fetch(authorQuoteURL)
    .then(response => response.json())
    .then(
        response => {
            authorCuotes=response.data;
            mainContainer.innerHTML=`
                <div class="author-name">
                    <h1>${currentAuthor}</h1>
                <div>
            `;
            mainContainer.innerHTML+= authorCuotes.map(function(cuote){
                return (
                `<div class="quote">
                    ${cuote.quoteText}    
                </div>`
                )
            });
        }
    )
}

const back = () =>{
    backButton.style.display="none";
    location.reload();
}

getRandomQuote();