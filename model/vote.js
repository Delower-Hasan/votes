let votes = {
    rouge: 0,
    bleu: 0
};

export const voteRouge = () => {
    votes.rouge++;
}

export const voteBleu = () => {
    votes.bleu++;
}

export const getVotes = () => {
    return votes;
}

export const getVoteRouge = () => {
    return votes.rouge;
}

export const getVoteBleu = () => {
    return votes.bleu;
}
