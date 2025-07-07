'use client';

import React from 'react';
import styled, { css } from 'styled-components';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const variantStyles = {
  primary: css`
    background-color: #007bff;
    color: white;
  `,
  secondary: css`
    background-color: #6c757d;
    color: white;
    border-radius: 5px;
  `,
  success: css`
    background-color: #28a745;
    color: white;
  `,
  danger: css`
    background-color: #dc3545;
    color: white;
  `,
  warning: css`
    background-color: #ffc107;
    color: #212529;
  `,
  info: css`
    background-color: #17a2b8;
    color: white;
  `,
};

const sizeStyles = {
  small: css`
    font-size: 0.625rem;
    padding: 0.125rem 0.375rem;
    min-width: 1rem;
    height: 1rem;
  `,
  medium: css`
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    min-width: 1.25rem;
    height: 1.25rem;
  `,
  large: css`
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
    min-width: 1.5rem;
    height: 1.5rem;
  `,
};

const positionStyles = {
  'top-right': css`
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
  `,
  'top-left': css`
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
  `,
  'bottom-right': css`
    position: absolute;
    bottom: -0.5rem;
    right: -0.5rem;
  `,
  'bottom-left': css`
    position: absolute;
    bottom: -0.5rem;
    left: -0.5rem;
  `,
};

const StyledBadge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  
  ${({ variant = 'primary' }) => variantStyles[variant]}
  ${({ size = 'medium' }) => sizeStyles[size]}
  ${({ position }) => position && positionStyles[position]}
`;

export default function Badge({
  children,
  variant = 'primary',
  size = 'medium',
  position,
}: BadgeProps) {
  return (
    <StyledBadge 
      variant={variant} 
      size={size} 
      position={position}
      data-position={position}
    >
      {children}
    </StyledBadge>
  );
}
