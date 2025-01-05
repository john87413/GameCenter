
import { easy, medium, hard } from '@/lib/queens/data/sectionGrid';
import { cellColors } from '@/lib/queens/data/cellColors.js'

// 取得隨機棋盤
function getRandomSectionGrid() {
    const grids = [easy, medium, hard];
    const randomIndex = Math.floor(Math.random() * grids.length);
    return grids[randomIndex];
}

// 取得隨機棋盤顏色
function getRandomSectionGridColors() {
    const newCellColors = Object.entries(cellColors)
        .sort(() => Math.random() - 0.5)
        .slice(0, 8)
        .reduce((acc, [, value], index) => {
            acc[`${index + 1}`] = value
            return acc
        }, {})
    return newCellColors;
}

// 驗證特定行是否有衝突
function validateRow(queens, rowIndex) {
    const queensInRow = queens.filter((queen) => queen.row === rowIndex);
    return queensInRow.length <= 1;
}

// 驗證特定列是否有衝突
function validateColumn(queens, columnIndex) {
    const queensInColumn = queens.filter((queen) => queen.col === columnIndex);
    return queensInColumn.length <= 1;
}

// 驗證特定區塊是否有衝突
function validateSection(boardState, queens, section) {
    const queensInSection = queens.filter((queen) => {
        const { row, col } = queen;
        return boardState[row][col].section === section;
    });
    return queensInSection.length <= 1;
}

// 驗證是否有對角線衝突
function checkDiagonalConflicts(boardState, queens, queen) {
    const directions = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
    ];

    for (const [dx, dy] of directions) {
        const newRow = queen.row + dx;
        const newCol = queen.col + dy;
        if (
            newRow >= 0 &&
            newRow < boardState.length &&
            newCol >= 0 &&
            newCol < boardState[0].length
        ) {
            if (queens.some((q) => q.row === newRow && q.col === newCol)) {
                return false;
            }
        }
    }
    return true;
}

export default { getRandomSectionGrid, getRandomSectionGridColors, validateRow, validateColumn, validateSection, checkDiagonalConflicts }