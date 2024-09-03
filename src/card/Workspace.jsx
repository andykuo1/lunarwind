import { createContext, useContext, useRef } from 'react';

const WorkspaceContext = createContext(
  /** @type {ReturnType<useWorkspaceContextAPI>|null} */ (null)
);

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 */
export function Workspace({ children }) {
  return (
    <WorkspaceProvider>
      <WorkspaceContainer>{children}</WorkspaceContainer>
    </WorkspaceProvider>
  );
}

export function useWorkspace() {
  let ctx = useContext(WorkspaceContext);
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
function WorkspaceProvider({ children }) {
  const api = useWorkspaceContextAPI();
  return (
    <WorkspaceContext.Provider value={api}>
      {children}
    </WorkspaceContext.Provider>
  );
}

function useWorkspaceContextAPI() {
  const containerRef = useRef(/** @type {HTMLDivElement|null} */ (null));
  return {
    containerRef,
  };
}

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 */
function WorkspaceContainer({ children }) {
  const { containerRef } = useWorkspace();
  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 top-0 bg-red-800"
    >
      {children}
    </div>
  );
}
