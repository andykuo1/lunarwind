/**
 * @param {object} props
 * @param {number} props.width
 * @param {number} props.height
 */
export function Inventory({ width, height }) {
  const size = 52;
  let result = [];
  for (let i = 0; i < width; ++i) {
    for (let j = 0; j < height; ++j) {
      result.push(<InventorySlot x={i} y={j} />);
    }
  }
  return (
    <div
      style={{
        width: `${width * size}px`,
        height: `${height * size}px`,
      }}
      className="relative"
    >
      {result}
    </div>
  );
}

/**
 * @param {object} props
 * @param {number} props.x
 * @param {number} props.y
 */
export function InventorySlot({ x, y }) {
  const size = 52;
  return (
    <button
      style={{
        left: `${x * size}px`,
        top: `${y * size}px`,
        width: `${size - 1}px`,
        height: `${size - 1}px`,
      }}
      className="absolute bg-red-300/30 hover:bg-red-100/60"
    ></button>
  );
}
