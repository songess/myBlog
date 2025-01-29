// 'use client';
// import React from 'react';
// import {
//   motion,
//   type HTMLMotionProps,
//   type DOMMotionComponents,
// } from 'framer-motion';

// /** Framer Motion이 지원하는 HTML 태그들의 키들 */
// type HTMLMotionTag = keyof DOMMotionComponents;

// /**
//  * 제네릭 Props:
//  * - as?: 실제로 사용할 HTML 태그(기본값: 'div')
//  * - 나머지는 HTMLMotionProps<T>
//  */
// type MotionElementProps<T extends HTMLMotionTag> = {
//   as?: T;
// } & HTMLMotionProps<T>;

// const MotionElement = React.forwardRef(
//   <T extends HTMLMotionTag = 'div'>(
//     { as = 'div', children, ...props }: MotionElementProps<T>,
//     ref: React.ForwardedRef<HTMLElement>
//   ) => {
//     /** motion.div, motion.span, motion.button 등등 */
//     const Component = (
//       motion as Record<T, React.ComponentType<HTMLMotionProps<T>>>
//     )[as];
//     return (
//       <Component ref={ref} {...props}>
//         {children}
//       </Component>
//     );
//   }
// );

// MotionElement.displayName = 'MotionElement';

// export default MotionElement;
