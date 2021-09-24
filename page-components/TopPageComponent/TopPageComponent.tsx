import { Badge, Htag, Card, HHData, Advantages, Ptag, Sort } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { TopPageCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useReducer } from 'react';
import { sortReducer } from './sort.reducer';

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort });
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag='h1'>{page.title}</Htag>
				{products && <Badge color='grey' size='m'>{products.length}</Badge>}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div>
				{products && products.map(p => (
					<div key={p._id}>{p.title}</div>
				))}
			</div>
			<div className={styles.hhTitle}>
				<Htag tag='h2'>Vacancies - {page.category}</Htag>
				<Badge color='red' size='m'>hh.ru</Badge>
			</div>
			{firstCategory == TopPageCategory.Courses && <HHData {...page.hh} />}
			{page.advantages && page.advantages.length > 0 && <>
				<Htag tag='h2'>Advantages</Htag>
				<Advantages advantages={page.advantages} />
			</>
			}
			{page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
			<Htag tag='h2'>Skills acquired</Htag>
			{page.tags.map(t => <Ptag key={t} color='primary'>{t}</Ptag>)}
		</div>
	);
};