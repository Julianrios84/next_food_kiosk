import Image from 'next/image';
import useKiosk from '../hooks/useKiosk';

const Category = ({ category }) => {
  const { categoryCurrent, handleClickCategory } = useKiosk();
  const { name, icon, id } = category;

  return (
    <div
      className={`${
        categoryCurrent?.id === id ? 'bg-amber-400' : ''
      } flex items-center gap-5 w-full border p-5 hover:bg-amber-400 hover:cursor-pointer`}
      onClick={() => handleClickCategory(id)}
    >
      <Image
        width={60}
        height={60}
        src={`/assets/img/icono_${icon}.svg`}
        alt="Image icon"
        className="mr-5"
      />

      <button
        type="button"
        className="text-2xl font-bold "
       
      >
        {name}
      </button>
    </div>
  );
};

export default Category;
