import { useNavigate } from 'react-router-dom';
import { auth } from 'fbase';

const Profile = () => {
  const navigation = useNavigate();

  const onLogOutClick = () => {
    auth.signOut();
    navigation('/');
  }

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;