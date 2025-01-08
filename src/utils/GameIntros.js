import queensIcon from '@/assets/queens/queens.svg'
import blackkackIcon from '@/assets/blackjack/blackjack.svg'
import blackjackCover from '@/assets/blackjack/blackjack-cover.png'
import queensCover from '@/assets/queens/queens-cover.png'

export const gameIntros = [
    {
        id: 1,
        routeName: 'blackjack',
        title: 'Black Jack',
        shortDesciption:
            'The goal of Black Jack is to beat the dealer by getting a hand total of 21 or as close to 21 as possible without exceeding it.',
        icon: blackkackIcon,
        cover: blackjackCover,
        modalGameplays: [
            "At the start, players and the dealer receive two cards each, with one of the dealer's cards face down.",
            "Players decide their actions based on their card values.",
            "Drawing cards that total more than 21 means an immediate loss.",
            "Players can stop drawing cards; the dealer then decides whether to draw more.",
            "If the dealer exceeds 21 points, the player wins.",
            "If neither exceeds 21, the highest score wins."
        ],
        modalGameRules: [
            "Aces can be worth 1 or 11 points, depending on which value keeps the total score ≤ 21.",
            "Cards 2-10 are face value.",
            "Jacks, Queens, and Kings are 10 points.",
            "'Hit' adds a card to your hand.",
            "'Stand' ends your turn.",
            "'Split' allows you to divide two identical cards into separate hands.",
            "'Double Down' means doubling your bet and drawing one more card."
        ],
    },
    {
        id: 2,
        routeName: 'queens',
        title: 'Queens',
        shortDesciption:
            'The goal of Queens is to have exactly one crown in each row, column, and color region.',
        icon: queensIcon,
        cover: queensCover,
        modalGameplays: [
            "Tap once to place an X, then tap again to place a crown.",
            "Use X to mark where crowns cannot go."
        ],
        modalGameRules: [
            "You can only have one crown per row.",
            "You can only have one crown per column.",
            "You can only have one crown per colored section.",
            "Crowns can’t touch each other, not even diagonally.",
        ],
    },
    // {
    //     id: 2,
    //     routeName: 'queens',
    //     title: 'Queens',
    //     shortDesciption:
    //         'The goal of Queens is to have exactly one crown in each row, column, and color region.',
    //     icon: queensIcon,
    //     cover: queensCover,
    //     modalGameplays: [
    //         "Tap once to place an X, then tap again to place a crown.",
    //         "Use X to mark where crowns cannot go."
    //     ],
    //     modalGameRules: [
    //         "You can only have one crown per row.",
    //         "You can only have one crown per column.",
    //         "You can only have one crown per colored section.",
    //         "Crowns can’t touch each other, not even diagonally.",
    //     ],
    // },
]