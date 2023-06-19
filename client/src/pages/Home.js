import { useContext } from "react";
import { AuthContext } from '../context/authContext';

export default function Home() {

  const { currentUser } = useContext(AuthContext);

  return (
    <main className='main_home'>Welcome {currentUser.firstname} {currentUser.lastname} !</main>
  )
}
