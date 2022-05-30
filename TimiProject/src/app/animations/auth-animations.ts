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

    transition('* <=> *', [
      style({
        // position:'absolute',
        opacity: 0,
        transform: 'translateY(50px)'
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

  export const showDetailsAnimation =


  trigger('flyInOut', [
    transition('void => *', [
      style({
        // position:'absolute',
        opacity: 0,
        transform: 'translateY(100%)'
      }),
      animate('300ms ease-out',style({ opacity: 1, transform: 'translateY(0%)'}))
    ]),
    transition('* => void', [
      style({
      // position:'absolute',
      opacity: 1,
    }),
      animate('300ms ease-in', style({  opacity: 0,  transform: 'translateY(100%)' }))
    ])
  ])


  ;
  export const fade =

  trigger('fade', [
    transition('void => *', [
      style({
        // position:'absolute',
        opacity: 0,
      }),
      animate('300ms ease-out',style({ opacity: 1}))
    ]),
    transition('* => void', [
      style({
      opacity: 1,
    }),
      animate('300ms ease-in', style({  opacity: 0}))
    ])
  ])


  ;

