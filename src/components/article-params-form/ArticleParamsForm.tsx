import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
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
import { useClose } from 'src/hooks/useClose';

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
	const closeMenu = () => setIsOpen(false);
	const toggleSideBar = () => {
		setIsOpen((prev) => !prev);
	};
	const sidebarRef = useRef<HTMLElement>(null);

	const [localState, setLocalState] = useState<ArticleStateType>(currentState);

	const handleChange = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setLocalState((prev) => ({ ...prev, [key]: value }));
	};

	useEffect(() => {
		if (isOpen) {
			setLocalState(currentState);
		}
	}, [isOpen, currentState]);

	useClose({
		isOpen,
		onClose: closeMenu,
		rootRef: sidebarRef,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(localState);
		closeMenu();
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setLocalState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSideBar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={localState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(val) => handleChange('fontFamilyOption', val)}
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={localState.fontSizeOption}
						title='Размер шрифта'
						onChange={(val) => handleChange('fontSizeOption', val)}
					/>
					<Select
						selected={localState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(val) => handleChange('fontColor', val)}
					/>
					<Separator />
					<Select
						selected={localState.backgroundColor}
						options={backgroundColors}
						onChange={(val) => handleChange('backgroundColor', val)}
						title='Цвет фона'
					/>
					<Select
						selected={localState.contentWidth}
						options={contentWidthArr}
						onChange={(val) => handleChange('contentWidth', val)}
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
