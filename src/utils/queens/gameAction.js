
import { easy, medium, hard } from '@/utils/queens/data/sectionGrid';
import { cellColors } from '@/utils/queens/data/cellColors.js'

// 取得隨機棋盤
function getRandomSectionGrid() {
    const grids = [easy, medium, hard];
    const randomIndex = Math.floor(Math.random() * grids.length);
    return grids[randomIndex];
}

// 取得隨機棋盤顏色
// 隨機排序後取前8個顏色，並將其映射到1-8的區塊編號
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
    // 計算在該行中的皇后數量
    const queensInRow = queens.filter((queen) => queen.row === rowIndex);
    return queensInRow.length <= 1;
}

// 驗證特定列是否有衝突
function validateColumn(queens, columnIndex) {
    // 計算在該列中的皇后數量
    const queensInColumn = queens.filter((queen) => queen.col === columnIndex);
    return queensInColumn.length <= 1;
}

// 驗證特定區塊是否有衝突
function validateSection(boardState, queens, section) {
    // 計算在該區塊中的皇后數量
    const queensInSection = queens.filter((queen) => {
        const { row, col } = queen;
        return boardState[row][col].section === section;
    });
    return queensInSection.length <= 1;
}

// 檢查是否有對角線衝突
function checkDiagonalConflicts(boardState, queens, queen) {
    // 定義四個對角線方向：左上、右上、左下、右下
    const directions = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
    ];

    for (const [dx, dy] of directions) {
        const newRow = queen.row + dx;
        const newCol = queen.col + dy;

        // 檢查此位置是否在棋盤範圍內
        if (
            newRow >= 0 &&
            newRow < boardState.length &&
            newCol >= 0 &&
            newCol < boardState[0].length
        ) {
            // 檢查對角線位置是否有其他皇后
            if (queens.some((q) => q.row === newRow && q.col === newCol)) {
                return false;
            }
        }
    }
    return true;
}

export default { getRandomSectionGrid, getRandomSectionGridColors, validateRow, validateColumn, validateSection, checkDiagonalConflicts }