import { Application } from "@/types";
import AppCard from "@/components/AppCard";
import Header from "@/components/Header";
import prisma from "@/lib/prisma";

// Force dynamic since we are creating new apps
export const dynamic = 'force-dynamic';

async function getApps() {
  try {
    const apps = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
    });
    // Serialize dates for Client Components if needed, but AppCard uses Application type where createdAt is string in our interface?
    // Wait, Prisma returns Date object. We need to stringify it because Server Components -> Client Components boundary.
    // Actually, we can just map it.
    return apps.map(app => ({
      ...app,
      createdAt: app.createdAt.toISOString()
    })) as Application[];
  } catch (e) {
    console.error("Failed to fetch apps", e);
    return [];
  }
}

export default async function Home() {
  const apps = await getApps();

  return (
    <main>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 pb-2">
            My Services & Apps
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A showcase of my applications, services, and the technologies powering them.
          </p>
        </div>

        {apps.length === 0 ? (
          <div className="text-center py-20 text-gray-500 glass-panel rounded-xl">
            <p className="text-xl">No applications added yet.</p>
            <p className="mt-2 text-sm">Click "Add Service" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
