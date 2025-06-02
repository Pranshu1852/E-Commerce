export type InputRef = {
  validation: () => { error: string; isError: boolean };
  value: string;
};

export type SharedRef = {
  navigate: (path: string) => void;
};
