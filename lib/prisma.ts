import { PrismaClient } from '@prisma/client'

// Prisma Client'ı sadece bir kez başlatmak için singleton deseni kullanıyoruz.
const prisma = new PrismaClient()

// Prisma Client'ı dışarıya aktarıyoruz, böylece diğer dosyalarda kullanabiliriz.
export default prisma