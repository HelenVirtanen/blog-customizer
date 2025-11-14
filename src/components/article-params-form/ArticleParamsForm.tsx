import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect } from 'react';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleSideBar = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			e.key === 'Escape' && setIsOpen(false);
		};

		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSideBar} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
