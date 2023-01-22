import Layout from '../layout/Layout';
import useKiosk from '../hooks/useKiosk';

export default function Home() {

  const { categoryCurrent } = useKiosk()

  return (
    <Layout page={`Menú ${categoryCurrent?.name}`}>
      <h1 className='text-4xl font-black'>{categoryCurrent?.name}</h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuación
      </p>
    </Layout>
  )
}


