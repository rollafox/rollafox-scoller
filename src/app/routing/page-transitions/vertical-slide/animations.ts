import { animate, group, query, state, style, transition, trigger } from '@angular/animations';

export const routerVerticalTransition = trigger('routerVerticalTransition', [
    state('next', style({ position: 'fixed', height: '100vh', width: '100%' })),
    state('previous', style({ position: 'fixed', height: '100vh', width: '100%' })),
    transition('* <=> previous', [
        query(':enter, :leave', style({ position: 'fixed', height: '100vh', width: '100%' })
            , { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateY(100%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)' }))
            ], { optional: true }),
        ])
    ]),
    transition('* <=> next', [
        query(':enter, :leave', style({ position: 'fixed', height: '100vh', width: '100%' })
            , { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateY(-100%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateY(100%)' }))
            ], { optional: true }),
        ])
    ])
]);
