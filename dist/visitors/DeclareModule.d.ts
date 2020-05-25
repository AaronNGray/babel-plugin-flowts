import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { PluginPass } from '../types';
export declare const DeclareModule: {
    enter(path: NodePath<t.DeclareModule>, state: PluginPass): void;
    exit(_: NodePath<t.DeclareModule>, state: PluginPass): void;
};
//# sourceMappingURL=DeclareModule.d.ts.map