//CATEGORY[0]은 'all'로 고정
export const CATEGORY_ARR = ['All', 'OS', 'FE', 'CS', 'LIFE', 'BE'] as const;

/**
 * CATEGORY index 찾는 용도
 */
export const CATEGORY_OBJ: { [key: string]: number } = {};

CATEGORY_ARR.forEach((item, idx) => {
  CATEGORY_OBJ[item] = idx;
});
