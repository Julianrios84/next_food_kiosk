import Image from 'next/image'

const Sidebar = () => {
  return (
    <>
      <Image 
        width={300}
        height={100}
        src="/assets/img/logo.svg"
        alt="image logo"
      />
    </>
  )
}

export default Sidebar