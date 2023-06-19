import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

export default function Navbar() {

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <header>
            <nav className='navbar'>
                <Link className='navbar_link' onClick={handleLogout}>
                    <LogoutIcon sx={{ fontSize: "25px" }} /> Logout
                </Link>
            </nav>
        </header>
    );
}
