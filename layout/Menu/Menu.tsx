import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import GraduationHatIcon from './icons/graduation-hat.svg';
import CloudIcon from './icons/cloud.svg';
import CardboardBoxIcon from './icons/cardboard-box.svg';
import BooksIcon from './icons/books.svg';
import { TopPageCategory } from '../../interfaces/page.interface';
import Link from 'next/link';

const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: 'Courses', icon: <GraduationHatIcon />, id: TopPageCategory.Courses },
	{ route: 'services', name: 'Services', icon: <CloudIcon />, id: TopPageCategory.Services },
	{ route: 'books', name: 'Books', icon: <BooksIcon />, id: TopPageCategory.Books },
	{ route: 'products', name: 'Products', icon: <CardboardBoxIcon />, id: TopPageCategory.Products }
]

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);

	const buildMenuFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(menuItem => (
					<div key={menuItem.route}>
						<Link href={`/${menuItem.route}`}>
							<a>
								<div className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: menuItem.id == firstCategory
								})}>
									{menuItem.icon}
									<span>{menuItem.name}</span>
								</div>
							</a>
						</Link>
						{menuItem.id == firstCategory && buildMenuSecondLevel(menuItem)}
					</div>
				))}
			</>
		);
	};

	const buildMenuSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map(m => (
					<div key={m._id.secondCategory}>
						<div className={styles.secondLevel}>{m._id.secondCategory}</div>
						<div className={cn(styles.secondLevelBlock, {
							[styles.secondLevelBlockOpened]: m.isOpened
						})}>
							{buildMenuThirdLevel(m.pages, menuItem.route)}
						</div>
					</div>
				))}
			</div>
		)
	};

	const buildMenuThirdLevel = (pages: PageItem[], route: string) => {
		return (
			pages.map(p => (
				<Link href={`/${route}/${p.alias}`}>
					<a className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: false
					})}>
						{p.category}
					</a>
				</Link>
			))
		);
	};

	return (
		<div className={styles.menu}>
			{buildMenuFirstLevel()}
		</div>
	);
};