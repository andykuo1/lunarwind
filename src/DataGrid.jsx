import { Square } from 'lucide-react';

import { cn } from './libs/react';

/**
 * @param {object} props
 * @param {number} props.rows
 * @param {number} props.cols
 */
export function DataGrid({ rows, cols }) {
  let result = [];
  for (let i = 0; i < rows; ++i) {
    let items = [];
    for (let j = 0; j < cols; ++j) {
      items.push(
        <Square
          key={`${j},${i}`}
          style={{ animationDelay: `${((i + 1) * (10 - j)) % 7}s` }}
          className={cn('inline-block animate-pulse fill-white')}
        />
      );
    }
    result.push(<div key={`row${i}`}>{items}</div>);
  }
  return <div>{result}</div>;
}
