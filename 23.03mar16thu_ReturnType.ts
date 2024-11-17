// ------------------------------ //
// #region Inference and Generics //

const iDontWantIt = aThing => aThing;

const itBack = iDontWantIt('Merge Conflicts');

const takeItBack = <It>(aThing: It): It => aThing;

const itBackAgain = takeItBack('Merge Conflicts');

const youCanHaveJustOneBack = <Thing>(things: Thing[]): Thing => things[0];

const peanutButterSquares = ['pb square 1', 'pb square 2', 'pb square 3'];

const justOne = youCanHaveJustOneBack(peanutButterSquares);
//     ^?

// #endregion                     //
// ------------------------------ //

// ------------------------------ //
// #region Constraining Generics  //

// const feedCookieMonster = <Food extends { __typename: 'Cookie' }>(
//   something: Food
// ): Food => {
//   console.log('munch munch');
//   return something;
// };

// const crumbs = feedCookieMonster({ __typename: 'Cookie', chocolateChips: true });
//     ^?

const feedCookieMonsterWithKind = <Food extends { __typename: 'Cookie', kind: string }>(
  something: Food
): Food => {
  if (something.kind === 'peanut butter') {
    console.warn("Don't eat that!!");
    return null;
  } else {
    console.log('munch munch');
    return something;
  }
};

type Leftovers<Food> = Food extends { kind: 'peanut butter'; } ? null : Food;

const feedCookieMonsterWithKindCorrect = <
  Food extends { __typename: 'Cookie'; kind: string }
>(
  something: Food
): Leftovers<Food> => {
  if (something.kind === 'peanut butter') {
    console.warn("Don't eat that!!");
    return null as Leftovers<Food>;
  } else {
    console.log('munch munch');
    return something as Leftovers<Food>;
  }
};

declare const feedCookieMonsterMessily: <Food>(something: Food) => { __typename: 'Crumbs' };
// alternatively
// type FuncSig = <Food>(something: Food) => { __typename: 'Crumbs', kind: ??? };

type Crumbs<Food> = Food extends { kind: infer U }
  ? { __typename: 'Crumbs'; kind: U }
  : null;
const feedCookieMonster = <Food extends object>(
  food: Food
): Crumbs<Food> => {
  console.log('munch munch');

  return (
    ('kind' in food) ? { __typename: 'Crumbs', kind: food.kind } : null
  ) as Crumbs<Food>;
};

const cookie = { kind: 'peanut butter' } as const;
const theCrumbs = feedCookieMonster(cookie);
//     ^?

// #endregion                     //
// ------------------------------ //

// ------------------------------ //
// #region Infer                  //

type ElementFromArray<T> = T extends (infer U)[] ? U[] : never;
type UglyElementFromArray<T extends any[]> = T[number];

type MyReturnValue<F> = F extends ((...args: unknown[]) => infer U) ? U : never;

type DeepFlat<T> = T extends readonly(infer U)[][] ? U : T;

const blah = [[[['hi']]]]
const blah2: DeepFlat<typeof blah> = null as any

type ElementOfArray3<T extends any[]> = T[number];

type What = ElementOfArray3<[1, 2, 3]>;
//    ^?



type RestOfTheTuple<T> = T extends [any, ...infer U] ? U : never;

declare const rest: RestOfTheTuple<['chicken', 'egg']>;
//             ^?


type ReturnType<T> = T extends (...args: any[]) => infer U ? U : never;
type Parameters<T> = T extends (...args: infer U) => any ? U : never;
type Awaited<T> = T extends Promise<infer U> ? U : never;

const c: Awaited<{}> = null as any


// #endregion                     //
// ------------------------------ //
