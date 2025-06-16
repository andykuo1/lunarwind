export function GoldFishTableLayout() {
  return (
    <GreenTable>
      <SeatsAround seat={(pos) => <OpponentHand x={pos[0]} y={pos[1]} />} />
      <PlayerHand max={Number.POSITIVE_INFINITY} />
    </GreenTable>
  );
}

export function GoldFishSetup() {}
