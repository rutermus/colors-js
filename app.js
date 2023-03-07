const columns = document.querySelectorAll('.column');
const hoverText = document.querySelectorAll('.hover-text');
const hoverButtons = document.querySelectorAll('.hover-button');

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === 'space') {
    setColumnsColor();
  }
});

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;
  if (type === 'lock') {
    const node =
      event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0];
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  }
  if (type === 'copy') copyToClipboard(event.target.textContent);
});

const setTextColor = (text, color) => {
  const luminance = chroma(color).luminance();
  const newColor =
    luminance > 0.5 ? chroma(color).darken(3) : chroma(color).brighten(3);
  text.style.color = newColor;
};

// const setHoverProperties = (items, colors) => {
//   for (let i = 0; i < items.length; i += 1) {
//     const luminance = chroma(colors[i]).luminance();
//     const currentBgColor = items[i].style.backgroundColor;
//     const currentItemColor = items[i].style.color;

//     items[i].addEventListener('mouseover', () => {
//       items[i].style.backgroundColor =
//         luminance > 0.5
//           ? chroma(colors[i]).darken(3)
//           : chroma(colors[i]).brighten(3);

//       items[i].style.color =
//         luminance > 0.5
//           ? chroma(colors[i]).brighten(1)
//           : chroma(colors[i]).darken(1);
//     });

//     items[i].addEventListener('mouseout', () => {
//       items[i].style.backgroundColor = currentBgColor;
//       items[i].style.color = currentItemColor;
//     });
//   }
// };

const setColumnsColor = (isInitial) => {
  const colors = isInitial ? getColorsFromHash() : [];

  columns.forEach((column, index) => {
    const isLocked = column.querySelector('i').classList.contains('fa-lock');
    const columnHeader = column.querySelector('h2');
    console.log(columnHeader);
    const lockButton = column.querySelector('button');

    if (isLocked) {
      colors.push(columnHeader.textContent);
      return;
    }

    const hexColor = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random().toString().toUpperCase()
      : chroma.random().toString().toUpperCase();

    if (!isInitial) colors.push(hexColor);

    columnHeader.textContent = hexColor;
    column.style.background = hexColor;
    setTextColor(columnHeader, hexColor);
    setTextColor(lockButton, hexColor);
  });
  updateColorsHash(colors);
  // setHoverProperties(hoverText, colors);
  // setHoverProperties(hoverButtons, colors);
  return colors;
};

const copyToClipboard = (text) => {
  return navigator.clipboard.writeText(text);
};

const updateColorsHash = (colors = []) => {
  console.log(document.location);
  document.location.hash = colors
    .map((color) => {
      console.log(color);
      return color.substring(1);
    })
    .join('-');
};

const getColorsFromHash = () => {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((color) => `#${color}`);
  }
  return [];
};

setColumnsColor(true);
