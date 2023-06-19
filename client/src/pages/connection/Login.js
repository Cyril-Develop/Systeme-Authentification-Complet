import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from "react-router-dom";

export default function Login() {

    const initialValues = {
        email: "",
        password: ""
    };

    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const [toggle, setToggle] = useState(false);

    const showPassword = e => {
        e.preventDefault();
        setToggle(!toggle);
    };

    const { formError, login, successfulLogin } = useContext(AuthContext);

    const handleLogin = async e => {
		e.preventDefault();
		try {
			await login(formValues);
		} catch (error) {
			console.log(error);
		}
	};

    const navigate = useNavigate();

    useEffect(() => {
        if(successfulLogin){
            navigate("/");
        }
    }, [successfulLogin, navigate]);


    return (
        <main className="main">
            <form className="main_form">
                <h1>Connection</h1>
                <div className="main_form_group">
                    <label 
                        htmlFor="email"
                        className={formValues.email && 'animLabel'}>
                            Email
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={formValues.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="main_form_group">
                    <button className="main_form_group_icon" aria-label="show / hidden password" onClick={showPassword}>
                        {toggle ? <VisibilityOffIcon sx={{fontSize : "25px"}}/> : <VisibilityIcon sx={{fontSize : "25px"}}/>}
                    </button>
                    <label 
                        htmlFor="password"
                        className={formValues.password && 'animLabel'}>
                            Password
                    </label>
                    <input 
                        type={toggle ? "text" : "password"} 
                        name="password" 
                        id="password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                </div>
                {formError && <p className="inputError">Incorrect email or password</p>}
                <input type="submit" value="Login" className="btn" onClick={handleLogin}/>
                <h2>Not registered ? <Link to="/register">Register</Link></h2>   
            </form>
        </main>
    )
}
