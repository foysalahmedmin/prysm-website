import type {
  Category,
  Collection,
  FaqItem,
  JournalPost,
  PageContent,
  PageId,
  Product,
  ProductList,
  ProductQuery,
  Promo,
  Review,
  ShippingMethod,
  SiteContent,
  Store,
} from '@/domain'

/**
 * The only way UI code reads data. Every method is async so a static implementation
 * and a future HTTP implementation are interchangeable.
 */
export interface CatalogService {
  listProducts(query?: Partial<ProductQuery>): Promise<ProductList>
  listProductSlugs(): Promise<string[]>
  getProduct(slug: string): Promise<Product | null>
  getProductsByIds(ids: string[]): Promise<Product[]>
  getRelatedProducts(slug: string, limit?: number): Promise<Product[]>
  listCategories(): Promise<Category[]>
  getCategory(slug: string): Promise<Category | null>
  listCollections(): Promise<Collection[]>
  getCollection(slug: string): Promise<Collection | null>
  listReviews(productId: string): Promise<Review[]>
}

export interface ContentService {
  getSite(): Promise<SiteContent>
  getPage(id: PageId): Promise<PageContent>
  listFaq(): Promise<FaqItem[]>
  listJournal(): Promise<JournalPost[]>
  getJournalPost(slug: string): Promise<JournalPost | null>
  listStores(): Promise<Store[]>
}

export interface CommerceService {
  listShippingMethods(): Promise<ShippingMethod[]>
  findPromo(code: string): Promise<Promo | null>
}

export interface Services {
  catalog: CatalogService
  content: ContentService
  commerce: CommerceService
}
