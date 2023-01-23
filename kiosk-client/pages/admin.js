import useSWR from 'swr'
import axios from 'axios'
import LayoutAdmin from "../layout/LayoytAdmin";

export default function Admin() {

  const fetcher = () => axios('/api/orders').then(data => data.data);
  const { data, error, isLoading } = useSWR('/api/orders', fetcher)

  return (
    <LayoutAdmin page={'Admin'}>
      <h1 className="text-4xl font-black">Panel de Administración</h1>
      <p className="text-2xl my-10">Administra las ordenes</p>
    </LayoutAdmin>
  )
}