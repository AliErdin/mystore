const customProps = [
  'variant',
  'weight',
  'align',
  'color',
  'size',
  'fullWidth',
  'active',
  'suppressHydrationWarning'
];

export const shouldForwardProp = (
  prop: string,
  defaultValidatorFn: (prop: string) => boolean
): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target: any = (this as any);
  const isDomTag = typeof target === 'string';

  if (isDomTag) {
    return defaultValidatorFn(prop) && !customProps.includes(prop);
  }
  return true;
};
