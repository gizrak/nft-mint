import 'dotenv/config';

export default {
  get: (key: string): string => {
    const value = process.env[key];
    if (value === undefined) {
      throw `${key} is undefined`;
    }
    return value;
  },
  optional: (key: string) => {
    const value = process.env[key];
    return value || '';
  },
};
