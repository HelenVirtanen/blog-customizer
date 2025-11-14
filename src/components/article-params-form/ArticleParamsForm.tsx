import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontFamilyClasses,
} from 'src/constants/articleProps';
import { useState, useEffect, useRef } from 'react';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleSideBar = () => {
		setIsOpen(!isOpen);
	};

	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const closeSidebarByEscape = (e: KeyboardEvent) => {
			e.key === 'Escape' && setIsOpen(false);
		};

		const closeSidebarByClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('keydown', closeSidebarByEscape);
		document.addEventListener('mousedown', closeSidebarByClickOutside);

		return () => {
			document.removeEventListener('keydown', closeSidebarByEscape);
			document.removeEventListener('mousedown', closeSidebarByClickOutside);
		};
	}, []);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSideBar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<h1 className={styles.heading}>Задайте параметры</h1>
					<Select
						selected={{
							title: 'Open Sans',
							value: 'Open Sans',
							className: fontFamilyClasses[0],
						}}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
