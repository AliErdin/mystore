'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';

interface PriceRangeProps {
  minValue?: string;
  maxValue?: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

const PriceContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Separator = styled(Typography)`
  margin: 0;
  padding: 0 0.25rem;
`;

export default function PriceRange({
  minValue = '',
  maxValue = '',
  onMinChange,
  onMaxChange,
}: PriceRangeProps) {
  const [localMin, setLocalMin] = useState(minValue);
  const [localMax, setLocalMax] = useState(maxValue);

  const minTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSyncingMin = useRef(false);
  const isSyncingMax = useRef(false);

  useEffect(() => {
    if (minValue !== localMin) {
      isSyncingMin.current = true;
      setLocalMin(minValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minValue]);

  // Only call onMinChange if localMin was changed by user
  useEffect(() => {
    if (isSyncingMin.current) {
      isSyncingMin.current = false;
      return;
    }
    if (minTimeout.current) clearTimeout(minTimeout.current);
    minTimeout.current = setTimeout(() => {
      onMinChange(localMin);
    }, 400);
    return () => { if (minTimeout.current) clearTimeout(minTimeout.current); };
  }, [localMin]);

  // Sync localMax with prop, but do not call onMaxChange
  useEffect(() => {
    if (maxValue !== localMax) {
      isSyncingMax.current = true;
      setLocalMax(maxValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxValue]);

  // Only call onMaxChange if localMax was changed by user
  useEffect(() => {
    if (isSyncingMax.current) {
      isSyncingMax.current = false;
      return;
    }
    if (maxTimeout.current) clearTimeout(maxTimeout.current);
    maxTimeout.current = setTimeout(() => {
      onMaxChange(localMax);
    }, 400);
    return () => { if (maxTimeout.current) clearTimeout(maxTimeout.current); };
  }, [localMax]);

  return (
    <PriceContainer>
      <Input
        type="number"
        placeholder="Min"
        min="0"
        step="0.01"
        value={localMin}
        onChange={e => setLocalMin(e.target.value)}
      />
      <Separator variant="body2" color="secondary">-</Separator>
      <Input
        type="number"
        placeholder="Max"
        min="0"
        step="0.01"
        value={localMax}
        onChange={e => setLocalMax(e.target.value)}
      />
    </PriceContainer>
  );
}
