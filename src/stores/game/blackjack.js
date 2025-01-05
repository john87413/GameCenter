import { defineStore } from 'pinia'
import createGame from '@/lib/blackjack/createGame';
import { results } from '@/lib/blackjack/data/result';
import calculateScore from '@/lib/blackjack/calculateScore';

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
            deckCount: 6, // number of deck 幾副牌
            startingBank: 30, // initial bank 初始籌碼
            shuffleAfterPercent: 0.75, // reshuffle after this percent 使用的牌數百分比底線
            minimumBet: 1 // minimum bet amount 最低下注金額
        },
        bank: 0,
        shoe: [],
        hands: [],
        activeHandIndex: null,
        showDrawer: false
    }),

    getters: {
        activeHand(state) {
            return state.hands[state.activeHandIndex];
        },
        dealerTotal(state) {
            if (!state.hands.length) return;
            return calculateScore.score(state.hands[0].cards);
        },
        isSplit(state) {
            return state.hands.length > 2;
        },
        canSplit(state) {
            if (state.bank < state.settings.minimumBet) return false;
            if (!state.hands.length || state.activeHandIndex === null) return false;
            if (state.hands.length > 2) return false;
            const cards = state.hands[state.activeHandIndex].cards;
            return cards.length === 2 && cards[0].value === cards[1].value;
        },
        canDoubleDown(state) {
            if (state.bank < state.settings.minimumBet) return false;
            if (!state.hands.length || state.activeHandIndex === null) return false;
            const cards = state.hands[state.activeHandIndex].cards;
            return cards.length === 2;
        },
        isGameOver(state) {
            if (!state.hands.length) return false;
            const cards = state.hands.map(hand => hand.cards.length).reduce((a, b) => a + b);
            const bets = state.hands[1].bets.length;
            return state.bank < state.settings.minimumBet && !bets && !cards && !state.isDealing;
        }
    },

    actions: {
        toggleDrawer(show) {
            this.showDrawer = show === undefined ? !this.showDrawer : show;
        },
        /**
         * Resets the shoe by creating a new shoe with the specified deck count and shuffling it.
         * 創建初始牌組並洗牌
         * 
         * @return {void} 
         */
        resetShoe() {
            this.shoe = createGame.createShoe(this.settings.deckCount);
            this.shoe = createGame.shuffle(this.shoe);
        },
        /**
         * Resets the bank by setting it to the starting bank value specified in the settings.
         * 設定初始籌碼 
         * 
         * @return {void}
         */
        resetBank() {
            this.bank = this.settings.startingBank;
        },
        /**
         * Resets the hands of the game by creating two new hands with the same base configuration.
         *
         * @return {void} 
         */
        resetHands() {
            this.hands = [clone(BASE_HAND), clone(BASE_HAND)];
        },
        /**
         * Decrements the bank by the minimum bet amount, creates a new bet array with the minimum bet value,
         * and assigns the bet array to the second hand's bets property.
         *
         * @return {void}
         */
        bet() {
            if (this.bank < this.settings.minimumBet) return;
            this.bank -= this.settings.minimumBet;
            const bets = [this.settings.minimumBet];
            this.hands[1].bets = bets.slice();
        },
        doubleBet() {
            const bets = this.hands[this.activeHandIndex].bets;
            this.bank -= bets[0];
            bets[1] = bets[0];
            this.hands[this.activeHandIndex].bets = bets.slice();
        },
        /**
         * Deals a card from shoe to the specified hand.
         * First card for dealer is always face down.
         * 從牌組中拿牌給指定的玩家，第一張牌面朝下
         * 
         * @param {number} handIndex - The index of the hand to deal the card to.
         * @return {void}
         */
        deal(handIndex) {
            const hand = this.hands[handIndex];
            let newCard = this.shoe.shift();
            const isFirstDealerCard = handIndex === 0 && hand.cards.length === 0;
            newCard.isFaceDown = isFirstDealerCard;
            hand.cards.push(newCard);
        },
        split() {
            const hands = this.hands.slice();
            hands[2] = clone(BASE_HAND);
            hands[2].cards.push(hands[1].cards.pop());
            hands[2].bets[0] = hands[1].bets[0];
            this.bank -= hands[2].bets[0];
            this.hands = hands;
        },
        /**
         * Checks each hand in the game for busts and blackjacks.
         * 
         * @return {void}
         */
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
        /**
         * Compares each hand in the game with the dealer's hand and updates the result of each hand.
         * 
         * @return {void}
         */
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
        /**
         * Settles the hands in the game by updating the bets based on the result of each hand.
         *
         * @return {void}
         */
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
        /**
         * Collects the winnings from all the player's hands in the game.
         * Reset the bets for player's hand.
         *
         * @return {void}
         */
        collectWinnings() {
            const hands = clone(this.hands);
            for (let i = 1; i < hands.length; i++) {
                const hand = hands[i];
                const winnings = hand.bets.reduce((a, b) => a + b, 0);
                this.bank += winnings;
                hand.bets = [];
            }
            this.hands = hands;
        },
        revealDealerHand() {
            this.hands[0].cards[0].isFaceDown = false;
        },
        advanceActiveHand() {
            if (this.activeHandIndex > 0) this.activeHandIndex--;
            if (this.activeHandIndex === null) this.activeHandIndex = this.hands.length - 1;
        },
        resetActiveHand() {
            this.activeHandIndex = null;
        },
        /**
         * Starts a new game by resetting the shoe, bank, and round.
         * 設定初始牌組以及籌碼，並且設定初始回合
         * 
         * @return {Promise<void>} A promise that resolves when the round is reset.
         */
        async startNewGame() {
            this.resetActiveHand()
            this.resetShoe();
            this.resetBank();
            await this.resetRound();
        },
        /**
         * Resets the round by resetting hands, reshuffling the deck if needed, 
         * placing a bet, and dealing the initial cards.
         * 重置手牌，如果需要，重新打亂牌組
         * 設置籌碼，並且設置初始回合
         *
         * @return {Promise<void>} A promise that resolves when the round is reset.
         */
        async resetRound() {
            this.resetHands();
            await this.reshuffleIfNeeded();
            this.bet();
            await this.dealRound();
        },
        /**
         * Checks if the shoe needs to be reshuffled and reshuffles it if necessary.
         * 計算一副牌的使用百分比，如果使用的牌數百分比大於或等於指定的值，則重置牌堆。
         * 
         * @return {void}
         */
        reshuffleIfNeeded() {
            const shoeUsedPercent = 1 - (this.shoe.length / (this.settings.deckCount * 52));
            if (shoeUsedPercent >= this.settings.shuffleAfterPercent) {
                this.resetShoe();
            }
        },
        /**
         * Checks if the player has placed a bet.
         * If a bet has been placed, iterates over the deal queue and uses setTimeout to deal the cards with a delay
         * After all the cards have been dealed, it calls the startRound function after a delay
         * 檢查玩家是否下注。
         * 如果玩家已經下注，便開始發牌，然後執行第一輪的判斷。
         * 
         * @return {Promise<void>} A promise that resolves when the round is dealt.
         */
        async dealRound() {
            if (!this.hands[1].bets[0]) return; // must have a bet to deal round
            const dealQueue = [1, 0, 1, 0]; // player, dealer, player, dealer
            for (let i = 0; i < dealQueue.length; i++) {
                setTimeout(() => { this.deal(dealQueue[i]); }, DEFAULT_DELAY * (i + 2));
            }
            setTimeout(() => { this.startRound(); }, DEFAULT_DELAY * 6);
        },
        /**
         * Executes a round of the game by checking for busts and blackjacks, 
         * if a result exists, reveal the dealer's hand and end the round, 
         * or starting the next turn.
         *
         * @return {Promise<void>} A promise that resolves when the round is completed.
         */
        async startRound() {
            this.checkForBustsAndBlackjacks();
            if (this.hands.find(hand => hand.result)) {
                this.revealDealerHand();
                await this.endRound();
            } else {
                await this.startNextTurn();
            }
        },
        /**
         * Active hand
         * If active hand is zero, reveal the dealer's hand and make the dealer's decision.
         *
         * @return {Promise<void>} A promise that resolves when the next turn is started.
         */
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
        /**
         * Makes a decision for the dealer based on the current game state.
         *
         * @return {void}
         */
        makeDealerDecision() {
            const remainingHands = this.hands.find((hand, i) => !hand.result && i > 0);
            if (this.dealerTotal < 17 && remainingHands) {
                this.hit({ isDealer: true });
            } else {
                this.stand();
            }
        },
        /**
         * Asynchronously hits the active hand and performs necessary actions.
         *
         * @param {boolean} [options.onlyOnce=false] - Whether to only hit once.
         * @param {boolean} [options.isDealer=false] - Whether the hit is for the dealer.
         * @return {Promise<void>} A promise that resolves when the hit is complete.
         */
        async hit({ onlyOnce = false, isDealer = false }) {
            this.deal(this.activeHandIndex);
            setTimeout(() => {
                this.checkForBustsAndBlackjacks();
                if (this.activeHand.result || onlyOnce) return this.endTurn();
                if (calculateScore.score(this.activeHand.cards) === 21) return this.endTurn();
                if (isDealer) this.makeDealerDecision();
            }, DEFAULT_DELAY);
        },
        async doubleDown() {
            this.doubleBet();
            setTimeout(() => { this.hit({ onlyOnce: true }); }, DEFAULT_DELAY);
        },
        async callSplit() {
            this.split();
            this.resetActiveHand();
            setTimeout(() => {
                this.startNextTurn();
            }, DEFAULT_DELAY * 2);
        },
        stand() {
            this.endTurn();
        },
        /**
         * Asynchronously ends the current turn by starting the next turn if the active hand index is greater than 0,
         * otherwise ends the round.
         *
         * @return {Promise<void>} A promise that resolves when the turn is ended.
         */
        async endTurn() {
            if (this.activeHandIndex > 0) {
                this.startNextTurn();
            } else {
                this.endRound();
            }
        },
        /**
         * Asynchronously ends the current round of the game by performing the following steps:
         * 1. Resets the active hand.
         * 2. Compares the hands.
         * 3. Settles the hands after a delay of 1.5 times the default delay.
         * 4. Collects winnings after a delay of 3.5 times the default delay.
         * 5. Resets the round after a delay of 4 times the default delay.
         *
         * @return {Promise<void>} A promise that resolves when the round has ended.
         */
        async endRound() {
            this.resetActiveHand();
            this.compareHands();
            setTimeout(() => { this.settleHands(); }, DEFAULT_DELAY * 1.5);
            setTimeout(() => { this.collectWinnings(); }, DEFAULT_DELAY * 3.5);
            setTimeout(() => { this.resetRound(); }, DEFAULT_DELAY * 4);
        },
        start() {
            this.startNewGame();
        }
    }
});