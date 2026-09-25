import { randomBytes } from 'node:crypto';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';

// random bytes are taken from a pool: one `randomBytes` call per id was a syscall per route
const POOL_SIZE = 4096;
let pool = randomBytes(POOL_SIZE);
let poolOffset = 0;

/** random 12 chars id (`[a-z0-9]`) */
const generateId = (size = 12) => {
  if (size > POOL_SIZE) {
    const bytes = randomBytes(size);
    return Array.from(bytes, (byte) => ALPHABET[byte % ALPHABET.length]).join('');
  }
  if (poolOffset + size > POOL_SIZE) {
    pool = randomBytes(POOL_SIZE);
    poolOffset = 0;
  }
  let id = '';
  for (let i = 0; i < size; i++) {
    id += ALPHABET[pool[poolOffset + i] % ALPHABET.length];
  }
  poolOffset += size;
  return id;
};

export { generateId };
