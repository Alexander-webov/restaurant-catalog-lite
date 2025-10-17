let seq = 0;
export function nextIntId(): number {
  const base = Date.now() * 1000;
  seq = (seq + 1) % 1000;
  const id = base + seq;
  if (id > Number.MAX_SAFE_INTEGER) throw new Error("id overflow");
  return id;
}
