import Theme from './Themes';
const Header = ({ title }) => {
	
	return (
		<header className='bg-base-200 border-b border-primary-content shadow-md w-full'>
			<div className='w-full max-w-7xl mx-auto p-4 flex items-center justify-between'>
				<h1 className='text-2xl font-semibold'>{title}</h1>
				<div className='flex items-center space-x-4'>
					<Theme />
				</div>
			</div>
		</header>
	);
};
export default Header;