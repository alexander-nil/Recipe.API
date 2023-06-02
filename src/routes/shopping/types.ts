export interface IProduct {}

export interface IProduct {
  id: string;
  type: string;
  ean: string;
  name: string;
  manufacturerName: string;
  description: string;
  imageUrl: string;
  salesPrice: number;
  salesPriceData: SalesPriceData;
  piecePrice: number;
  piecePriceData: SalesPriceData;
  promotionPrice: number;
  promotionPriceData: SalesPriceData;
}

interface SalesPriceData {
  b2cPrice: number;
  b2bPrice: number;
}
