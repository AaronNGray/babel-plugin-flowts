import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { PluginPass } from '../types';
export declare const TSModuleDeclaration: {
    enter(_path: NodePath<t.TSModuleDeclaration>, state: PluginPass): void;
    exit(_: NodePath<t.TSModuleDeclaration>, state: PluginPass): void;
};
//# sourceMappingURL=TSModuleDeclaration.d.ts.map