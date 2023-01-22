import { PrismaClient } from '@prisma/client'

export default function Home({categories}) {
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