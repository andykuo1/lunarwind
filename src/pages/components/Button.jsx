/**
 * @param {object} props
 * @param {import('react').MouseEventHandler} props.onClick
 * @param {import('react').ReactNode} props.children
 */
export function Button({ onClick, children }) {
  return (
    <button
      className="flex items-center gap-2 rounded-xl border p-4 text-xl disabled:opacity-30"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
