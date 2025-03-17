import { defineStore } from 'pinia';

import gameAction from '@/utils/queens/gameAction';

let timerInterval = null;

export const useQueensStore = defineStore('queens', {
  state: () => ({
    sectionGrid: [], // 遊戲區塊的網格配置
    sectionGridColors: {}, // 每個區塊的顏色配置
    boardState: [], // 遊戲當前狀態
    queens: [], // 已放置的皇后位置集合
    time: 0, // 遊戲計時(秒)
  }),

  getters: {
    // 檢查遊戲是否獲勝
    // 條件: 1.皇后數量等於網格的邊長 2.所有皇后都合法放置(無衝突)
    gameWon(state) {
      if (state.queens.length !== state.sectionGrid.length) {
        return false;
      }
      return state.queens.every((queen) => queen.valid);
    },

    // 將計時轉換為 "分:秒" 格式
    formattedTime() {
      const minutes = Math.floor(this.time / 60)
      const seconds = this.time % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  },

  actions: {
    // 初始化遊戲板
    // 1.隨機生成區塊顏色
    // 2.隨機選擇區塊配置
    // 3.根據配置建立遊戲板初始狀態
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

    // 切換區塊內容
    // 點擊循環: 空 -> 標記 -> 皇后 -> 空
    // 同時維護 queens 陣列和進行驗證
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

    // 驗證整個棋盤狀態
    // 檢查每個皇后的位置是否符合規則:
    // 1.同一行只能有一個皇后
    // 2.同一列只能有一個皇后
    // 3.同一區塊只能有一個皇后 
    // 4.斜線檢查是否有衝突
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

    // 清空遊戲板
    // 移除所有內容並清空皇后列表
    clearBoard() {
      this.boardState = this.boardState.map((row) =>
        row.map((cell) => ({ ...cell, content: null }))
      );
      this.queens = [];
    },

    // 開始計時器
    // 每秒增加計時一次
    startTimer() {
      if (timerInterval) return;
      timerInterval = setInterval(() => {
        this.time++;
      }, 1000);
    },

    // 停止計時器
    stopTimer() {
      clearInterval(timerInterval);
      timerInterval = null;
    },

    // 重置計時器
    // 1.停止當前計時
    // 2.重置時間為0
    // 3.如果沒有運行中的計時器則開始計時
    resetTimer() {
      this.stopTimer();
      this.time = 0;
      if (timerInterval == null) {
        this.startTimer();
      }

    }
  },
});
