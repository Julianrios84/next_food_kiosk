import Image from 'next/image';
import { formatterMoney } from '../helpers';
import useKiosk from '../hooks/useKiosk';


const Product = ({ product }) => {
  const { handleSetProduct, handleChangeModal } = useKiosk();
  const { name, picture, price } = product;

  return (
    <div className="border p-3">
      <Image
        src={`/assets/img/${picture}.jpg`}
        alt={`Image platillo ${name}`}
        width={400}
        height={500}
      />
      <div className="p-5">
        <h3 className="text-2xl font-black">{name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatterMoney(price)}
        </p>
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
          onClick={() => {
            handleChangeModal()
            handleSetProduct(product)
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Product;
