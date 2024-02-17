import {formatState, formatStyle} from './formatter';
import {TransformedPropOptions} from './settings/prop';
import {SimpleNode} from './node';

export const generateCSS =
  (AST: SimpleNode) => (propOptions: TransformedPropOptions) => {
    let CSS = '';

    const traverse =
      (node: SimpleNode['child']) =>
      (parent: SimpleNode | null = null) => {
        if (!node) return;

        const shouldWrapStyleBlock = !parent || parent.block !== 'STATE';

        switch (node.block) {
          case 'root':
            traverse(node.child)(node);
            break;
          case 'QUERY':
            CSS += `@${node.value}{`;
            traverse(node.child)(node);
            CSS += '}';
            break;
          case 'STATE':
            CSS += `${formatState(node.value)}{`;
            traverse(node.child)(node);
            CSS += '}';
            break;
          case 'STYLE':
            if (shouldWrapStyleBlock) {
              CSS += ':host{';
            }
            CSS += formatStyle(node.value, propOptions);
            if (shouldWrapStyleBlock) {
              CSS += '}';
            }
            break;
        }
      };

    traverse(AST)();

    return CSS;
  };
