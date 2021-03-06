# babel-plugin-flowts
[Babel](https://github.com/babel/babel) plugin to convert [Flow](https://github.com/facebook/flow) code to [TypeScript](https://github.com/Microsoft/TypeScript).

## Usage 

```shell
$ npm install -g @babel/cli @babel/core
$ npm install https://github.com/AaronNGray/babel-plugin-flowts.git

# you must use babel@^7.x.x
$ babel --version
7.4.4 (@babel/core 7.4.5)

$ babel --plugins babel-plugin-flowts ${SRC_FLOW_FILE} -o ${DEST_TS_FILE}
```

or :-
```
npm install https://github.com/AaronNGray/babel-plugin-flowts.git
```

package.json
```
  "scripts": {
    "ts": "babel --out-file-extension .ts src -d ts",
  }
```
.babelrc.json
```  
{
  "parserOpts": {
    "plugins": ["flow"]
  },
  "plugins": [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "babel-plugin-flowts"
  ],
  "ignore": [
  ]
}
```

## Implementation status

| Supported? | Syntax                | Flow                              | TypeScript                                      |
| ---------- | --------------------- | --------------------------------- | ----------------------------------------------- |
| ✅         | Maybe type            | `let a:?number`                   | `let a: number \| null \| undefined`            |
| ✅         | Void type             | `void`                            | `void`                                          |
| ✅         | Object type           | `Object`                          | `object`                                        |
| ✅         | Mixed type            | `mixed`                           | `unknown`                                       |
| ✅         | Function type         | `(A, B) => C`                     | `(x1: A, x2: B) => C`                           |
| ✅         | Exact type            | `{\| a: A \|}`                    | `{ a: A }`                                      |
| ✅         | Indexers              | `{ [A]: B }`                      | `{ [a: A]: B }`                                 |
| ✅         | Existential type      | `Map<*, *>`                       | `Map<any, any>`                                 |
| ✅         | Opaque types          | `opaque type A = B`               | `type A = B`                                    |
| ✅         | Variance              | `interface A { +b: B, -c: C }`    | `interface A { readonly b: B, c: C }`           |
| ✅         | Type parameter bounds | `function f<A: string>(a:A){}`    | `function f<A extends string>(a:A){}`           |
| ✅         | Cast                  | `(a: A)`                          | `(a as A)`                                      |
| ✅         | type/typeof import    | `import type A from 'module'`     | `import A from 'module'`                        |
| ✅         | \$Keys                | `$Keys<X>`                        | `keyof X`                                       |
| ✅         | \$Values              | `$Values<X>`                      | `X[keyof X]`                                    |
| ✅         | \$ReadOnly            | `$Readonly<X>`                    | `Readonly<X>`                                   |
| ✅         | \$Exact               | `$Exact<X>`                       | `X`                                             |
| ✅         | \$Diff                | `$Diff<X, Y>`                     | `Pick<X, Exclude<keyof X, keyof Y>>`            |
| ✅         | \$PropertyType        | `$PropertyType<T, k>`             | `T[k]`                                          |
| ✅         | \$ElementType         | `$ElementType<T, k>`              | `T[k]`                                          |
| ✅         | $Shape                | `$Shape<T>`                       | `Partial<T>`                                    |
| ✅         | Class                 | `Class<T>`                        | `typeof T`                                      |
| ✅         | typeof operator       | `typeof foo`                      | `typeof foo`                                    |
| ✅         | JSX                   | -                                 | -                                               |
| ✅         | Tuple type            | `[number, string]`                | `[number, string]`                              |
| ✅         | Type alias            | `type A = string`                 | `type A = string`                               |
| ✅         | Flow Ignore           | `$FlowFixMe`                      | `any`                                           |
| ✅         | Interfaces            | `interface X { +prop: string }`   | `interface X { readonly prop: string }`         |
| ✅         | Optional Members      | `a?.b`                            | `...`   |
| ✅         | Declare functions     | `declare function x(false): true;`| `function x(x0: false): true;`                  |
| ✅         | Declare Class         | `...`                             | `...`                                           |

[babel]: https://github.com/babel/babel
[flow]: https://github.com/facebook/flow
[typescript]: https://github.com/Microsoft/TypeScript

## History

This is a fork of [https://github.com/zxbodya/flowts](https://github.com/zxbodya/flowts).

Which is is a fork of [Kiikurage/babel-plugin-flow-to-typescript](https://github.com/Kiikurage/babel-plugin-flow-to-typescript).

Original repository is no longer actively maintained, also having it here helps to keep flowts project in sync with the plugin.

