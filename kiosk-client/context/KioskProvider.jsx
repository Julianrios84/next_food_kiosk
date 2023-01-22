import { useState, useEffect, createContext } from 'react';

const KioskContext = createContext();

const KioskProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryCurrent, setCategoryCurrent] = useState({})

  const getCategories = async () => {
    const { data } = await axios('api/categories');
    setCategories(data);
  };

  const handleClickCategory = (id) => {
    const category = categories.filter(item => item.id === id)
    setCategoryCurrent(category[0])
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCategoryCurrent(categories[0])
  }, [categories])

  return <KioskContext.Provider value={{categories, categoryCurrent, handleClickCategory}}>{children}</KioskContext.Provider>;
};

export { KioskProvider };
export default KioskContext;
