import React from 'react';
import { Typography as MuiTypography, type TypographyProps as MuiTypographyProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
type TypographyWeight = 'normal' | 'bold' | 400 | 700;
type TypographyAlign = 'left' | 'center' | 'right';

/**
 * สีจาก theme (เทียบ ColorConfig.text):
 * - primary / primary_black = ข้อความหลัก (ดำ #1b222b)
 * - primary_blue = ข้อความสีน้ำเงิน accent (#0060ba)
 * - secondary = ข้อความรอง
 * - error / success = จาก palette
 */
interface TypographyProps extends Omit<MuiTypographyProps, 'variant'> {
  size?: TypographySize;
  weight?: TypographyWeight;
  color?: 'primary' | 'primary_black' | 'primary_blue' | 'secondary' | 'error' | 'success' | string;
  align?: TypographyAlign;
  lineClamp?: number; // -webkit-line-clamp
  children?: React.ReactNode;
}

const sizeToVariant: Record<TypographySize, string> = {
  xs: 'textXs',
  sm: 'textSm',
  md: 'textMd',
  lg: 'textLg',
  xl: 'textXl',
  '2xl': 'text2xl',
  '3xl': 'text3xl',
  '4xl': 'text4xl',
  '5xl': 'text5xl',
};

const weightToFontWeight = (weight?: TypographyWeight): number | undefined => {
  if (!weight) return undefined;
  if (weight === 'normal') return 400;
  if (weight === 'bold') return 700;
  return weight;
};

const THEME_TEXT_COLOR_KEYS = ['primary', 'primary_black', 'primary_blue', 'secondary'] as const;
const THEME_PALETTE_COLOR_KEYS = ['error', 'success'] as const;

/** สีข้อความจาก theme (เทียบ ColorConfig.text.primary_black / primary_blue) */
const getTextColorFromTheme = (
  color: (typeof THEME_TEXT_COLOR_KEYS)[number],
  theme: {
    palette: {
      text: { primary?: string; secondary?: string };
      primary: { main?: string };
    };
  }
): string => {
  if (color === 'primary' || color === 'primary_black') return theme.palette.text.primary ?? '#1b222b';
  if (color === 'primary_blue') return theme.palette.primary?.main ?? '#0060ba';
  return theme.palette.text.secondary ?? '#404954';
};

export const Typography: React.FC<TypographyProps> = ({
  size = 'md',
  weight = 'normal',
  color,
  align,
  lineClamp,
  sx,
  ...rest
}) => {
  const theme = useTheme();
  const variant = sizeToVariant[size] as any;
  const fontWeight = weightToFontWeight(weight);

  const isTextColor = color && THEME_TEXT_COLOR_KEYS.includes(color as (typeof THEME_TEXT_COLOR_KEYS)[number]);
  const isPaletteColor = color && THEME_PALETTE_COLOR_KEYS.includes(color as (typeof THEME_PALETTE_COLOR_KEYS)[number]);
  const isCustomColor = color && !isTextColor && !isPaletteColor;

  const resolvedColor = isTextColor
    ? getTextColorFromTheme(color as (typeof THEME_TEXT_COLOR_KEYS)[number], theme)
    : isPaletteColor
      ? undefined
      : isCustomColor
        ? (color as string)
        : undefined;

  const muiColor = isPaletteColor ? (color as MuiTypographyProps['color']) : undefined;

  return (
    <MuiTypography
      variant={variant}
      color={muiColor}
      sx={{
        ...(resolvedColor ? { color: resolvedColor } : {}),
        ...(fontWeight ? { fontWeight } : {}),
        ...(align ? { textAlign: align } : {}),
        ...(lineClamp ? {
          display: '-webkit-box',
          WebkitLineClamp: +lineClamp ? lineClamp : 'none',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        } : {}),
        ...sx,
      }}
      {...rest}
    />
  );
};

