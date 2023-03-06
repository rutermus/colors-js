const columns = document.querySelectorAll('.column');
const colors = [];
const hoverText = document.querySelectorAll('.hover-text');
const hoverButtons = document.querySelectorAll('.hover-button');

const setTextColor = (text, color) => {
  const luminance = chroma(color).luminance();
  const newColor =
    luminance > 0.5 ? chroma(color).darken(2) : chroma(color).brighten(2);
  text.style.color = newColor;
};

const setColumnsColor = () => {
  columns.forEach((column) => {
    const hexColor = chroma.random().toString().toUpperCase();

    const columnHeader = column.querySelector('h2');
    const lockButton = column.querySelector('button');

    colors.push(hexColor);
    columnHeader.textContent = hexColor;
    column.style.background = hexColor;
    setTextColor(columnHeader, hexColor);
    setTextColor(lockButton, hexColor);
  });
};

const setHoverProperties = (items) => {
  for (let i = 0; i < items.length; i += 1) {
    const luminance = chroma(colors[i]).luminance();
    const currentBgColor = items[i].style.backgroundColor;
    const currentItemColor = items[i].style.color;

    items[i].addEventListener('mouseover', () => {
      items[i].style.backgroundColor =
        luminance > 0.5
          ? chroma(colors[i]).darken(3)
          : chroma(colors[i]).brighten(3);

      items[i].style.color =
        luminance > 0.5
          ? chroma(colors[i]).brighten(1)
          : chroma(colors[i]).darken(1);
    });

    items[i].addEventListener('mouseout', () => {
      items[i].style.backgroundColor = currentBgColor;
      items[i].style.color = currentItemColor;
    });
  }
};

setColumnsColor();
setHoverProperties(hoverText);
setHoverProperties(hoverButtons);
