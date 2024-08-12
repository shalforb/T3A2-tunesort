import '@testing-library/jest-dom';

globalThis.importMetaEnv = {
    VITE_SERVER_BASE_URL: 'http://localhost:5173',
  };
  
  Object.defineProperty(globalThis, 'import', {
    value: { meta: { env: globalThis.importMetaEnv } },
  });