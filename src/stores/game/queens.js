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

    conflicts: {
      rowCounts: {},       // 每行的皇后數量
      colCounts: {},       // 每列的皇后數量
      sectionCounts: {},   // 每區塊的皇后數量
      occupiedCells: new Set()
    }
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

    // 添加皇后到所有追蹤物件
    addQueenToConflicts(row, col) {
      const section = this.boardState[row][col].section;

      // 更新計數
      this.conflicts.rowCounts[row] = (this.conflicts.rowCounts[row] || 0) + 1;
      this.conflicts.colCounts[col] = (this.conflicts.colCounts[col] || 0) + 1;
      this.conflicts.sectionCounts[section] = (this.conflicts.sectionCounts[section] || 0) + 1;

      // 標記格子為佔用
      this.conflicts.occupiedCells.add(gameAction.getCellKey(row, col));
    },

    // 從所有追蹤物件中移除皇后
    removeQueenFromConflicts(row, col) {
      const section = this.boardState[row][col].section;

      // 更新計數
      this.conflicts.rowCounts[row] = Math.max(0, (this.conflicts.rowCounts[row] || 0) - 1);
      this.conflicts.colCounts[col] = Math.max(0, (this.conflicts.colCounts[col] || 0) - 1);
      this.conflicts.sectionCounts[section] = Math.max(0, (this.conflicts.sectionCounts[section] || 0) - 1);

      // 移除格子佔用標記
      this.conflicts.occupiedCells.delete(gameAction.getCellKey(row, col));
    },

    // 檢查單個皇后是否有效
    isQueenValid(row, col) {
      const section = this.boardState[row][col].section;
      return gameAction.isQueenValidWithCounts(row, col, section, this.conflicts);
    },

    // 更新所有皇后的有效性
    updateAllQueensValidation() {
      this.queens.forEach(queen => {
        queen.valid = this.isQueenValid(queen.row, queen.col);
      });
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
        const newQueen = { row: rowIndex, col: cellIndex, valid: true };
        this.queens.push(newQueen);

        // 加入所有追蹤物件
        this.addQueenToConflicts(rowIndex, cellIndex);
        // 驗證所有皇后的有效性
        this.updateAllQueensValidation();

      } else {
        cell.content = null;
        this.queens = this.queens.filter(
          (queen) => queen.row !== rowIndex || queen.col !== cellIndex
        );

        // 從所有追蹤物件中移除
        this.removeQueenFromConflicts(rowIndex, cellIndex);
        // 驗證所有皇后的有效性
        this.updateAllQueensValidation();
      }
    },

    // 清空遊戲板
    // 移除所有內容並清空皇后列表
    clearBoard() {
      this.boardState = this.boardState.map((row) =>
        row.map((cell) => ({ ...cell, content: null }))
      );
      this.queens = [];

      // 清空所有追蹤物件
      this.conflicts.rowCounts = {};
      this.conflicts.colCounts = {};
      this.conflicts.sectionCounts = {};
      this.conflicts.occupiedCells.clear();
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
