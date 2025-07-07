'use client';

import React from 'react';
import styled, { css } from 'styled-components';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles = {
  h1: css`
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  `,
  h2: css`
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.875rem;
  `,
  h3: css`
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.75rem;
  `,
  h4: css`
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 0.625rem;
  `,
  h5: css`
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  `,
  h6: css`
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  `,
  body1: css`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.6;
  `,
  body2: css`
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
  `,
  caption: css`
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.4;
  `,
};

const colorStyles = {
  primary: css`color: #007bff;`,
  secondary: css`color: #6c757d;`,
  success: css`color: #28a745;`,
  danger: css`color: #dc3545;`,
  warning: css`color: #ffc107;`,
  info: css`color: #17a2b8;`,
  light: css`color: #f8f9fa;`,
  dark: css`color: #343a40;`,
};

const weightStyles = {
  normal: css`font-weight: 400;`,
  medium: css`font-weight: 500;`,
  semibold: css`font-weight: 600;`,
  bold: css`font-weight: 700;`,
};

const StyledTypography = styled.div<TypographyProps>`
  ${({ variant = 'body1' }) => variantStyles[variant]}
  ${({ color }) => color && colorStyles[color]}
  ${({ weight }) => weight && weightStyles[weight]}
  ${({ align }) => align && css`text-align: ${align};`}
`;

const getComponent = (variant: string) => {
  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return variant;
    default:
      return 'div';
  }
};

export default function Typography({
  children,
  variant = 'body1',
  color,
  align,
  weight,
  className,
  style,
}: TypographyProps) {
  return (
    <StyledTypography
      as={getComponent(variant)}
      variant={variant}
      color={color}
      align={align}
      weight={weight}
      className={className}
      style={style}
    >
    {children}
    </StyledTypography>
  );
}
