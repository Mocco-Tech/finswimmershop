export type MenuType = {
  id: string;
  title: string;
  url: string;
  items: {
    id: string;
    title: string;
    url: string;
    items: {
      id: string;
      title: string;
      url: string;
      items: { id: string; title: string; url: string }[];
    }[];
  }[];
};
