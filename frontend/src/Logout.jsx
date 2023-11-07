import {useAuth} from './AuthContext.js';

const { setAuthUser, setIsLoggedIn } = useAuth();

const handleLogout =() => {
    //Removes user from the context
    setIsLoggedIn(false);
    //Deletes the user's token from the context
    setAuthUser('');
}

const Logout = () => {
    return (
        <li onClick={handleLogout}>Log out</li>
    )
}

export default Logout;