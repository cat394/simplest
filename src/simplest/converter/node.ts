import {BlockName} from './settings/config';

export class SimpleNode {
  child: SimpleNode | null = null;
  constructor(
    public block: 'root' | BlockName = 'root',
    public value: string = ''
  ) {}
  setChild(node: SimpleNode): void {
    this.child = node;
  }
}
