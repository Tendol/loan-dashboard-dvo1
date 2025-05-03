import _ from 'lodash';

// generate n number of different colors
export const generateColorPalette = (n) => {
  const step = 360 / n;
  return Array.from({ length: n }, (_, i) => `hsl(${i * step}, 70%, 60%)`);
};

const createGradeColorMap = (grades) => {
  const uniqueGrades = _.uniq(grades).sort((a, b) => Number(a) - Number(b));
  const colors = generateColorPalette(uniqueGrades.length);

  // assign a uniq color to each grade
  return uniqueGrades.reduce((acc, grade, i) => {
    acc[grade] = colors[i];
    return acc;
  }, {});
};

export default createGradeColorMap;
