import { cuid } from '@/libs/math';
import { attachZustyUpgradeSchema } from '@/libs/zusty';

/** @typedef {ReturnType<createStore>} Store */

/** @typedef {string} SessionId */
/** @typedef {ReturnType<createSession>} Session */

/** @typedef {string} UserId */
/** @typedef {ReturnType<createUser>} User */

/** @typedef {string} CollectionId */
/** @typedef {ReturnType<createCollection>} Collection */
/** @typedef {ReturnType<createCollectionCard>} CollectionCard */
/** @typedef {ReturnType<createCollectionPack>} CollectionPack */

/** @typedef {string} PlayId */
/** @typedef {ReturnType<createPlay>} Play */

/** @typedef {string} PlayCardId */
/** @typedef {ReturnType<createPlayCard>} PlayCard */

/** @typedef {string} HandId */
/** @typedef {ReturnType<createHand>} Hand */

/** @typedef {string} HandCardId */
/** @typedef {ReturnType<createHandCard>} HandCard */

/** @typedef {string} StackId */
/** @typedef {ReturnType<createStack>} Stack */

/** @typedef {string} StackCardId */
/** @typedef {ReturnType<createStackCard>} StackCard */

export function createStore() {
  return {
    /** @type {Record<SessionId, Session>} */
    sessions: {},
    /** @type {Record<UserId, User>} */
    users: {},
    /** @type {Record<PlayId, Play>} */
    plays: {},
    /** @type {Record<HandId, Hand>} */
    hands: {},
    /** @type {Record<CollectionId, Collection>} */
    collections: {},
  };
}
attachZustyUpgradeSchema(createStore, {
  sessions: (prev) => createSession(prev.sessionId),
  users: (prev) => createUser(prev.userId),
  plays: (prev) => createPlay(prev.playId),
  hands: (prev) => createHand(prev.handId),
  collections: (prev) => createCollection(prev.collectionId),
});

/**
 * @param {CollectionId} collectionId
 */
export function createCollection(collectionId = cuid()) {
  return {
    collectionId,
    /** @type {Record<import('@/card/values').CardId, CollectionCard>} */
    ownedCards: {},
    /** @type {Record<import('@/card/values').PackId, CollectionPack>} */
    ownedPacks: {},
  };
}
attachZustyUpgradeSchema(createCollection, {
  ownedCards: (prev) => createCollectionCard(prev.cardId),
  ownedPacks: (prev) => createCollectionPack(prev.packId),
});

/**
 * @param {import('@/card/values').CardId} cardId
 */
export function createCollectionCard(cardId = cuid()) {
  return {
    cardId,
    cardCount: 0,
  };
}

/**
 * @param {import('@/card/values').PackId} packId
 */
export function createCollectionPack(packId = cuid()) {
  return {
    packId,
    packCount: 0,
  };
}

/**
 * @param {SessionId} sessionId
 */
export function createSession(sessionId = cuid()) {
  return {
    sessionId,
    /** @type {UserId} */
    localUserId: '',
    /** @type {HandId} */
    localHandId: '',
    /** @type {PlayId} */
    localPlayId: '',
    lastActiveTimeMillis: 0,
  };
}

/**
 * @param {UserId} userId
 */
export function createUser(userId = cuid()) {
  return {
    userId,
    displayName: '',
    /** @type {CollectionId} */
    ownedCollectionId: '',
  };
}

/**
 * @param {PlayId} playId
 */
export function createPlay(playId = cuid()) {
  return {
    playId,
    /** @type {Record<PlayCardId, PlayCard>} */
    playCards: {},
  };
}
attachZustyUpgradeSchema(createPlay, {
  playCards: (prev) => createPlayCard(prev.playCardId),
});

/**
 * @param {PlayCardId} playCardId
 */
export function createPlayCard(playCardId = cuid()) {
  return {
    playCardId,
    cardId: '',
    position: [0, 0],
    lastTouchedMillis: performance.now(),
  };
}

/**
 * @param {HandId} handId
 */
export function createHand(handId = cuid()) {
  return {
    handId,
    /** @type {Array<HandCardId>} */
    cardOrder: [],
    /** @type {Record<HandCardId, HandCard>} */
    handCards: {},
  };
}
attachZustyUpgradeSchema(createHand, {
  handCards: (prev) => createHandCard(prev.handCardId),
});

/**
 * @param {HandCardId} handCardId
 */
export function createHandCard(handCardId = cuid()) {
  return {
    handCardId,
    cardId: '',
  };
}

/**
 * @param {StackId} stackId
 */
export function createStack(stackId = cuid()) {
  return {
    stackId,
    /** @type {Record<StackCardId, StackCard>} */
    stackCards: {},
  };
}
attachZustyUpgradeSchema(createStack, {
  stackCards: (prev) => createStackCard(prev.stackCardId),
});

/**
 * @param {StackCardId} stackCardId
 */
export function createStackCard(stackCardId = cuid()) {
  return {
    stackCardId,
    cardId: '',
  };
}
