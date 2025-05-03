import { generateColorPalette } from '../helpers/createGradeColorMap';

describe('generateColorPalette', () => {
  it('returns an array of length n', () => {
    expect(generateColorPalette(5)).toHaveLength(5);
    expect(generateColorPalette(1)).toHaveLength(1);
  });

  it('returns strings in HSL format', () => {
    const palette = generateColorPalette(3);
    palette.forEach(color => {
      expect(color).toMatch(/^hsl\(\d+(\.\d+)?, 70%, 60%\)$/);
    });
  });

  it('handles n = 1 correctly', () => {
    const palette = generateColorPalette(1);
    expect(palette).toEqual(['hsl(0, 70%, 60%)']);
  });

  it('returns empty array if n is 0', () => {
    expect(generateColorPalette(0)).toEqual([]);
  });
});
