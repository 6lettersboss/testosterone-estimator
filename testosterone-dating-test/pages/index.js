import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ textAlign: 'center', paddingTop: 100 }}>
      <h1>MOJO KING Dating Type Test</h1>
      <Link href="/datingtest">
        <button style={{ fontSize: 18, padding: '10px 20px', marginTop: 30 }}>
          Take Free Test
        </button>
      </Link>
    </main>
  );
}
