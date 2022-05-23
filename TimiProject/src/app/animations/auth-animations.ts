import { trigger, transition, style, query, animateChild, group, animate, state, animation } from '@angular/animations';

export const authAnimations =

  trigger('authAnimations', [

    transition('* <=> *', [
      style({
        // position:'absolute',
        opacity: 0,
        transform: 'translateY(10px)'
      }),
      animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
  ]);

  export const settingsAnimations =

  trigger('settingsAnimations', [

    transition('* => *', [
      style({
        // position:'absolute',
        opacity: 0,
        transform: 'translateY(-50px)'
      }),
      animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),


  ],
  );


  export const moveSectionLeftAnimation =

  trigger('moveSectionLeftAnimation', [

    transition('* => *', [
      style({
        // position:'absolute',
        opacity: 0,
        transform: 'translateY(-50px)'
      }),
      animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),


  ],
  );


