import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useState, useEffect, useRef } from 'react';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	currentState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	currentState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleSideBar = () => {
		setIsOpen(!isOpen);
	};
	const sidebarRef = useRef<HTMLDivElement>(null);

	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(currentState.fontSizeOption);
	const [fontColor, setFontColor] = useState(currentState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		currentState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(currentState.contentWidth);

	useEffect(() => {
		if (isOpen) {
			setFontFamily(currentState.fontFamilyOption);
			setFontSize(currentState.fontSizeOption);
			setFontColor(currentState.fontColor);
			setBackgroundColor(currentState.backgroundColor);
			setContentWidth(currentState.contentWidth);
		}
	}, [isOpen, currentState]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor,
			backgroundColor,
			contentWidth,
		});
		setIsOpen(false);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

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
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h1 className={styles.heading}>Задайте параметры</h1>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={setFontFamily}
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={fontSize}
						title='Размер шрифта'
						onChange={setFontSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
						title='Ширина контента'
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
