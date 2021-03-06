"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("@babel/template"));
/* tslint:disable */
const ast = template_1.default({
    plugins: ['typescript'],
}).ast;
const $ObjMap = ast `type $ObjMap<T extends {}, F extends (v: any) => any> = {
  [K in keyof T]: F extends (v: T[K]) => infer R ? R : never;
};`;
const $TupleMap = ast `type $TupleMap<T extends {}, F extends (v: any) => any> = {
  [K in keyof T]: F extends (v: T[K]) => infer R ? R : never;
};`;
const $ObjMapi = ast `type $ObjMapi<T extends {}, F extends (k: any, v: any) => any> = {
  [K in keyof T]: F extends (k: K, v: T[K]) => infer R ? R : never;
};`;
const $Call1 = ast `type $Call1<F extends (...args: any) => any, A> = F extends (a: A, ...args: any) => infer R
  ? R
  : never;`;
const $Call2 = ast `type $Call2<F extends (...args: any) => any, A, B> = F extends (
  a: A,
  b: B,
  ...args: any
  ) => infer R
  ? R
  : never;`;
const $Call3 = ast `type $Call3<F extends (...args: any) => any, A, B, C> = F extends (
  a: A,
  b: B,
  c: C,
  ...args: any
  ) => infer R
  ? R
  : never;`;
const $Call4 = ast `type $Call4<F extends (...args: any) => any, A, B, C, D> = F extends (
  a: A,
  b: B,
  c: C,
  d: D,
  ...args: any
  ) => infer R
  ? R
  : never;`;
const $Call5 = ast `type $Call5<F extends (...args: any) => any, A, B, C, D, E> = F extends (
  a: A,
  b: B,
  c: C,
  d: D,
  d: E,
  ...args: any
  ) => infer R
  ? R
  : never;`;
const Class = ast `type Class<T> = new (...args: any) => T;`;
exports.default = {
    $ObjMap,
    $TupleMap,
    $ObjMapi,
    $Call1,
    $Call2,
    $Call3,
    $Call4,
    $Call5,
    Class,
};
//# sourceMappingURL=helperTypes.js.map