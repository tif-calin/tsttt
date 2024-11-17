// JAM pack the `loading` variable with useful type data!

type Data<Loading extends boolean> = {
  loading: Loading;
  data: Loading extends true ? undefined : { foo: 'bar' };
};

const ex1: Data<true> = {
  loading: true,
  data: undefined
};

// cells

type ColorPalette = 'black' | 'green' | 'hotpink' | 'rebeccapurple';

type Cell<
  Content extends string | number | HTMLElement = string,
  Color extends ColorPalette | void = void
> = {
  id: string;
  content: Content;
  label: string;
  color?: Color;
  bgColor?: Exclude<ColorPalette, Color>;
};

const ex: Cell<string> = {
  id: '1',
  content: 'Hello',
  label: 'Hello',
  color: 'black',
  bgColor: 'black',
};


console.log(ex)


type Cell2<
  Content extends string | number | HTMLElement = string,
  Options extends Partial<{
    color: Options['kind'] extends 'kinda slimy lookin'
      ? 'black'
      : ColorPalette;
    kind: 'long' | 'header' | 'kinda slimy lookin';
    underlined: boolean;
  }> = {}
> = {
  id: string;
  content: Content;
  label: string;
  color?: Options['color'];
  bgColor?: Options['kind'] extends 'kinda slimy lookin'
  ? 'green' : Exclude<ColorPalette, Options['color']>;
};

const ex2: Cell2<
  string,
  {
    color: 'black';
    kind: 'kinda slimy lookin';
  }
> = {
  id: '1',
  content: 'Hello',
  label: 'Hello',
  color: 'black',
  bgColor: 'green'
};

console.log(ex2);
