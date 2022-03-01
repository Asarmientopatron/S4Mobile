export interface Cell {
  id: string;
  label: string;
  value: (value: string) => string;
  align: 'right'|'left',
  numberOfLines?: number,
  numberOfLinesChild?: number,
  adjustFont?: boolean,
  fontSize?: number,
  width?: number
}