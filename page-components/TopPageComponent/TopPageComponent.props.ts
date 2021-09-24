import { TopPageCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';

export interface TopPageComponentProps {
	firstCategory: TopPageCategory;
	page: TopPageModel;
	products: ProductModel[];
}