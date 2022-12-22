import { Image } from './Image';

export interface User {
  account_owner: boolean;
  bio: string;
  email: string;
  first_name: string;
  homepage: string;
  image: Image;
  last_name: string;
  name: string;
}
