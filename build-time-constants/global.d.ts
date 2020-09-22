declare module '*.css';
declare module '*.jpg';
declare module '*.gif';
declare module '*.png';

/**
 * Return the keys from T that are of type C
 *
 * i.e.
 * ```
 * interface I {
 *   num1: number;
 *   num2: number;
 *   b1: boolean;
 *   b2: boolean;
 * }
 *
 * PickKeys<I, number> // would be 'num1' | 'num2'
 * ```
 */
type PickKeys<I, T> = { [P in keyof I]: I[P] extends T ? P : never }[keyof I];

/*
 * Data from global.js
 */
