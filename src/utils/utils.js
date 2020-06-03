export const initialState = [
  { value: null, index: 0, row: 1 },
  { value: null, index: 1, row: 1 },
  { value: null, index: 2, row: 1 },
  { value: null, index: 3, row: 2 },
  { value: null, index: 4, row: 2 },
  { value: null, index: 5, row: 2 },
  { value: null, index: 6, row: 3 },
  { value: null, index: 7, row: 3 },
  { value: null, index: 8, row: 3 },
];

export const CheckFinished = (state) => {
  return state.find((element) => element.value === null);
};
export const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const condition = (squares, a, b, c) =>
  squares[a].value === squares[b].value &&
  squares[a].value === squares[c].value &&
  squares[a].value !== null &&
  squares[b].value !== null &&
  squares[c].value !== null;

export function calculateWinner(squares) {
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (condition(squares, a, b, c)) {
      console.log("works");
      return { winner: squares[a].value, line: i };
    }
  }
  return null;
}

export function createLine(squares, winner) {
  const line = winningLines[winner?.line];
  return squares.map((element) => {
    if (line?.includes(element.index)) {
      return { ...element, cut: true };
    }
    return element;
  });
}
