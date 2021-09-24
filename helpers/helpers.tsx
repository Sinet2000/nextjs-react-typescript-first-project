import GraduationHatIcon from './icons/graduation-hat.svg';
import CloudIcon from './icons/cloud.svg';
import CardboardBoxIcon from './icons/cardboard-box.svg';
import BooksIcon from './icons/books.svg';
import { TopPageCategory } from '../interfaces/page.interface';
import { FirstLevelMenuItem } from '../interfaces/menu.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: 'Courses', icon: <GraduationHatIcon />, id: TopPageCategory.Courses },
	{ route: 'services', name: 'Services', icon: <CloudIcon />, id: TopPageCategory.Services },
	{ route: 'books', name: 'Books', icon: <BooksIcon />, id: TopPageCategory.Books },
	{ route: 'products', name: 'Products', icon: <CardboardBoxIcon />, id: TopPageCategory.Products }
];

export const priceRu = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽');

export const declOfNum = (number: number, titles: [string, string, string]): string => {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};