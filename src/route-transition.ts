import { animate, query, style, transition, trigger } from "@angular/animations";

export const routeTransition = trigger('routeTransition',[
    transition('* => *', [
        query(':enter', [
            style({opacity: 0})
        ], {optional: true}),
        query(':leave', [
            animate('.3s', style({opacity: 0}))
        ], {optional: true}),
        query(':enter', [
            animate('.3s', style({opacity: 1}))
        ], {optional: true})
    ])
])