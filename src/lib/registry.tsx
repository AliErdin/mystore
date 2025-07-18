'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import type { ShouldForwardProp } from 'styled-components';
import { shouldForwardProp } from './styledComponentsConfig';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {

  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    return (
      <StyleSheetManager shouldForwardProp={shouldForwardProp as ShouldForwardProp<'web'>}>
        {children}
      </StyleSheetManager>
    );
  }

  return (
        <StyleSheetManager shouldForwardProp={shouldForwardProp as ShouldForwardProp<'web'>} sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
