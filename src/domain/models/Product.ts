export class Product {
  public id: number;
  public created_at: Date;
  public rating: number;
  public review_count: number;
  public href: string;
  public description: string;
  public imageSrc: string;
  public imageAlt: string;
  public discount: number;
  public status: number;
  public brandId: number;
  public stock: number;

  constructor(
    public name: string,
    public price: number,
    public category: string
  ) {}
}

  
