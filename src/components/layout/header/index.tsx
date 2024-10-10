
import { useNavigate } from 'react-router-dom';
import logo from '../../../../logo.png';
import { User } from '../../../models/User';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { clearUserData, isAdmin } from '../../../store/redusers/UserReduser';
import { LogoutOutlined } from '@ant-design/icons';
import { storageService } from '../../../services/storangeService';
import { Avatar } from 'antd';
import { APP_ENV } from '../../../env';



const Header: React.FC = () => {
    const navigate = useNavigate();
    const user: User | undefined = useSelector((state: RootState) => state.userStore.user);
    const admin: boolean = useSelector((state: RootState) => isAdmin(state.userStore.user));
    const dispatcher = useDispatch();

    const Logout = () => {
        dispatcher(clearUserData())
        storageService.removeToken();
        navigate('Login');
    }
    return (
        <header>
            <div className=' w-100 d-flex  justify-content-between align-items-center'>
                <div className='d-flex gap-3 w-100 align-items-center'>
                    <img onClick={() => navigate('/')} style={{ marginLeft: 30, height: 60, width: 60, cursor: 'pointer' }} src={logo} alt='logo' />
                    <h5>Teлеграм бот</h5>
                </div>
                <div className=' d-flex gap-5 mx-4'>
                    {admin &&
                        <div className='d-flex gap-4'>
                            <div className='d-flex gap-2 align-items-center'>
                                <Avatar size={32} src={APP_ENV.SERVER_HOST+APP_ENV.IMAGES_FOLDER+'/200_'+user?.image}/>
                                <span className=' text-nowrap'>{user?.name} {user?.surname}</span>
                            </div>
                            <div className='d-flex gap-2 logout-element align-items-center' onClick={Logout}>
                                <LogoutOutlined />
                                <span>Вийти</span>
                            </div>
                        </div>}
                </div>
            </div>
        </header>
    );
}

export default Header;