import {BlockName, MARKERS} from './settings/config';
import {SimpleNode} from './node';

const {BLOCK_SEPARATOR, BLOCK_START} = MARKERS;

export function generateAST(simple: string) {
  const blocks = simple.split(BLOCK_SEPARATOR);

  const rootNode = new SimpleNode();
  let currentNode = rootNode;

  blocks.forEach((block) => {
    let blockName: BlockName = 'STYLE';

    if (block.startsWith(BLOCK_START.QUERY)) {
      blockName = 'QUERY';
    } else if (block.startsWith(BLOCK_START.STATE)) {
      blockName = 'STATE';
    }

    const childNode = new SimpleNode(
      blockName,
      block.slice(BLOCK_START[blockName].length)
    );

    currentNode.setChild(childNode);
    
    currentNode = childNode;
  });

  return rootNode;
}
