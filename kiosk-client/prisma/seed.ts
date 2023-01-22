import { categories } from './data/categories';
import { products } from './data/products';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

const main = async () : Promise<void> => {
  try {
      await prisma.category.createMany({
        data: categories
      })

      await prisma.product.createMany({
        data: products
      })
  } catch (error) {
    console.log("🚀 ~ file: seed.ts:18 ~ main ~ error", error)
  }
}

main()