import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navibar from '@/components/Navibar';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
	title: '我的博客',
	description: '分享关于 Web 开发、设计和技术的见解和教程',
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={`antialiased flex flex-col min-h-screen`}>
					<Providers>
						<Navibar />
						<main className='flex-1 container mx-auto px-4 pt-24 pb-8'>
							{children}
						</main>
					</Providers>
				</body>
			</html>
		</ClerkProvider>
	);
}
