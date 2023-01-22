import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const KioskContext = createContext();

const KioskProvider = ({ children }) => {
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
    const category = categories.filter((item) => item.id === id);
    setCategoryCurrent(category[0]);
  };

  const handleSetProduct = (product) => {
    setProduct(product);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const hadleAddOrder = ({ categoryId, picture, ...product }) => {
    if (order.some((item) => item.id === product.id)) {
      const updatedOrder = order.map((item) =>
        item.id === product.id ? product : item
      );
      setOrder(updatedOrder);
    } else {
      setOrder([...order, product]);
    }

    setModal(false)
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
        order
      }}
    >
      {children}
    </KioskContext.Provider>
  );
};

export { KioskProvider };
export default KioskContext;
