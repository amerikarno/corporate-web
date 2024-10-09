export type Transaction = {
  investment?: Investment;
  asset?: Asset;
};

export type Asset = {
  CreatedAt?: string | null;
  DeletedAt?: string | null;
  icoCode?: string;
  title?: string;
  logo?: string;
  issueBy?: string;
  image?: string;
  name?: string;
  description?: string;
  category?: string;
  return?: string;
  region?: string;
  minimum?: string;
};

export type Investment = {
  id?: string;
  CreatedAt?: string | null;
  DeletedAt?: string | null;
  customerCode?: number;
  icoCode?: number;
  amount?: number;
  value?: number;
  dueDate?: string | null;
  status?: string;
};
