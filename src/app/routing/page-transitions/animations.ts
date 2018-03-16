<<<<<<< HEAD
import { animate, group, query, state, style, transition, trigger } from '@angular/animations';
=======
import { trigger, transition, query, group, style, animate, state } from "@angular/animations";


>>>>>>> 8a335c3383af6305be8e58261a70822122a3a0ae

export const routerTransition = trigger('routerTransition', [
    state('next', style({ position: 'fixed', height: '100vh', width: '100%' })),
    state('previous', style({ position: 'fixed', height: '100vh', width: '100%' })),
    transition('* <=> previous', [
        query(':enter, :leave', style({ position: 'fixed', height: '100vh', width: '100%' })
            , { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateY(100%)' }),
                animate('0.8s ease-in-out', style({ transform: 'translateY(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('0.8s ease-in-out', style({ transform: 'translateY(-100%)' }))
            ], { optional: true }),
        ])
    ]),
    transition('* <=> next', [
        query(':enter, :leave', style({ position: 'fixed', height: '100vh', width: '100%' })
            , { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateY(-100%)' }),
                animate('0.8s ease-in-out', style({ transform: 'translateY(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('0.8s ease-in-out', style({ transform: 'translateY(100%)' }))
            ], { optional: true }),
        ])
    ])
<<<<<<< HEAD
]);
=======
]);
>>>>>>> 8a335c3383af6305be8e58261a70822122a3a0ae
