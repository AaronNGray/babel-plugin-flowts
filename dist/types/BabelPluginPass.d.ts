import * as t from '@babel/types';
export interface BabelPluginPass<PluginOptions extends object> {
    key: string | undefined | null;
    file: t.File;
    opts: PluginOptions;
    cwd: string;
    filename: string | void;
    set(key: unknown, val: unknown): void;
    get(key: unknown): any;
}
//# sourceMappingURL=BabelPluginPass.d.ts.map