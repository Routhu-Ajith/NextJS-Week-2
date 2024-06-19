const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-xl">My Application</h1>
                <div className="flex space-x-4">
                    <a href="#" className="text-white">Home</a>
                    <a href="#" className="text-white">About</a>
                    <a href="#" className="text-white">Title</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;