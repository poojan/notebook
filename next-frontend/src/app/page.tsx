import NewNote from '@/components/NewNote'
import Notes from '@/components/Notes'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <NewNote />
      <Notes />
    </main>
  )
}
