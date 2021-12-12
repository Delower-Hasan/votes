const boutonRouge = document.querySelector('.rouge input');
const boutonBleu = document.querySelector('.bleu input');
const voteRouge = document.querySelector('.rouge .vote');
const voteBleu = document.querySelector('.bleu .vote');

boutonRouge.addEventListener('click', async () => {
    await fetch('/vote/rouge', {
        method: 'PATCH'
    });
});

boutonBleu.addEventListener('click', async () => {
    await fetch('/vote/bleu', {
        method: 'PATCH'
    });
});

let source = new EventSource('/vote');

source.addEventListener('vote-rouge', (event) => {
    let data = JSON.parse(event.data);
    voteRouge.innerText = data.vote;
});

source.addEventListener('vote-bleu', (event) => {
    let data = JSON.parse(event.data);
    voteBleu.innerText = data.vote;
});
