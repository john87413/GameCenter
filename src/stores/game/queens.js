import { defineStore } from 'pinia';
import gameAction from '@/lib/queens/gameAction';

let timerInterval = null;

export const useQueensStore = defineStore('queens', {
  state: () => ({
    sectionGrid: [],
    sectionGridColors: {},
    boardState: [],
    queens: [],
    time: 0,
  }),

  getters: {
    gameWon(state) {
      if (state.queens.length !== state.sectionGrid.length) {
        return false;
      }
      return state.queens.every((queen) => queen.valid);
    },

    formattedTime() {
      const minutes = Math.floor(this.time / 60)
      const seconds = this.time % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  },

  actions: {
    // 初始化遊戲板
    createBoard() {
      this.sectionGridColors = gameAction.getRandomSectionGridColors();
      this.sectionGrid = gameAction.getRandomSectionGrid();
      this.boardState = this.sectionGrid.map((row) =>
        row.map((section) => ({
          content: null,
          section,
        }))
      );
    },

    // 切換單元格的內容
    toggleCell(rowIndex, cellIndex) {
      const cell = this.boardState[rowIndex][cellIndex];

      if (!cell.content) {
        cell.content = 'marked';
      } else if (cell.content === 'marked') {
        cell.content = 'queen';
        this.queens.push({ row: rowIndex, col: cellIndex, valid: true });
      } else {
        this.queens = this.queens.filter(
          (queen) => queen.row !== rowIndex || queen.col !== cellIndex
        );
        cell.content = null;
      }

      this.validateBoard();
    },

    // 驗證整個棋盤的狀態
    validateBoard() {
      this.queens.forEach((queen) => {
        const { row, col } = queen;
        const cell = this.boardState[row][col];
        const rowValid = gameAction.validateRow(this.queens, row);
        const columnValid = gameAction.validateColumn(this.queens, col);
        const sectionValid = gameAction.validateSection(this.boardState, this.queens, cell.section);
        const diagonalValid = gameAction.checkDiagonalConflicts(this.boardState, this.queens, queen);
        queen.valid = rowValid && columnValid && sectionValid && diagonalValid;
      });
    },

    // 清空棋盤
    clearBoard() {
      this.boardState = this.boardState.map((row) =>
        row.map((cell) => ({ ...cell, content: null }))
      );
      this.queens = [];
    },

    startTimer() {
      if (timerInterval) return;
      timerInterval = setInterval(() => {
        this.time++;
      }, 1000);
    },

    stopTimer() {
      clearInterval(timerInterval);
      timerInterval = null;
    },

    resetTimer() {
      this.stopTimer();
      this.time = 0;
      if (timerInterval == null) {
        this.startTimer();
      }

    }
  },
});
