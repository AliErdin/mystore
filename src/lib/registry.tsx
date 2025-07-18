'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
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
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        {children}
      </StyleSheetManager>
    );
  }

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp} sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
