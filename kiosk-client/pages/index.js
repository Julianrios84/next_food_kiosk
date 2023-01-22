import { useEffect } from 'react'
import { PrismaClient } from '@prisma/client'

export default function Home({categories}) {

  useEffect(() => {
    const consultDb =  async () => {
      const prisma = new PrismaClient();
      const categories = await prisma.category.findMany() 
      console.log("🚀 ~ file: index.js:10 ~ consult ~ categories", categories)
    }
    consultDb()
  }, [])
  

  return (
    <div>
      <h1 className=''>Next</h1>
    </div>
  )
}


export const getServerSideProps = async () => {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany()
  return {
    props: {
      categories
    }
  }
}