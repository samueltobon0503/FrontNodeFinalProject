export interface ProductModel {
  id:         string;
  name:        string;
  description: string;
  price:       string;
  stock:       number;
  categoryId:  string;
  imageUrl:    string;
  active:      boolean;
  createdAt:   Date;
}
