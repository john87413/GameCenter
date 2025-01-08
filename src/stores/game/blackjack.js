import { defineStore } from 'pinia'
import createGame from '@/utils/blackjack/createGame';
import { results } from '@/utils/blackjack/data/result';
import calculateScore from '@/utils/blackjack/calculateScore';

const DEFAULT_DELAY = 500;
const DEALER_DECISION_DELAY = 750;

const { BUST, WIN, LOSE, PUSH, BLACKJACK } = results;
const BASE_HAND = {
    cards: [],
    result: undefined,
    bets: []
};

const clone = obj => JSON.parse(JSON.stringify(obj));

export const useBlackjackStore = defineStore('blackjack', {
    state: () => ({
        settings: {
            deckCount: 6, // 使用6副牌
            startingBank: 30, // 初始籌碼
            shuffleAfterPercent: 0.75, // 重洗牌界線
            minimumBet: 1 // 最低下注
        },
        bank: 0, // 玩家籌碼
        shoe: [], // 牌堆
        hands: [], // 手牌[莊家,玩家]
        activeHandIndex: null, // 當前操作的手牌索引
    }),

    getters: {
        // 獲取當前操作中的手牌
        activeHand(state) {
            return state.hands[state.activeHandIndex];
        },
        // 計算莊家手牌的總點數
        dealerTotal(state) {
            if (!state.hands.length) return;
            return calculateScore.score(state.hands[0].cards);
        },
        // 判斷當前是否處於分牌狀態，當手牌數量大於2時（莊家1加上玩家1以上）表示已經分牌
        isSplit(state) {
            return state.hands.length > 2;
        },
        // 判斷當前手牌是否可以進行分牌操作
        // 1. 玩家籌碼足夠支付最小下注額
        // 2. 存在手牌且有活動手牌
        // 3. 當前未分過牌（手牌數不超過2）
        // 4. 當前手牌為兩張且點數相同
        canSplit(state) {
            if (state.bank < state.settings.minimumBet) return false;
            if (!state.hands.length || state.activeHandIndex === null) return false;
            if (state.hands.length > 2) return false;
            const cards = state.hands[state.activeHandIndex].cards;
            return cards.length === 2 && cards[0].value === cards[1].value;
        },
        // 判斷當前手牌是否可以進行雙倍下注
        // 1. 玩家籌碼足夠支付最小下注額
        // 2. 存在手牌且有活動手牌
        // 3. 當前手牌恰好為兩張
        canDoubleDown(state) {
            if (state.bank < state.settings.minimumBet) return false;
            if (!state.hands.length || state.activeHandIndex === null) return false;
            const cards = state.hands[state.activeHandIndex].cards;
            return cards.length === 2;
        },
        // 判斷遊戲是否結束
        // 1. 存在手牌
        // 2. 玩家籌碼小於最小下注額
        // 3. 沒有未結算的下注
        // 4. 沒有未處理的牌
        isGameOver(state) {
            if (!state.hands.length) return false;
            const cards = state.hands.map(hand => hand.cards.length).reduce((a, b) => a + b);
            const bets = state.hands[1].bets.length;
            return state.bank < state.settings.minimumBet && !bets && !cards;
        }
    },

    actions: {
        // 1. 遊戲初始化

        // 開始新遊戲
        // 重置當前操作的手牌 -> 重置牌堆 -> 重置籌碼 -> 重置回合
        async startNewGame() {
            this.resetActiveHand()
            this.resetShoe();
            this.resetBank();
            await this.resetRound();
        },
        // 重置回合
        // 重置手牌 -> 檢查是否需要洗牌 -> 下注 -> 發牌回合
        async resetRound() {
            this.resetHands();
            this.reshuffleIfNeeded();
            this.bet();
            await this.dealRound();
        },
        // 重置牌堆，建立指定數量的新牌組並洗牌
        resetShoe() {
            this.shoe = createGame.createShoe(this.settings.deckCount);
            this.shoe = createGame.shuffle(this.shoe);
        },
        // 重置籌碼，將籌碼設置為初始值
        resetBank() {
            this.bank = this.settings.startingBank;
        },
        // 重置手牌，建立新的空手牌陣列，包含莊家和玩家
        resetHands() {
            this.hands = [clone(BASE_HAND), clone(BASE_HAND)];
        },
        // 重置當前操作的手牌
        resetActiveHand() {
            this.activeHandIndex = null;
        },
        // 檢查是否需要重新洗牌，當使用的牌數超過設定百分比時重新洗牌
        reshuffleIfNeeded() {
            const shoeUsedPercent = 1 - (this.shoe.length / (this.settings.deckCount * 52));
            if (shoeUsedPercent >= this.settings.shuffleAfterPercent) {
                this.resetShoe();
            }
        },

        // 2. 遊戲流程控制

        // 發牌回合
        // 按照順序給玩家和莊家發牌：玩家->莊家->玩家->莊家
        async dealRound() {
            if (!this.hands[1].bets[0]) return; // must have a bet to deal round
            const dealQueue = [1, 0, 1, 0]; // player, dealer, player, dealer
            for (let i = 0; i < dealQueue.length; i++) {
                setTimeout(() => { this.deal(dealQueue[i]); }, DEFAULT_DELAY * (i + 2));
            }
            setTimeout(() => { this.startRound(); }, DEFAULT_DELAY * 6);
        },
        // 發牌，從牌堆中抽一張牌給指定的手牌，處理莊家第一張牌面朝下的情況
        deal(handIndex) {
            const hand = this.hands[handIndex];
            let newCard = this.shoe.shift();
            const isFirstDealerCard = handIndex === 0 && hand.cards.length === 0;
            newCard.isFaceDown = isFirstDealerCard;
            hand.cards.push(newCard);
        },
        // 開始回合
        // 檢查爆牌和黑傑克，決定是否結束回合或繼續遊戲
        async startRound() {
            this.checkForBustsAndBlackjacks();
            if (this.hands.find(hand => hand.result)) {
                this.revealDealerHand();
                await this.endRound();
            } else {
                await this.startNextTurn();
            }
        },
        // 開始下一輪
        // 切換到下一個活動手牌，處理新分牌情況和莊家回合
        async startNextTurn() {
            this.advanceActiveHand();
            if (this.activeHand.cards.length === 1) { // a newly split hand
                let onlyOnce = this.activeHand.cards[0].value === 'A';
                setTimeout(() => { this.hit({ onlyOnce }); }, DEFAULT_DELAY);
            }
            if (this.activeHandIndex === 0) {
                setTimeout(() => {
                    this.revealDealerHand();
                    setTimeout(() => { this.makeDealerDecision(); }, DEALER_DECISION_DELAY);
                }, DEFAULT_DELAY);
            }
        },
        // 切換當前手牌，更新當前操作手牌到下一個
        advanceActiveHand() {
            if (this.activeHandIndex > 0) this.activeHandIndex--;
            if (this.activeHandIndex === null) this.activeHandIndex = this.hands.length - 1;
        },
        // 翻開莊家的牌
        revealDealerHand() {
            this.hands[0].cards[0].isFaceDown = false;
        },
        // 莊家決策，根據規則（小於17點必須要牌）決定莊家行動
        makeDealerDecision() {
            const remainingHands = this.hands.find((hand, i) => !hand.result && i > 0);
            if (this.dealerTotal < 17 && remainingHands) {
                this.hit({ isDealer: true });
            } else {
                this.stand();
            }
        },
        // 結束當前回合
        // 根據是否還有其他手牌決定是否繼續遊戲或結束回合
        async endTurn() {
            if (this.activeHandIndex > 0) {
                this.startNextTurn();
            } else {
                this.endRound();
            }
        },
        // 結束這一局遊戲
        // 重置活動手牌 -> 比較手牌 -> 結算手牌 -> 收集贏得的籌碼 -> 重置回合
        async endRound() {
            this.resetActiveHand();
            this.compareHands();
            setTimeout(() => { this.settleHands(); }, DEFAULT_DELAY * 1.5);
            setTimeout(() => { this.collectWinnings(); }, DEFAULT_DELAY * 3.5);
            setTimeout(() => { this.resetRound(); }, DEFAULT_DELAY * 4);
        },

        // 3. 玩家操作

        // 下注
        // 從玩家籌碼中扣除最小下注額，並加入到當前手牌的下注中
        bet() {
            if (this.bank < this.settings.minimumBet) return;
            this.bank -= this.settings.minimumBet;
            const bets = [this.settings.minimumBet];
            this.hands[1].bets = bets.slice();
        },
        // 要牌，給當前手牌發一張牌，檢查結果並決定下一步
        // {onlyOnce: 是否只要一次牌, isDealer: 是否為莊家}
        async hit({ onlyOnce = false, isDealer = false }) {
            this.deal(this.activeHandIndex);
            setTimeout(() => {
                this.checkForBustsAndBlackjacks();
                if (this.activeHand.result || onlyOnce) return this.endTurn();
                if (calculateScore.score(this.activeHand.cards) === 21) return this.endTurn();
                if (isDealer) this.makeDealerDecision();
            }, DEFAULT_DELAY);
        },
        // 雙倍下注，加倍下注後只能再要一張牌
        async doubleDown() {
            this.doubleBet();
            setTimeout(() => { this.hit({ onlyOnce: true }); }, DEFAULT_DELAY);
        },
        // 雙倍下注，在當前手牌中加入與原下注相同的籌碼
        doubleBet() {
            const bets = this.hands[this.activeHandIndex].bets;
            this.bank -= bets[0];
            bets[1] = bets[0];
            this.hands[this.activeHandIndex].bets = bets.slice();
        },
        async callSplit() {
            this.split();
            this.resetActiveHand();
            setTimeout(() => {
                this.startNextTurn();
            }, DEFAULT_DELAY * 2);
        },
        // 分牌，將一對相同點數的牌分成兩手牌分別遊戲
        split() {
            const hands = this.hands.slice();
            hands[2] = clone(BASE_HAND);
            hands[2].cards.push(hands[1].cards.pop());
            hands[2].bets[0] = hands[1].bets[0];
            this.bank -= hands[2].bets[0];
            this.hands = hands;
        },
        // 停牌，結束當前回合
        stand() {
            this.endTurn();
        },

        // 4.遊戲狀態檢查

        // 檢查所有手牌是否有爆牌或黑傑克，並更新結果
        checkForBustsAndBlackjacks() {
            const hands = clone(this.hands);
            for (let i = 0; i < hands.length; i++) {
                const hand = hands[i];
                const total = calculateScore.score(hand.cards);
                if (total > 21) hand.result = BUST;
                if (total === 21 && hand.cards.length === 2) {
                    hand.result = BLACKJACK;
                }
                if (i > 0 && hands[0].result === BLACKJACK) {
                    if (hand.result === BLACKJACK) hand.result = PUSH;
                    if (!hand.result) hand.result = LOSE;
                }
            }
            this.hands = hands;
        },
        // 比較玩家和莊家手牌大小，決定輸贏
        compareHands() {
            const hands = clone(this.hands);
            for (let i = 1; i < hands.length; i++) {
                const hand = hands[i];
                const total = calculateScore.score(hand.cards);
                const dealerTotal = calculateScore.score(hands[0].cards);
                if (dealerTotal === total) hand.result = PUSH;
                if (dealerTotal > 21 && !hand.result) hand.result = WIN;
                if (total > dealerTotal && !hand.result) hand.result = WIN;
                if (dealerTotal > total && !hand.result) hand.result = LOSE;
            }
            this.hands = hands;
        },
        // 根據遊戲結果處理各手牌的籌碼
        settleHands() {
            const hands = clone(this.hands);
            for (let i = 1; i < hands.length; i++) {
                const hand = hands[i];
                if (hand.result === BLACKJACK) {
                    hand.bets = Array(3).fill(hand.bets[0]);
                }
                if (hand.result === WIN) hand.bets.push(...hand.bets);
                if ([LOSE, BUST].includes(hand.result)) hand.bets = [];
            }
            this.hands = hands;
        },
        // 將贏得的籌碼加入玩家的總籌碼中
        collectWinnings() {
            const hands = clone(this.hands);
            for (let i = 1; i < hands.length; i++) {
                const hand = hands[i];
                const winnings = hand.bets.reduce((a, b) => a + b, 0);
                this.bank += winnings;
                hand.bets = [];
            }
            this.hands = hands;
        }
    }
});