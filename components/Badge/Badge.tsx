import { BadgeProps } from './Badge.props';
import styles from './Badge.module.css';
import cn from 'classnames';

export const Badge = ({ size = 'm', children, color = 'ghost', href, className, ...props }: BadgeProps): JSX.Element => {
	return (
		<div
			className={cn(styles.badge, className, {
				[styles.s]: size == 's',
				[styles.m]: size == 'm',
				[styles.ghost]: color == 'ghost',
				[styles.red]: color == 'red',
				[styles.grey]: color == 'grey',
				[styles.green]: color == 'green',
				[styles.primary]: color == 'primary'
			})}
			{...props}
		> {
				href
					? <a href={href}>{children}</a>
					: <>{children}</>
			}
		</div>
	)
}