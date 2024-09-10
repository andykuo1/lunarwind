import { createContext, useContext, useRef } from 'react';

const PlayspaceContext = createContext(
  /** @type {ReturnType<usePlayspaceContextAPI>|null} */ (null)
);

export function usePlayspace() {
  let ctx = useContext(PlayspaceContext);
  if (!ctx) {
    throw new Error(
      'Context not found for ancestor - are we missing the provider?'
    );
  }
  return ctx;
}

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 */
export function PlayspaceProvider({ children }) {
  const api = usePlayspaceContextAPI();
  return (
    <PlayspaceContext.Provider value={api}>
      {children}
    </PlayspaceContext.Provider>
  );
}

function usePlayspaceContextAPI() {
  const containerRef = useRef(/** @type {HTMLDivElement|null} */ (null));
  const handlerStateRef = useRef(
    /** @type {Partial<import('./UseOnDragMoveHandler').DragHandlerState>} */ ({})
  );
  return {
    containerRef,
    handlerStateRef,
  };
}
