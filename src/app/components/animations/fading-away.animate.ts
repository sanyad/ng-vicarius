import {animate, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';

export const showAnimate = trigger('showAnimate', [
  transition(':enter', [
    animate('1s', keyframes([
      style({
        offset: 0,
        opacity: 0
      }),
      style({
        offset: 1,
        opacity: 1
      })
    ]))
  ])
]);

export const hamburger = trigger('hamburguerX', [
  /*
    state hamburguer => is the regular 3 lines style.
    states topX, hide, and bottomX => used to style the X element
  */
  state('hamburguer', style({})),
  // style top bar to create the X
  state(
    'topX',
    style({
      transform: 'rotate(45deg)',
      transformOrigin: 'left',
      margin: '6px',
    })
  ),
  // hides element when create the X (used in the middle bar)
  state(
    'hide',
    style({
      opacity: 0,
    })
  ),
  // style bottom bar to create the X
  state(
    'bottomX',
    style({
      transform: 'rotate(-45deg)',
      transformOrigin: 'left',
      margin: '6px',
    })
  ),
  transition('* => *', [
    animate('0.2s'), // controls animation speed
  ]),
])
