import { Magic } from 'magic-sdk';

import { MAGIC_PUBLIC_KEY } from '../utils/GetImageUrl';

// Create client-side Magic instance
const createMagic = (key) => {
  return (
    typeof window != 'undefined' &&
    new Magic(key, {
      locale:'fr',
    })
  );
};

export const magic = createMagic(MAGIC_PUBLIC_KEY);
