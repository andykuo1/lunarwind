import { createContext, useContext, useRef, useState } from 'react';

const HandspaceContext = createContext(
  /** @type {ReturnType<useHandspaceContextAPI>|null} */ (null)
);

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 */
export function HandspaceContainer({ children }) {
  const { containerRef } = useHandspace();
  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute bottom-0 left-0 right-0 select-none"
    >
      {children}
    </div>
  );
}

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 */
export function HandspaceProvider({ children }) {
  const api = useHandspaceContextAPI();
  return (
    <HandspaceContext.Provider value={api}>
      {children}
    </HandspaceContext.Provider>
  );
}

export function useHandspace() {
  let ctx = useContext(HandspaceContext);
  if (!ctx) {
    throw new Error(
      'Context not found for ancestor - are we missing the provider?'
    );
  }
  return ctx;
}

function useHandspaceContextAPI() {
  const containerRef = useRef(/** @type {HTMLDivElement|null} */ (null));
  const handlerStateRef = useRef(
    /** @type {Partial<import('./UseOnDragMoveHandler').DragHandlerState>} */ ({})
  );
  const [anyGrabbing, setAnyGrabbing] = useState(false);
  return {
    containerRef,
    handlerStateRef,
    anyGrabbing,
    setAnyGrabbing,
  };
}
