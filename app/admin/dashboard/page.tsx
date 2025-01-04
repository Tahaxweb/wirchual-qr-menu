import React from 'react'
import { cookies } from 'next/headers' // next/headers kullanarak cookie'lere erişiyoruz

interface PageProps {
  userId: string | null
}

function Page({ userId }: PageProps) {
  return (
    <div>
      {userId ? (
        <p>Giriş yapmış kullanıcının ID&apos;si: {userId}</p>
      ) : (
        <p>Kullanıcı girişi yapılmamış.</p>
      )}
    </div>
  )
}

// Sunucu tarafında cookie'yi almak için cookies fonksiyonunu kullanıyoruz
export async function getServerSideData(): Promise<PageProps> {
  const cookieStore = await cookies() // cookies() asenkron olduğu için await kullanıyoruz
  const sessionCookie = cookieStore.get('auth_token') // auth_token cookie'sini alıyoruz

  let userId: string | null = null

  if (sessionCookie) {
    // Burada token çözümleme veya doğrulama işlemi yapılabilir
    userId = sessionCookie.value // Cookie'nin değeri olarak userId'yi alıyoruz
  }

  return { userId }
}

export default async function PageWrapper() {
  const { userId } = await getServerSideData()
  return <Page userId={userId} />
}