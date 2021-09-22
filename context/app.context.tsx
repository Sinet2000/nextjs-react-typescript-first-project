import { createContext, PropsWithChildren, useState } from 'react';
import { MenuItem } from '../interfaces/menu.interface';
import { TopPageCategory } from '../interfaces/page.interface';

export interface IAppContext {
	menu: MenuItem[];
	firstCategory: TopPageCategory;
	setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({ menu: [], firstCategory: TopPageCategory.Courses });

export const AppContextProvider = ({ menu, firstCategory, children }: PropsWithChildren<IAppContext>): JSX.Element => {
	const [menuState, setMenuState] = useState<MenuItem[]>(menu);
	const setMenu = (newMenu: MenuItem[]) => {
		setMenuState(newMenu);
	};

	return <AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
		{children}
	</AppContext.Provider>
};