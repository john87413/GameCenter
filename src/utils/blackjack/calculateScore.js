const FACE_VALUES = {
    'a': 1,
    'J': 10,
    'Q': 10,
    'K': 10,
    'A': 11
}

function score(cardsToTotal) {
    let cards = cardsToTotal.map(makeAcesLow)
    let lowTotal = cards.reduce(sumCards, 0)
    let highTotal = makeOneAceHigh(cards).reduce(sumCards, 0)
    if (highTotal <= 21) return highTotal
    return lowTotal
}

function sumCards(a, b) {
    return a + getNumericalValue(b)
}

function getNumericalValue(card) {
    if (FACE_VALUES[card.value]) return FACE_VALUES[card.value]
    return parseInt(card.value)
}

function makeAcesLow(cardToModify) {
    let card = Object.assign({}, cardToModify)
    if (card.value === 'A') card.value = 'a'
    return card
}

function makeOneAceHigh(cardsToModify) {
    let cards = cardsToModify.slice()
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].value === 'a') {
            cards[i].value = 'A'
            break
        }
    }
    return cards
}

export default { score }
