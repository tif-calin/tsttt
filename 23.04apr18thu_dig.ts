declare module "23.04apr18thu" {

// ======================== //
// #region AllPossiblePaths //

type Primitive = string | number | boolean;

type AllPossiblePaths<T, K extends keyof T = keyof T> = K extends K
  ? [K, ...(T[K] extends Primitive ? [] : AllPossiblePaths<T[K]> | [])]
  : never;

// ------------------------ //
// #region EXAMPLE          //

type Check = ['foo', 'qux', 'quux'] extends AllPossiblePaths<{
//    ^?
  foo: { bar: 'baz', qux: { quux: 3 } },
  corge: { bar: true }
}> ? true : false;

// #endregion               //
// ------------------------ //

// #endregion               //
// ======================== //

// ======================== //
// #region DigDeep          //

type DigDeep<
  TObj extends any,
  TKeys extends AllPossiblePaths<TObj>
> = TKeys extends [infer TKey, ...infer TRest]
  ? TKey extends keyof TObj
    ? TRest extends AllPossiblePaths<TObj[TKey]>
      ? DigDeep<TObj[TKey], TRest>
      : TObj[TKey]
    : never
  : TObj;

// ------------------------ //
// #region EXAMPLE          //

type Nest = {
  birds: number;
  site: {
    location: string;
  },
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
type Example3 = DigDeep<Nest, ['eggs', 1, 'birdDay', 'month']>; // TYPESCRIPT SHOULD BE MAD HERE
//    ^?
type Example4 = DigDeep<Nest, ['site', 'location']>;
//    ^?

// #endregion               //
// ------------------------ //

// #endregion               //
// ======================== //

}

// https://www.typescriptlang.org/play?#code/FAehAIF5p2-m4yggYgE4FMDmBLA9gHbgCCANmQAr4DONuARmZpQIYAuAFjUiMMOwCeAB0zhK6XAFtc7XADcxkcDXaTC2cAB9whAK5SGmdNvAN8+Zq0IBufkNGkK1Oo2ZsuNADwAVADTgANLgmAAe7JiEACY8ANaYgvgAZuA+UODxiSk+AHzpwWER0TzBwODgAPzgANqBAQB0jQAUPrUAuiHhkTHikjJyipU1HQBcTlS09EwsHNy+7Xk61W0AlG1l4GOEmIrodijgALTHJ6dn5ye8Bxg4BMQAogAaJACylAAy9+XfP1fAAMZEVRmMisThjcgTVzTDxzADeB2+AD0KhskhYxnCzKx0GMAOQMVgALzxAQAjnpQpjwBTKWMAMzgAC+zL8G0B6GwmGphNx4DUejETOATLyymqePR+FJ4DxFNCMrlekpePW126WDwRF+Op+yDARwuRqNfwNqA1t21ut1+ogCHtDtNdodLtgVzNmru4AAIrhsN7MJhhNbysgBCIxL7-YHhF4Nj4APIMABWnSKPWsggC8cCCR4hW6PEhLim7lm3kTKZywDFqVzgnzXWKNVwhCSxjrCQajVb7ZMPgASphVOtylUfPW04WMglkqkk8mNmPUkPgQXm8XJm4Zp5fAvqhOEm1qzqqlGA0G9ymD-W2gFB8P2CffmNK8mb0el5tdDtjBtXwu+wGsaIFnO6aCetqTyvB8XwhmGDhiAAco+6QIuUDC4OgMRbAYRh7Bs9ARJiX5kPg-wcHcYyqOo2B2OUTJsuUODYDQYzVF+6G-KwXJjAADKYACMpgAEz0b8mHoFw3ocNy4BYlIRBcPiJDCJIZB4jY4BRKwghjIJ9JaUy4k-JwHD-JwmBRGM5iWJg1gmaynFfuUPFyfohjGI5GFYdJsnUophDKbKABimAMOgeg4oImnabpuGeXszLeeAZnsBZVk2RYVi2F+wrlOsxn2BG4D3KErBSMIzDCco54xl4KGqAEEosTQMp8QEeJuaqOR2AayKoohpXlZVzAiekdWXo17DNXirUyoJnWSX5ESKoFXA9X1EADeGjhlRVVWYIytV+hesbTbN80BItsqSVEMkxZ162cJtvCpAAmpQ9wAMoAMIDgAkpQaTfQAEgmACq7zeuAABCXwvCQMOg-cA73Ii5QortYj7aNmAACwTad9UXTUeJEZgipkRRchEJtGPgFj6rRJBxAhr8tqGqBoFOuA5os5abPs98nOumLyjIEAA
