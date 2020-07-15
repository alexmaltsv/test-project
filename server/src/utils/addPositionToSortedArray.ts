export const addPositionToSortedArray = <T extends { id: string; position: number }>(arr: T[]) =>
  arr.map((item, index) => {
    item.position = index;

    // TODO: performance?
    (item as any).save();
    return item;
  });
