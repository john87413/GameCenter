/**
 * Creates a shoe of shuffled decks.
 * 創建指定數量的牌組
 * 
 * @param {number} [deckCount=1] - The number of decks to create. Defaults to 1.
 * @return {Array} - An array representing the shoe of shuffled decks.
 */
function createShoe(deckCount = 1) {
    let shoe = []
    for (let i = 0; i < deckCount; i++) {
        shoe = shoe.concat(shuffle(createDeck()))
    }
    return shoe
}
/**
 * Creates a deck of cards.
 * 創建未打亂的牌組
 * 
 * @return {Array} An array representing the deck of cards, where each card is an object with properties 'value' and 'suit'.
 */
function createDeck() {
    let deck = []
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    const suits = ['C', 'D', 'H', 'S']
    values.forEach(value => {
        suits.forEach(suit => {
            deck.push({ value, suit })
        })
    })
    return deck
}
/**
 * Shuffles the given array of cards.
 * Starting from the last index of the array and continues until the first index. 
 * Generates a random index within the range of the current index and swaps the elements at those indices
 * 將牌組隨機打亂，方法是從最後一個元素開始，一直到第一個，隨機產生一個索引 ( 索引範圍為 0 ~ 當前索引 ) ，並將該索引的兩個元素互換
 * 
 * @param {Array} cardsToShuffle - The array of cards to be shuffled.
 * @return {Array} The shuffled array of cards.
 */
function shuffle(cardsToShuffle) {
    let cards = cardsToShuffle.slice() // copy array
    for (let i = cards.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const randomCard = cards[randomIndex]
        cards[randomIndex] = cards[i]
        cards[i] = randomCard
    }
    return cards
}

export default { createShoe, createDeck, shuffle }
