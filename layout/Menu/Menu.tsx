import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext, KeyboardEvent, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { m, motion, useReducedMotion } from 'framer-motion';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
	const shouldReduceMotion = useReducedMotion();
	const router = useRouter();

	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion ? {} : {
				when: 'beforeChildren',
				staggerChildren: 0.1
			}
		},
		hidden: { marginBottom: 0 }
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 29
		},
		hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 }
	};

	const handleOpenMenuSecondLevel = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m => {
			if (m._id.secondCategory == secondCategory) {
				setAnnounce(m.isOpened ? 'closed' : 'opened');
				m.isOpened = !m.isOpened;
			}
			return m;
		}));
	};

	const handleOpenSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			handleOpenMenuSecondLevel(secondCategory);
		}
	};

	const buildMenuFirstLevel = () => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map(menuItem => (
					<li key={menuItem.route} aria-expanded={menuItem.id == firstCategory}>
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
					</li>
				))}
			</ul>
		);
	};

	const buildMenuSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}
					return (
						<li key={m._id.secondCategory}>
							<button
								onKeyDown={(key: KeyboardEvent) => handleOpenSecondLevelKey(key, m._id.secondCategory)}
								className={styles.secondLevel}
								onClick={() => handleOpenMenuSecondLevel(m._id.secondCategory)}
								aria-expanded={m.isOpened}
							>{m._id.secondCategory}</button>
							<motion.ul
								layout
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								className={styles.secondLevelBlock}
							>
								{buildMenuThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildMenuThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return (
			pages.map(p => (
				<motion.li key={p._id} variants={variantsChildren}>
					<Link href={`/${route}/${p.alias}`}>
						<a
							tabIndex={isOpened ? 0 : -1}
							className={cn(styles.thirdLevel, {
								[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
							})}
							aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}
						>
							{p.category}
						</a>
					</Link>
				</motion.li>
			))
		);
	};

	return (
		<nav className={styles.menu} role='navigation'>
			{announce && <span role="log" className="visualyHidden">{announce == 'opened' ? 'развернуто' : 'свернуто'}</span>}
			{buildMenuFirstLevel()}
		</nav>
	);
};