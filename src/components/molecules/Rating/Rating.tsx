'use client';

import React from 'react';
import styled from 'styled-components';
import Typography from '@/components/atoms/Typography';

interface RatingProps {
  rating: number;
  count?: number;
  showCount?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Stars = styled.div<{ size: string }>`
  color: #ffc107;
  font-size: ${({ size }) => {
    switch (size) {
      case 'small': return '0.75rem';
      case 'large': return '1.25rem';
      default: return '1rem';
    }
  }};
`;

const RatingText = styled(Typography)<{ size: string }>`
  margin: 0;
  font-size: ${({ size }) => {
    switch (size) {
      case 'small': return '0.75rem';
      case 'large': return '1rem';
      default: return '0.875rem';
    }
  }};
`;

export default function Rating({ 
  rating, 
  count, 
  showCount = true, 
  size = 'medium' 
}: RatingProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    
    if (hasHalfStar) {
      stars.push('☆');
    }
    
    while (stars.length < 5) {
      stars.push('☆');
    }
    
    return stars.join('');
  };

  return (
    <RatingContainer>
      <Stars size={size}>{renderStars(rating)}</Stars>
      {showCount && (
        <RatingText variant="body2" color="secondary" size={size}>
          {rating} {count && `(${count})`}
        </RatingText>
      )}
    </RatingContainer>
  );
}
