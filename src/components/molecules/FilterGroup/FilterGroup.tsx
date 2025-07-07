'use client';

import React from 'react';
import styled from 'styled-components';
import Typography from '@/components/atoms/Typography';

interface FilterGroupProps {
  label: string;
  children: React.ReactNode;
}

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled(Typography)`
  margin-bottom: 0;
`;

export default function FilterGroup({ label, children }: FilterGroupProps) {
  return (
    <FilterContainer>
      <Label variant="body2" weight="medium" color="dark">
        {label}
      </Label>
      {children}
    </FilterContainer>
  );
}
