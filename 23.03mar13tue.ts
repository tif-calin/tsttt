// ------------- //
// #region Try 1 //

/**
 * Take in an object `obj` and remove the properties corresponding to the
 * keys specified by `keysToOmit`.
 */
const omitKeys1 = (
  obj: any,
  keysToOmit: string[]
) => {
  const newObj = { ...obj };

  for (const key of keysToOmit) delete newObj[key];

  return newObj;
};

const myLife = {
  friends: 8.5,
  cats: ['joey', 'cami', 'catra', 'hungry'],
  love: true,
  theHaters: 'you know...',
  peopleWhoDontUseTurnSignals: ['my dad'],
};

const myNewLife = omitKeys1(
  myLife,
  ['theHaters', 'peopleWhoDontUseTurnSignals']
);

myNewLife.killerWasps

// #endregion //
// ------------- //

// ------------- //
// #region Try 2 //

const omitKeys = <
  TObj extends object,
  TKey extends keyof TObj
>(
  obj: TObj,
  keysToOmit: TKey[]
): Omit<TObj, TKey> => {
  const newObj = { ...obj };

  for (const key of keysToOmit) delete newObj[key];

  return newObj;
};

const myNewTypeSafeLife = omitKeys(
  myLife,
  ['theHaters', 'peopleWhoDontUseTurnSignals']
);

myNewTypeSafeLife.killerWasps
myNewTypeSafeLife.theHaters
myNewTypeSafeLife.cats

// #endregion    //
// ------------- //
