import {Component, OnInit} from '@angular/core';
import {MenuService} from "./services/menu.service";
import {MenuModel} from "./models/Menu.model";
import { hamburger } from "./components/animations/fading-away.animate";
import {MatSidenav} from "@angular/material/sidenav";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [hamburger]
})
export class AppComponent implements OnInit {
  title = 'ng-vicarius';
  menu: MenuModel[] = [];
  items: MenuModel[] = [];
  isHamburger = true;

  constructor(private menuService: MenuService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getActiveItemMenu();
    this.menuService.getMenuList().subscribe({
      next: value => {
        this.items = value;
        const _main = value.filter(item => !item.parent);
        const _children = value.filter(item => item.parent);
        _children.map((item, index, array) => {
          array.map(s => {
            if (s.parent === item.id) {
              item.items?.push(s);
            }
          })
        });
        if (_main.length) {
          _main.map(parent => {
            _children.forEach(item => {
              if (item.parent === parent.id) {
                parent.items?.push(item);
              }
            })
          })
        }
        this.menu = _main;
      },
      error: (err: any) => {

      },
      complete: () => {

      }
    })
  }

  openMenu(drawer: MatSidenav): void {
    this.isHamburger = false;
    drawer.toggle();
    drawer.openedChange.subscribe(d => {
      this.isHamburger = !d
    })
  }

  closeMenu(drawer: MatSidenav): void {
    this.isHamburger = true;
    drawer.toggle();
    drawer.openedChange.subscribe(d => {
      this.isHamburger = !d
    })
  }

  openSubmenu(item: MenuModel, drawer: MatSidenav): void {
    if (item.items.length) {
      item.showSubMenu = !item.showSubMenu;
    } else {
      this.isHamburger = true;
      drawer.toggle();
      this.router.navigate([item.link]).then(() => {
        this.items.map(el => {
          el.is_active = el.id === item.id;
        })
      });
    }
  }

  getSvgOfItemList(svg: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  getActiveItemMenu(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        const url = this.router.url.replace('/', '');
        if (url === '') {
          this.items.map(item => {
            item.is_active = item.link === 'home';
          })
        } else {
          this.items.map(item => {
            item.is_active = item.link === url;
          })
        }
        this.menu.map(m => {
          const active = this.items.find(i => i.is_active);
          let level_two: any = null;
          let level_three: any = null;
          if (active && active.parent) {
            if (m.id === active.parent) {
              m.showSubMenu = true;
              m.is_active = true;
            } else {
              if (m.items.length) {
                m.items.map(item => {
                  if (item.id === active.parent) {
                    item.showSubMenu = true;
                    item.is_active = true;
                  } else {
                    if (item.items.length) {
                      item.items.map(it => {
                        if (it.id === active.parent) {
                          it.showSubMenu = true;
                          it.is_active = true;
                          level_three = it;
                        }
                      })
                    }
                  }
                  if (level_three) {
                    if (item.id === level_three.parent) {
                      item.showSubMenu = true;
                      item.is_active = true;
                      level_two = item;
                    }
                  }
                })
                if (level_two) {
                  if (m.id === level_two.parent) {
                    m.showSubMenu = true;
                    m.is_active = true;
                  }
                }
              }
            }
          }
        });
      }
    });
  }
}
