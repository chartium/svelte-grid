export type Position = { x: number; y: number };

export type Size = { w: number; h: number };

export type Area = Position & Size;

export type ItemLayout = Area & {
  fixed: boolean;
  resizable: boolean;
  draggable: boolean;
  min: Size & Partial<Position>;
  max: Partial<Area>;
  customDragger: boolean;
  customResizer: boolean;
};

export type ItemLayoutScaffold = Area & Partial<ItemLayout>;

export type Item<T = unknown> = {
  id: string;
  data: T;
  [key: number]: ItemLayout;
};

export type FlattenedItem<T = unknown> = { id: string; data: T } & ItemLayout;

export type Breakpoint = [containerWidth: number, numberOfColumns: number];
