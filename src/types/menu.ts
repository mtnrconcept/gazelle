export type MenuItemData = {
  id: number;
  name: string;
  description: string | null;
  price: string | null;
  image: string | null;
  sortOrder: number;
};

export type MenuSectionData = {
  id: number;
  title: string;
  notes: string[] | null;
  sortOrder: number;
  items: MenuItemData[];
  subsections: MenuSectionData[];
};
