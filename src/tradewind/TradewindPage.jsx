import { DialogueScreen } from './DialogueScreen';
import { InvContainer } from './InvScreen';
import { createMarket, createTrader, TradeScreen } from './TradeScreen';

export function TradewindPage() {
  return (
    <>
      <h1>Tradewind!</h1>
      <div className="flex">
        <TradeScreen trader={createTrader()} market={createMarket()} />
        <div className="flex flex-col">
          <MapScreen placeMap={createPlaceMap()} currentPlaceName="home" />
          <InventoryScreen />
          <InvContainer rows={7} cols={5} />
        </div>
      </div>
      {/*<DialogueScreen />*/}
    </>
  );
}

/** @typedef {ReturnType<createPlace>} Place */

/**
 * @param {string} placeName
 */
function createPlace(placeName) {
  return {
    placeName,
    coords: [Math.floor(Math.random() * 60), Math.floor(Math.random() * 60)],
  };
}

/** @typedef {ReturnType<createPlaceMap>} PlaceMap */

function createPlaceMap() {
  return {
    /** @type {Record<string, Place>} */
    places: {
      home: createPlace('Home'),
      bobsHouse: createPlace(`Bob's`),
      alicesBackyard: createPlace(`Alice's`),
      capitalCity: createPlace(`Capital`),
      georgia: createPlace(`Georgia`),
    },
  };
}

/**
 * @param {object} props
 * @param {PlaceMap} props.placeMap
 * @param {string} props.currentPlaceName
 */
function MapScreen({ placeMap, currentPlaceName }) {
  return (
    <fieldset className="font-mono">
      <legend>World Map</legend>
      <table className="border">
        <thead>
          <th></th>
          <th>Distance</th>
          <th>Go!</th>
        </thead>
        <tbody>
          {Object.values(placeMap.places).map((place) => (
            <MapPlaceEntryFromPlace
              currentPlace={placeMap.places[currentPlaceName]}
              destinationPlace={place}
            />
          ))}
        </tbody>
      </table>
    </fieldset>
  );
}

/**
 * @param {number} fromX
 * @param {number} fromY
 * @param {number} toX
 * @param {number} toY
 */
function distance(fromX, fromY, toX, toY) {
  let dx = toX - fromX;
  let dy = toY - fromY;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * @param {object} props
 * @param {Place} [props.currentPlace]
 * @param {Place} [props.destinationPlace]
 */
function MapPlaceEntryFromPlace({ currentPlace, destinationPlace }) {
  return (
    <MapPlaceEntry
      placeName={destinationPlace?.placeName}
      distance={distance(
        currentPlace?.coords[0] ?? 0,
        currentPlace?.coords[1] ?? 0,
        destinationPlace?.coords[0] ?? 0,
        destinationPlace?.coords[1] ?? 0
      )}
    />
  );
}

/**
 * @param {object} props
 * @param {string} [props.placeName]
 * @param {number} [props.distance]
 */
function MapPlaceEntry({ placeName = '???', distance = 0 }) {
  return (
    <tr>
      <th className="w-40">{placeName}</th>
      <td className="px-4">{formatDistanceDisplay(distance)}</td>
      <td>
        <button>{'»'}</button>
      </td>
    </tr>
  );
}

const MILE1_FEATURES = ['⚘', '.', '.'];
const MILE2_FEATURES = ['🌲', '🌳', '🪨'];
/**
 * @param {number} distance
 */
function formatDistanceDisplay(distance) {
  let value = `${Math.round(distance)}m`;
  let length = Math.ceil(distance / 5);
  let result = new Array(length).fill('_');
  // Mile1 Features
  if (length > 4) {
    for (let i = 0; i < length / 2; ++i) {
      let r = Math.random();
      let c = MILE1_FEATURES[Math.floor(r * MILE1_FEATURES.length)];
      r = Math.random();
      let i = Math.min(result.length - 2, Math.floor(r * result.length) + 1);
      result[i] = c;
    }
  }
  // Mile2 Features
  if (length > 6) {
    for (let i = 0; i < length / 4; ++i) {
      let r = Math.random();
      let c = MILE2_FEATURES[Math.floor(r * MILE2_FEATURES.length)];
      r = Math.random();
      let i = Math.min(result.length - 2, Math.floor(r * result.length) + 2);
      result[i] = c;
    }
  }
  result.push('⚑');
  return result.join('') + ' ' + value;
}

function InventoryScreen() {
  return (
    <fieldset>
      <legend>My Wagon</legend>
    </fieldset>
  );
}

/**
 * Location office
 * - To buy / sell stuff
 * My Wagon
 * - To look at inventory
 * - To keep money
 * My Map
 * - To travel to the next office
 */
