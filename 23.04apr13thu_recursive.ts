
type RArr = Array<number | RArr>;

const example1: RArr[] = [
  [1, 2, 3],
  [[1, 2, 3]],
  [1, [2, 3]],
  [[[], 1]],
  [[], [[], [[0]]]]
];

type NestedNumberArray = number | NestedNumberArray[];

const example2: NestedNumberArray[] = [
  1,
  [],
  [1],
  [1, 2, 3],
  [1, 2, [3, 4], 5],
  [[[[1]], 2, [3]]],
  [[[5]]]
];

// ------------------------ //

type Json = string | number | boolean | null | Json[] | { [key: PropertyKey]: Json };

const example3: Json[] = [
  1,
  'hello',
  [true, 'hello', {}],
  { a: 1, b: 'hello', c: [1, 2, 3, { well: 'well' }, null] }
];


const blah: PropertyKey = 2;

// ------------------------ //
// #region dig

// type Tail<T> = T extends [infer _, ...infer Last] ? Last : never;

type AllPossiblePaths<Obj> = [keyof Obj, ...AllPossiblePaths<Obj[keyof Obj]>];

type DigDeep<
  Obj,
  Path extends [keyof Obj, ...any]
> = Path extends [infer FirstKey, ...infer Tail]
  ? FirstKey extends keyof Obj
    ? Tail['length'] extends 0
      ? Obj[FirstKey]
      : Tail extends [infer SecondKey, ...infer TailTail]
        ? SecondKey extends keyof Obj[FirstKey]
          ? TailTail[1] extends Obj[FirstKey][SecondKey]
            ? DigDeep<Obj[FirstKey], [SecondKey, ...TailTail]>
            : Obj[FirstKey]
          : Obj[FirstKey]
        : never
    : Obj
  : never
;

type Nest = {
  birds: number;
  site: { location: string; },
  eggs: [
    {
      age: 0 | 1 | 2;
      birthDate: { month: 'April'; day: 13; };
      hatched: boolean;
    },
    {
      age: number;
      birthDate: { month: 'February'; day: number; };
      hatched: boolean;
    }
  ]
};

type Example1 = DigDeep<Nest, ['eggs', 0, 'age']>;
//    ^?
type Example2 = DigDeep<Nest, ['eggs', 1, 'birthDate', 'month']>;
//    ^?
type Example3 = DigDeep<Nest, ['site', 'location']>;
//    ^?

// #endregion
// ------------------------ //
