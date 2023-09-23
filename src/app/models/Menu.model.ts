export class MenuModel {
  id: number | null;
  name: string;
  link: string;
  depth: number;
  target: string;
  lft: number;
  parent: number;
  items: MenuModel[];
  showSubMenu: boolean;
  is_active: boolean;
  color?: string;
  svg?: string;
  png?: string;
  position?: number;

  constructor(data: any) {
    this.id = +data.id || null;
    this.name = data.name || '';
    this.link = data.items ? null : data.link ? data.link : '';
    this.depth = +data.depth || 0;
    this.target = data.target ? data.target : '_self';
    this.lft = +data.lft || 1;
    this.parent = data.parent || null;
    this.svg = data.svg || undefined;
    this.png = data.png || undefined;
    this.showSubMenu = false;
    this.is_active = false;
    this.items = [];
    if (data.position) {
      this.position = +data.position;
    }
    if (data.color) {
      this.color = data.color;
    }
  }
}
