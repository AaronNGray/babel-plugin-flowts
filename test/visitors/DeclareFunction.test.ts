import { testTransform } from '../transform';

test('declare function', () => {
  const result = testTransform(`declare function something(): boolean
declare function something(something: boolean): string
declare function something(string): null`);
  expect(result.babel).toMatchInlineSnapshot(`
    "declare function something(): boolean;
    declare function something(something: boolean): string;
    declare function something(a: string): null;"
  `);
  expect(result.recast).toMatchInlineSnapshot(`
    "declare function something(): boolean
    declare function something(something: boolean): string
    declare function something(a: string): null"
  `);
});

test('tsParenthesizedType for function types in unions', () => {
  const result = testTransform(
    `declare function A(create: {} | () => void): void`
  );
  expect(result.babel).toMatchInlineSnapshot(
    `"declare function A(create: {} | (() => void)): void;"`
  );
  expect(result.recast).toMatchInlineSnapshot(
    `"declare function A(create: {} | (() => void)): void"`
  );
});

test('predicate function declaration', () => {
  const result = testTransform(
    `declare function foo(x: mixed): boolean %checks(x !== null)`
  );
  expect(result.babel).toMatchInlineSnapshot(
    `"declare function foo(x: unknown): boolean;"`
  );
  expect(result.recast).toMatchInlineSnapshot(
    `"declare function foo(x: unknown): boolean"`
  );
});
