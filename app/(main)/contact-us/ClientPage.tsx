// app/contact-us/ClientPage.tsx
	'use client';

	import { useEffect } from 'react';
	import { hidePageLoader } from '@/app/GlobalRedux/app/appSlice';
	import { useDispatch, useSelector } from 'react-redux';
	import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
	import { updateThemeSettings } from '@/app/GlobalRedux/theme/themeSlice';

	import PageRenderer from '@/components/PageRenderer';
	import { getComponent } from '@/components/registry';

	export default function ClientPage({ 
		themeData, 
		pageData 
	}: { 
		themeData: any; 
		pageData: any; 
	}) {
 
		const theme = useSelector((state: RootState) => state.theme); 
		const dispatch = useDispatch<AppDispatch>();

		const NavComponent = getComponent(themeData.theme_settings?.nav_component);
		const FooterComponent = getComponent(themeData.theme_settings?.footer_component);
 
	    useEffect(() => { 
	        dispatch(hidePageLoader());
	    }, [dispatch]);

		 useEffect(() => {
        	console.log("theme.theme_settings?.is_default", theme.theme_settings?.is_default)
			if (theme.theme_settings?.is_default == "Yes") {
				console.log("handling initial updateThemeSettings()",themeData.theme_settings)
				dispatch(updateThemeSettings(themeData.theme_settings));
			} 
		}, [theme.theme_settings?.is_default]); 

		return (
			<div className="flex flex-col min-h-screen">
				{/* Dynamic Navigation */}
				{NavComponent ? (
					<NavComponent is_theme={false} transparent={true} />
				) : (
					<nav className="h-20 bg-gray-900 flex items-center justify-center text-white">
						Nav Component Not Found
					</nav>
				)}

				<main className="flex-1 w-full">
					<PageRenderer data={pageData} is_theme={false}  />
				</main>

				{/* Dynamic Footer */}
				{FooterComponent ? (
					<FooterComponent is_theme={false} />
				) : (
					<footer className="h-20 bg-gray-900 flex items-center justify-center text-white">
						Footer Component Not Found
					</footer>
				)}
			</div>
		);
	}
	