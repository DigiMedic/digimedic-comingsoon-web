// Odstraňte import PocketBase
// import PocketBase from 'pocketbase';

// Upravte logiku API routy, aby nepoužívala PocketBase
export async function GET(request: Request) {
  return new Response("Hello from DigiMedic API!", { status: 200 });
}

export async function POST(request: Request) {
  // Zde můžete implementovat logiku pro POST požadavky
  return new Response("POST request received", { status: 200 });
}
