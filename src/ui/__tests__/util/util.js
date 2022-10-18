export const mockMatchMedia = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      dispatchEvent: jest.fn(),
    })),
  });
};

export const mockScrollTo = () => {
  Object.defineProperty(window, 'scrollTo', {value: () => {}, writable: true});
};
