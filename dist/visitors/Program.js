"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
const t = __importStar(require("@babel/types"));
const helperTypes_1 = __importDefault(require("../helperTypes"));
const warnOnlyOnce_1 = require("../utils/warnOnlyOnce");
exports.Program = {
    enter(path) {
        const [firstNode] = path.node.body;
        if (firstNode &&
            firstNode.leadingComments &&
            firstNode.leadingComments.length) {
            const commentIndex = firstNode.leadingComments.findIndex(item => item.value.trim() === '@flow');
            if (commentIndex !== -1) {
                path.get(`body.0.leadingComments.${commentIndex}`).remove();
            }
        }
        // @ts-ignore recast support
        if (firstNode && firstNode.comments && firstNode.comments.length) {
            // @ts-ignore recast support
            const commentIndex = firstNode.comments.findIndex((item) => item.value.trim() === '@flow');
            if (commentIndex !== -1) {
                // @ts-ignore recast support
                firstNode.comments.splice(commentIndex, 1);
            }
        }
    },
    exit(path) {
        path.traverse({
            /* istanbul ignore next */
            Flow(path) {
                // @ts-ignore todo: babel incorrectly considers type import to be "Flow" while now it can be also TypeScript
                if (path.node.type === 'ImportDeclaration' ||
                    path.node.type === 'ExportNamedDeclaration') {
                    return;
                }
                throw path.buildCodeFrameError('not converted flow node: ' + path.node.type);
            },
        });
        const usedHelperTypes = new Set();
        path.traverse({
            TSTypeReference(typeReferencePath) {
                const node = typeReferencePath.node;
                if (t.isIdentifier(node.typeName)) {
                    const name = node.typeName.name;
                    if (name === '$Call') {
                        if (node.typeParameters) {
                            if (node.typeParameters.params.length === 1) {
                                node.typeName.name = 'ReturnType';
                            }
                            else if (node.typeParameters.params.length === 2) {
                                node.typeName.name = '$Call1';
                                usedHelperTypes.add('$Call1');
                            }
                            else if (node.typeParameters.params.length === 3) {
                                node.typeName.name = '$Call2';
                                usedHelperTypes.add('$Call2');
                            }
                            else if (node.typeParameters.params.length === 4) {
                                node.typeName.name = '$Call3';
                                usedHelperTypes.add('$Call3');
                            }
                            else if (node.typeParameters.params.length === 5) {
                                node.typeName.name = '$Call4';
                                usedHelperTypes.add('$Call4');
                            }
                            else if (node.typeParameters.params.length === 6) {
                                node.typeName.name = '$Call5';
                                usedHelperTypes.add('$Call5');
                            }
                            else {
                                warnOnlyOnce_1.warnOnlyOnce('$Call utility type is used with more then 6 type parameters - this is crazy, do not want to fix');
                            }
                        }
                    }
                    else {
                        // @ts-ignore
                        if (helperTypes_1.default[name]) {
                            // @ts-ignore
                            usedHelperTypes.add(name);
                        }
                    }
                }
            },
        });
        const body = path.get('body');
        const imports = body.filter(st => st.isImportDeclaration());
        let after;
        if (imports.length > 0) {
            after = imports[imports.length - 1];
        }
        usedHelperTypes.forEach(helperName => {
            if (after)
                after.insertAfter(helperTypes_1.default[helperName]);
            else
                body[0].insertBefore(helperTypes_1.default[helperName]);
        });
        // function overrides
        const funcByName = new Map();
        function getFunc(name) {
            let func = funcByName.get(name);
            if (!func) {
                func = { decl: [], impl: [], exp: [] };
                funcByName.set(name, func);
            }
            return func;
        }
        function visitPossibliyFuncPath(st) {
            const node = st.node;
            if (t.isTSDeclareFunction(node)) {
                if (node.id) {
                    const func = getFunc(node.id.name);
                    // @ts-ignore todo: traverse types
                    func.decl.push(st);
                    return func;
                }
            }
            if (t.isFunctionDeclaration(node)) {
                if (node.id) {
                    const func = getFunc(node.id.name);
                    // @ts-ignore todo: traverse types
                    func.impl.push(st);
                    return func;
                }
            }
            return false;
        }
        for (const st of body) {
            visitPossibliyFuncPath(st);
            if ((t.isExportDefaultDeclaration(st.node) ||
                t.isExportNamedDeclaration(st.node)) &&
                st.node.declaration) {
                // @ts-ignore todo: traverse types
                const maybeFunc = visitPossibliyFuncPath(st.get('declaration'));
                if (maybeFunc) {
                    // @ts-ignore todo: traverse types
                    maybeFunc.exp.push(st);
                }
            }
        }
        for (const [, func] of funcByName) {
            // remove declare keywords if implementation is present
            if (func.impl.length && func.decl.length) {
                for (const decl of func.decl) {
                    decl.node.declare = false;
                }
                // separate declaration from export if overrides are present, and not everything is exported
                if (func.exp.length > 0 &&
                    func.exp.length !== func.impl.length + func.decl.length) {
                    // last export - to split it into declaration and export
                    const exp = func.exp[func.exp.length - 1];
                    // other declarations - to remove `export` keyword from them
                    const expToRemove = func.exp.slice(0, func.exp.length - 1);
                    if (t.isExportDefaultDeclaration(exp.node)) {
                        exp.replaceWithMultiple([
                            exp.node.declaration,
                            t.exportDefaultDeclaration(
                            // @ts-ignore
                            t.identifier(exp.node.declaration.id.name)),
                        ]);
                    }
                    if (t.isExportNamedDeclaration(exp.node)) {
                        const specifier = t.identifier(exp.node.declaration.id.name);
                        exp.replaceWithMultiple([
                            exp.node.declaration,
                            t.exportNamedDeclaration(null, 
                            // @ts-ignore
                            [t.exportSpecifier(specifier, specifier)]),
                        ]);
                    }
                    for (const otherExp of expToRemove) {
                        // @ts-ignore
                        otherExp.replaceWith(otherExp.node.declaration);
                    }
                }
            }
        }
    },
};
//# sourceMappingURL=Program.js.map