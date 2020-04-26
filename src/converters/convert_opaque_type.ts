import * as t from '@babel/types';
import { warnOnlyOnce } from '../util';
import { convertFlowType } from './convert_flow_type';
import { baseNodeProps } from '../utils/baseNodeProps';

export function convertOpaqueType(
  node: t.OpaqueType
): t.TSTypeAliasDeclaration {
  if (node.supertype) {
    warnOnlyOnce(
      'Subtyping constraints in opaque type in Flow is ignored in TypeScript'
    );
  }
  const tsNode = t.tsTypeAliasDeclaration(node.id, null, {
    ...convertFlowType(node.impltype),
    ...baseNodeProps(node.impltype),
  });
  tsNode.declare = false;

  return tsNode;
}
