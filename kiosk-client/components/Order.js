
const Order = ({order}) => {

  const { id, name, total, products } = order

  return (
    <div className="border p-10 space-y-5">
      <h3 className="text-2xl font-bold">Ordern: {id}</h3>
      <p className="text-lg font-bold">Cliente: {name}</p>
      <div>
        
      </div>
    </div>
  )
}

export default Order