
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

function isQueenValidWithCounts(row, col, section, conflicts) {
    // 檢查行、列、區塊和緊鄰對角線
    return (conflicts.rowCounts[row] || 0) <= 1 &&
        (conflicts.colCounts[col] || 0) <= 1 &&
        (conflicts.sectionCounts[section] || 0) <= 1 &&
        !hasAdjacentDiagonalConflict(row, col, conflicts.occupiedCells);
}

// 檢查緊鄰對角線是否有衝突
function hasAdjacentDiagonalConflict(row, col, occupiedCells) {
    // 四個對角方向
    const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

    for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;

        // 檢查範圍
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            // 檢查該位置是否有皇后
            if (occupiedCells.has(`${newRow},${newCol}`)) {
                return true;
            }
        }
    }
    return false;
}

// 生成格子的位址
function getCellKey(row, col) {
    return `${row},${col}`;
}

export default { getRandomSectionGrid, getRandomSectionGridColors, isQueenValidWithCounts, hasAdjacentDiagonalConflict, getCellKey }