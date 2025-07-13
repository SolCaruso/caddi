import Link from 'next/link';

export default function DownloadButton() {
  return (
    <Link href='/' className="bg-caddi-blue text-white text-base font-semibold font-sans rounded-full px-6 py-2 hover:bg-caddi-blue/90 transition-colors cursor-pointer ease-in-out-quad duration-100">
      Download App
    </Link>
  );
} 