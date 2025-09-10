import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    query(':enter', [
      style({ 
        position: 'absolute',
        width: '100%',
        opacity: 0,
        transform: 'translateX(20px)' 
      })
    ], { optional: true }),

    query(':leave', [
      style({ 
        position: 'absolute',
        width: '100%' 
      })
    ], { optional: true }),

    group([
      query(':leave', [
        animate('300ms ease', style({ 
          opacity: 0, 
          transform: 'translateX(-20px)' 
        }))
      ], { optional: true }),

      query(':enter', [
        animate('300ms ease', style({ 
          opacity: 1, 
          transform: 'translateX(0)' 
        }))
      ], { optional: true })
    ])
  ])
]);
