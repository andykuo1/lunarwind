import { OpenPackScreen } from '@/card/OpenPackScreen';

export function StorePage() {
  return (
    <>
      <h1>Store</h1>
      <div className="absolute bottom-0 left-0 right-0 top-0">
        <OpenPackScreen />
      </div>
    </>
  );
}
