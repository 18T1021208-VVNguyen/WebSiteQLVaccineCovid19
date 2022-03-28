
import PublicService from "../services/PublicService";
import { useHistory } from 'react-router-dom';
const Logout = () =>{
    const navigate = useHistory();
    const handleLogout = () =>{
        PublicService.logout();
        navigate.push("/");
        window.location.reload();
    }
    return (
        <p onClick={handleLogout} className="no_profile-iem-p">
            Đăng xuất    
        </p>
    )
}
export default Logout;