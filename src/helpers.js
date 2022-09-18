export const loadImageDataFromFile = (file, callback) => {
  const imageLoadCallback = image => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const { width, height, data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    callback(null, { width, height, data: [...data] });
  };

  const readerLoadCallback = url => {
    const image = new Image();
    image.addEventListener('load', () => imageLoadCallback(image), false);
    image.src = url;
  };

  const reader = new FileReader();
  reader.addEventListener('load', () => readerLoadCallback(reader.result), false);
  reader.readAsText(file);
};

export const exportGridToFile = (grid, width, height, ridius, fileName) => {
  const canvas = document.createElement('canvas');
  canvas.width = ridius * ((width * 2) + 1 + 2);
  canvas.height = ridius * ((height * 2) + 1 + 2);

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  grid.forEach(
    (row, r) => row.forEach(
      (_, c) => {
        const x = (c * 2) + (r & 1 ? 0 : 1);
        const y = r;

        ctx.beginPath();
        ctx.fillStyle = grid[r][c];
        ctx.arc(ridius * (x + 0.5 + 1), ridius * (y + 0.5 + 1), 11, 0, Math.PI * 2);
        ctx.fill();
      }
    )
  );

  const anchor = document.createElement('a');
  anchor.setAttribute('href', canvas.toDataURL('image/png'));
  anchor.setAttribute('download', `${ fileName }.png`);

  anchor.click();
};


export const saveGridToFile = (grid, width, height, fileName) => {
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

  const anchor = document.createElement('a');
  anchor.setAttribute('href', `data:text/plain;charset=utf-8,${ encodeURIComponent(canvas.toDataURL('image/png')) }`);
  anchor.setAttribute('download', `${ fileName }.txt`);

  anchor.click();
};
