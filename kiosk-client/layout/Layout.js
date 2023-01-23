import Head from 'next/head';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';

import useKiosk from '../hooks/useKiosk';
import Sidebar from '../components/Sidebar';
import ModalProduct from '../components/ModalProduct';
import Steps from '../components/Steps';

import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#__next');

export default function Layout({ children, page }) {
  const { modal } = useKiosk();

  return (
    <>
      <Head>
        <title>Coffee - {page}</title>
        <meta name="description" content="Kiosk Coffee" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Sansita:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        
      </Head>

      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
          <Sidebar />
        </aside>
        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <div className="p-10">
            <Steps />
            {children}
          </div>
        </main>
      </div>

      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalProduct />
        </Modal>
      )}

      <ToastContainer />
    </>
  );
}
