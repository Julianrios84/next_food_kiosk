import axios from 'axios';
import Image from 'next/image';
import { toast } from 'react-toastify'
import { formatterMoney } from '../helpers';

const Order = ({ order }) => {
  const { id, name, total, products } = order;

  const completedOrder = async () => {
   try {
    await axios.post(`/api/order/${id}`)
    toast.success('Orden lista')
   } catch (error) {
    toast.error('Hubo un error')
    console.log("🚀 ~ file: Order.js:11 ~ completedOrder ~ error", error)
   }
  };

  return (
    <div className="border p-10 space-y-5">
      <h3 className="text-2xl font-bold">Ordern: {id}</h3>
      <p className="text-lg font-bold">Cliente: {name}</p>

      <div>
        {products.map((product) => (
          <div
            key={product.id}
            className="py-3 flex border-b last-of-type:border-0 items-center"
          >
            <div className="w-32">
              <Image
                width={100}
                height={150}
                src={`/assets/img/${product.picture}.jpg`}
                alt={`Image product ${product.name}`}
              />
            </div>
            <div className="p-5 space-y-2">
              <h4 className="text-xl font-bold text-amber-500">
                {product.name}
              </h4>
              <p className="text-lg font-bold">Cantidad: {product.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="md:flex md:items-center md:justify-between my-10">
        <p className="mt-5 font-black text-4xl text-amber-500">
          Total a pagar: {formatterMoney(total)}
        </p>

        <button
          className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded"
          type="button"
          onClick={completedOrder}
        >
          Completar orden
        </button>
      </div>
    </div>
  );
};

export default Order;
