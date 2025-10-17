export function isStoreOpen(
  openH: number,
  openM: number,
  closeH: number,
  closeM: number
): boolean {
  const base = new Date();
  const now = +base;
  const openTs = new Date(
    base.getFullYear(),
    base.getMonth(),
    base.getDate(),
    openH,
    openM,
    0,
    0
  ).getTime();
  const closeTs = new Date(
    base.getFullYear(),
    base.getMonth(),
    base.getDate(),
    closeH,
    closeM,
    0,
    0
  ).getTime();
  return now >= openTs && now < closeTs; // true → open
}
