export function isPromise(obj: any) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

export function notNull(obj: any) {
  return obj !== undefined && obj !== null;
}
