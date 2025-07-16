'use client';

import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  suppressHydrationWarning?: boolean;
}

const buttonVariants = {
  primary: css`
    background-color: #007bff;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #0056b3;
    }
  `,
  secondary: css`
    background-color: #6c757d;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #5a6268;
    }
  `,
  success: css`
    background-color: #28a745;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #218838;
    }
  `,
  danger: css`
    background-color: #dc3545;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #c82333;
    }
  `,
  outline: css`
    background-color: transparent;
    color: #007bff;
    border: 1px solid #007bff;
    
    &:hover:not(:disabled) {
      background-color: #007bff;
      color: white;
    }
  `,
};

const buttonSizes = {
  small: css`
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 0.5rem 1rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  `,
};

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant', 'size', 'fullWidth'].includes(prop),
})<ButtonProps>`
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  
  ${({ variant = 'primary' }) => buttonVariants[variant]}
  ${({ size = 'medium' }) => buttonSizes[size]}
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  style,
  suppressHydrationWarning,
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      style={style}
      suppressHydrationWarning={suppressHydrationWarning}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </StyledButton>
  );
}
