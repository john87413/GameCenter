// 創建指定數量的牌組
function createShoe(deckCount = 1) {
    let shoe = []
    for (let i = 0; i < deckCount; i++) {
        shoe = shoe.concat(shuffle(createDeck()))
    }
    return shoe
}
// 創建未打亂的牌組
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
// 將牌組隨機打亂，方法是從最後一個元素開始，一直到第一個，隨機產生一個索引 ( 索引範圍為 0 ~ 當前索引 ) ，並將該索引的兩個元素互換
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
