import { createSlice } from '@reduxjs/toolkit';
import { normalizeColor } from './helpers';

export const slice = createSlice({
  name: 'main',
  initialState: {
    grid: [],
    width: 0,
    height: 0,
    isPickerOpen: false,
    pickerPosition: { r: 0, c: 0 },
    activeColor: '#581c87',
    colors: ['#cccccc']
  },
  reducers: {
    initGrid: (state, { payload }) => {
      const { width, height, color } = payload;
      const _color = normalizeColor(color);

      state.isPickerOpen = false;

      if (width === 0 || height === 0) {
        state.width = 0;
        state.height = 0;
        state.grid = [];
      } else {
        state.width = width;
        state.height = height;
        state.grid = Array.from(
          Array((height * 2) + 1),
          (_, r) => Array.from(
            Array(width + (r & 1)),
            () => _color
          )
        );
      }
    },

    initGridWithImageData: (state, { payload }) => {
      const width = payload.width - 1;
      const height = (payload.height - 1) / 2;
      const data = payload.data;

      state.width = width;
      state.height = height;
      state.grid = Array.from(
        Array((height * 2) + 1),
        (_, r) => Array.from(
          Array(width + (r & 1)),
          (_, c) => {
            const pointer = ((r * (width + 1)) + c) * 4;
            return normalizeColor(`rgb(${ data[pointer] }, ${ data[pointer + 1] }, ${ data[pointer + 2] })`);
          }
        )
      );
    },

    openPicker: (state, { payload }) => {
      const { r, c } = payload;

      state.isPickerOpen = true;
      state.pickerPosition = { r, c };
    },

    closePicker: state => {
      const colors = state.colors.filter(color => color !== state.activeColor);
      colors.unshift(state.activeColor);

      state.isPickerOpen = false;
      state.colors = colors.slice(0, 5);
    },

    setActiveColor: (state, { payload }) => {
      state.activeColor = normalizeColor(payload);
    },

    setDot: (state, { payload }) => {
      const { r, c } = payload;

      state.grid[r][c] = state.activeColor;
    },
  }
});

export const {
  initGrid,
  initGridWithImageData,
  openPicker,
  closePicker,
  setActiveColor,
  setDot
} = slice.actions;

export default slice.reducer;
