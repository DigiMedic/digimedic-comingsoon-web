import React from 'react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Admin</h1>
      <nav className="mb-4">
        <ul>
          <li>
            <Link href="/admin/posts" className="text-blue-500 hover:underline">
              Spravovat články
            </Link>
          </li>
          <li>
            <Link href="/admin/create" className="text-blue-500 hover:underline">
              Vytvořit nový článek
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}