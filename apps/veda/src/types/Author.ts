export interface Author {
  id: number;
  name: string;
  profileUrl: string;
  createdDateGMT: string;
  updatedDateGMT: string;
  roles: Array<{
    id: number;
    name: string;
  }>;
  email: string;
  shopName: string;
}
