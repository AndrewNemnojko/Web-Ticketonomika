import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
} from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({
          position: 'absolute',
          width: '100%',
          opacity: 0,
          transform: 'translateY(10px)',
        }),
      ],
      { optional: true },
    ),

    query(
      ':leave',
      [
        style({
          position: 'absolute',
          height: '100dvh',
          width: '100%',
        }),
      ],
      { optional: true },
    ),

    group([
      query(
        ':leave',
        [
          animate(
            '400ms ease',
            style({
              opacity: 0,
              transform: 'translateY(10px)',
            }),
          ),
        ],
        { optional: true },
      ),

      query(
        ':enter',
        [
          animate(
            '400ms ease',
            style({
              opacity: 1,
              transform: 'translateY(0px)',
              filter: 'blur(0px)',
            }),
          ),
        ],
        { optional: true },
      ),
    ]),
  ]),
]);
