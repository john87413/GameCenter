// 撲克牌面值對應的點數
const FACE_VALUES = {
    'a': 1,
    'J': 10,
    'Q': 10,
    'K': 10,
    'A': 11
}

// 計算手牌總點數，並判斷Ace是否取最高點數
function score(cardsToTotal) {
    let aceCount = 0
    let total = 0

    // 計算所有牌的點數，Ace 都算 11
    cardsToTotal.forEach(card => {
        if (card.value === 'A') {
            aceCount++
            total += 11
        } else {
            total += getNumericalValue(card)
        }
    })

    // 如果總點數超過 21，則將 Ace 逐個改為 1 點，直到不超過 21 或沒有 Ace 可改
    while (total > 21 && aceCount > 0) {
        total -= 10  // 將一個 Ace 從 11 改為 1 (減少 10)
        aceCount--
    }

    return total
}

// 獲取卡牌的數字值
function getNumericalValue(card) {
    if (FACE_VALUES[card.value]) return FACE_VALUES[card.value]
    return parseInt(card.value)
}

export default { score }
