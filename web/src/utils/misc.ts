// Will return whether the current environment is in a regular browser
// and not CEF
export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

// Basic no operation function
export const noop = () => {};

export const getResourceName = (): string =>
  (window as any).GetParentResourceName
    ? (window as any).GetParentResourceName()
    : 'pe-ui';

export const Delay = (ms: number) => new Promise(resp => setTimeout(resp, ms));
