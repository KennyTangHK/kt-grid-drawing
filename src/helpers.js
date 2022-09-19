const localStorageKey = 'grid';

const loadTextFromFileAsync = file => new Promise(
  (resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.addEventListener('error', err => reject(err), false);
    reader.readAsText(file);
  }
); 

const loadImageFromDataUrlAsync = dataUrl => new Promise(
  (resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image), false);
    image.addEventListener('error', err => reject(err), false);
    image.src = dataUrl;
  }
);

const getImageDataFromImage = image => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  const { width, height, data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return { width, height, data: [...data] };
};

export const loadImageDataFromFileAsync = async file => {
  const dataUrl = await loadTextFromFileAsync(file);
  const image = await loadImageFromDataUrlAsync(dataUrl);

  return getImageDataFromImage(image);
};

export const loadImageDataFromLocalStorageAsync = async () => {
  const dataUrl = localStorage.getItem(localStorageKey);
  const image = await loadImageFromDataUrlAsync(dataUrl);

  return getImageDataFromImage(image);
};

export const saveDataUrlToLocalStorage = dataUrl => localStorage.setItem(localStorageKey, dataUrl);

export const exportGridToDataUrl = (grid, width, height, ridius) => {
  const canvas = document.createElement('canvas');

  const diameter = ridius * 2;
  canvas.width = diameter * ((width * 2) + 1 + 2);
  canvas.height = diameter * ((height * 2) + 1 + 2);

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  grid.forEach(
    (row, r) => row.forEach(
      (_, c) => {
        const x = (c * 2) + (r & 1 ? 0 : 1);
        const y = r;

        ctx.fillStyle = grid[r][c];
        ctx.beginPath();
        ctx.arc(
          diameter * (x + 0.5 + 1),
          diameter * (y + 0.5 + 1),
          ridius * 1.1,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    )
  );

  return canvas.toDataURL('image/png');
};

export const saveGridToDataUrl = (grid, width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width + 1;
  canvas.height = (height * 2) + 1;

  const ctx = canvas.getContext('2d');

  grid.forEach(
    (row, r) => row.forEach(
      (_, c) => {
        ctx.fillStyle = grid[r][c];
        ctx.fillRect(c, r, 1, 1);
      }
    )
  );

  return `data:text/plain;charset=utf-8,${ encodeURIComponent(canvas.toDataURL('image/png')) }`;
};

export const downloadDataUrl = (dataUrl, fileName) => {
  const anchor = document.createElement('a');
  anchor.setAttribute('href', dataUrl);
  anchor.setAttribute('download', fileName);
  anchor.click();
};
