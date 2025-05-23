import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="bg-cyan-500 shadow-md flex flex-row items-center justify-between py-5 px-10">
      <Link to="/" className="text-3xl text-white font-bold">
        E-Commerce
      </Link>
      <div className="flex flex-row gap-5 font-semibold text-white text-xl">
        <Link to="/signup">SignUp</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
