import Link from "next/link"
import { Container } from "@/components/ui/container"

export default function NotFound() {
  return (
    <main className="flex-1  flex flex-col min-h-[50vh]">
      <Container className="flex-1">
        <div className="flex flex-col justify-center h-full text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-2xl sm:text-3xl font-bold text-caddi-blue">404</span>
            <div className="w-px h-8 bg-black/20 mx-6"></div>
            <div className="text-left">
              <h1 className="text-base font-medium text-black/50">This page could not be found.</h1>
            </div>
          </div>
          <div className="mt-4 sm:mt-6">
            <Link 
              href="/" 
              className="inline-block  border border-caddi-blue text-caddi-blue font-semibold py-2.5 px-8 rounded-full hover:bg-caddi-blue hover:text-white transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
} 