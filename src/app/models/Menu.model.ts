import {GetTypeOf} from './GetTypeOf';

export class MenuModel {
  name: string;
  link: string;
  depth: number;
  target: string;
  lft: number;
  parent: number;
  color?: string;
  svg?: string;
  png?: string;
  items?: MenuModel[] | null;
  position?: number;

  constructor(data: any) {
    this.name = data.name || '';
    this.link = data.items ? null : data.link ? data.link : '';
    this.depth = +data.depth || 0;
    this.target = data.target ? data.target : '_self';
    this.lft = +data.lft || 1;
    this.parent = data.parent || null;
    this.svg = data.svg || undefined;
    this.png = data.png || undefined;
    this.items = data.items ? GetTypeOf(data.items).map(i => new MenuModel(i)) : null;
    if (data.position) {
      this.position = +data.position;
    }
    if (data.color) {
      this.color = data.color;
    }
  }
}
