import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const KioskContext = createContext();

const KioskProvider = ({ children }) => {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [categoryCurrent, setCategoryCurrent] = useState({});
  const [product, setProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState([]);
  const [name, setName] = useState('');
  const [total, setTotal] = useState(0);

  const getCategories = async () => {
    const { data } = await axios('api/categories');
    setCategories(data);
  };

  const handleClickCategory = (id) => {
    const category = categories.find((item) => item.id === id);
    setCategoryCurrent(category);
    router.push('/');
  };

  const handleSetProduct = (product) => {
    setProduct(product);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleUpdatedQuantity = (id) => {
    const updatedProduct = order.find((item) => item.id === id);
    setProduct(updatedProduct);
    setModal(!modal);
  };

  const handleRemoveProduct = (id) => {
    const updatedOrder = order.filter((item) => item.id !== id);
    setOrder(updatedOrder);
  };

  const hadleAddOrder = ({ categoryId, ...product }) => {
    if (order.some((item) => item.id === product.id)) {
      const updatedOrder = order.map((item) =>
        item.id === product.id ? product : item
      );
      setOrder(updatedOrder);
      toast.success('Pedido actualizado');
    } else {
      setOrder([...order, product]);
      toast.success('Producto agregado al pedido');
    }
    setModal(false);
  };

  const acceptOrder = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/orders', {
        order,
        name,
        total,
        date: Date.now().toString()
      });
      console.log("🚀 ~ file: KioskProvider.jsx:73 ~ acceptOrder ~ data", data)
    } catch (error) {
      console.log(
        '🚀 ~ file: KioskProvider.jsx:73 ~ acceptOrder ~ error',
        error
      );
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCategoryCurrent(categories[0]);
  }, [categories]);

  useEffect(() => {
    const totalOrder = order.reduce(
      (total, product) => product.price * product.quantity + total,
      0
    );
    setTotal(totalOrder);
  }, [order]);

  return (
    <KioskContext.Provider
      value={{
        categories,
        categoryCurrent,
        handleClickCategory,
        product,
        handleSetProduct,
        modal,
        handleChangeModal,
        hadleAddOrder,
        order,
        handleUpdatedQuantity,
        handleRemoveProduct,
        name,
        setName,
        acceptOrder,
        total
      }}
    >
      {children}
    </KioskContext.Provider>
  );
};

export { KioskProvider };
export default KioskContext;
