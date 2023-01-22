import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const KioskContext = createContext();

const KioskProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryCurrent, setCategoryCurrent] = useState({});
  const [product, setProduct] = useState({});
  const [modal, setModal] = useState(false);

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
        handleChangeModal
      }}
    >
      {children}
    </KioskContext.Provider>
  );
};

export { KioskProvider };
export default KioskContext;
