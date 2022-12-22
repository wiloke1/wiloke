export interface Record {
  shopName: string;
  customerEmail: string;
  chatLink: string;
  description: string;
  severity: 'low' | 'normal' | 'high' | 'urgent';
}
