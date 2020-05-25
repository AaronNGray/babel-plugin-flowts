import * as t from '@babel/types';
export declare function convertFunctionTypeAnnotation(node: t.FunctionTypeAnnotation): {
    typeParams: {
        leadingComments: readonly t.Comment[] | null;
        innerComments: readonly t.Comment[] | null;
        trailingComments: readonly t.Comment[] | null;
        start: number | null;
        end: number | null;
        loc: t.SourceLocation | null;
        type: "TSTypeParameterDeclaration";
        params: t.TSTypeParameter[];
    } | undefined;
    parameters: ({
        leadingComments: readonly t.Comment[] | null;
        innerComments: readonly t.Comment[] | null;
        trailingComments: readonly t.Comment[] | null;
        start: number | null;
        end: number | null;
        loc: t.SourceLocation | null;
        type: "Identifier";
        name: any;
        decorators: t.Decorator[] | null;
        optional: boolean | null;
        typeAnnotation: t.TypeAnnotation | t.Noop | t.TSTypeAnnotation | null;
    } | {
        leadingComments: readonly t.Comment[] | null;
        innerComments: readonly t.Comment[] | null;
        trailingComments: readonly t.Comment[] | null;
        start: number | null;
        end: number | null;
        loc: t.SourceLocation | null;
        type: "RestElement";
        argument: t.LVal;
        decorators: t.Decorator[] | null;
        typeAnnotation: t.TypeAnnotation | t.Noop | t.TSTypeAnnotation | null;
    })[];
    returnType: t.TSTypeAnnotation | null;
};
//# sourceMappingURL=convertFunctionTypeAnnotation.d.ts.map