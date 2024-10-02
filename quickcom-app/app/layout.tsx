import Navbar from '@/components/navbar/NavBar';
import '@/styles/globals.scss';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="overflow-x-hidden">
				<Navbar />
				{children}
			</body>
		</html>
	);
}
