import Profile from '../../assets/images/profile.webp'
import Logo from '../../assets/icons/logo_v2_.svg'

const Home = () => {
  return (
    <>
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='flex flex-col justify-start'>
          <div className='relative w-fit h-fit flex border-[0.6rem] border-solid border-clr-project-main-light rounded-full'>
            <img src={Profile} alt='profile' className='w-64 h-64 rounded-full' />
            <img src={Logo} alt='logo' className='w-16 h-16 absolute rounded-full right-1 bottom-1' />
          </div>
          <h1>Comming soon...</h1>
        </div>
      </div>
    </>
  )
}

export default Home
