/**
 * To cover: (important to know)
 *  - [x] Generics
 *  - [ ] `extends` — how to do complex conidtional logic and how that one person built a damn game in TS
 *  - [x] `infer`
 *  - [ ] `as const`
 *  - [ ] `symbol`s
 *  - [ ] function type signatures and overloading
 *  - [ ] `-readonly` modifier
 *  - [ ] Utility types
 *  - [ ] `never`
 *  - [ ] async types
 *  - [ ] type annotations. JSDocs vs TS
 *  - [ ] arrays are records pass it on
 *  - [ ] tuples, named tuples, etc
 *  - [ ] explicit return types - why you shouldn't and how to cheat
 *  - [ ] testing complex types
 *  - [x] overload your `loading`s with type info
 *  - [x] why does TypeScript play dumber than it is with built-in enumerables
 *  - [ ] use `void` for optional type arguments
 *
 * Special topics: (I need to study up)
 *  - `unique symbol`s
 *  - `const enum`s
 *
 * Future topics: (not yet released features)
 *  - `satisfies`
 *  - `const` modifiers for generics
 */

// Where to steal ideas from
[
  ['type-challenges', 'https://github.com/type-challenges/type-challenges'],
  ['implement utils from util libraries', [
    ['remeda', 'https://remedajs.com/docs'],
    ['lodash', 'https://lodash.com/docs'],
    ['ramda', 'https://ramdajs.com/docs'],
  ]]
];

// The most basic possible example of when generics are necessary.
const returnWhatIGiveYou = <T>(arg: T): T => arg;

// Build your own utility types.
type MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;


// Trying to fix
type PartialSpecifedModels<Model, TypeNames extends string> = {
  [Property in keyof Model]?: Model[Property] extends { __typename: TypeNames }
    ? Partial<Model[Property]>
    : Model[Property];
};

type PartialNestedModels<Model> = {
  [Property in keyof Model]?: Model[Property] extends {
    __typename: string;
    id: string;
  }
    ? Partial<Model[Property]>
    : Model[Property];
};

