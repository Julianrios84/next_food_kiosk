import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

const KioskContext = createContext();

const KioskProvider = ({ children }) => {

  const router = useRouter()

  const [categories, setCategories] = useState([]);
  const [categoryCurrent, setCategoryCurrent] = useState({});
  const [product, setProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState([]);

  const getCategories = async () => {
    const { data } = await axios('api/categories');
    setCategories(data);
  };

  const handleClickCategory = (id) => {
    const category = categories.find((item) => item.id === id);
    setCategoryCurrent(category);
    router.push('/')
  };

  const handleSetProduct = (product) => {
    setProduct(product);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleUpdatedQuantity = (id) => {
    const updatedProduct = order.find(item => item.id === id);
    setProduct(updatedProduct)
    setModal(!modal);
  }

  const handleRemoveProduct = (id) => {
    const updatedOrder = order.filter(item => item.id !== id);
    setOrder(updatedOrder)
  }



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

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCategoryCurrent(categories[0]);
  }, [categories]);

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
        handleRemoveProduct
      }}
    >
      {children}
    </KioskContext.Provider>
  );
};

export { KioskProvider };
export default KioskContext;
