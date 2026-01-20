import { Application } from "@/types";

/* eslint-disable @next/next/no-img-element */
export default function AppCard({ app }: { app: Application }) {
    return (
        <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card block p-6 no-underline text-white h-full relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-4 mb-4 relative z-10">
                {app.imageUrl ? (
                    <img
                        src={app.imageUrl}
                        alt={app.name}
                        className="w-16 h-16 rounded-xl object-cover shadow-lg border border-white/10"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-2xl font-bold shadow-lg border border-white/10">
                        {app.name.charAt(0).toUpperCase()}
                    </div>
                )}
                <div>
                    <h3 className="text-xl font-bold m-0">{app.name}</h3>
                    <span className="text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20 mt-1 inline-block">
                        View App &rarr;
                    </span>
                </div>
            </div>

            {app.stack && (
                <div className="relative z-10 pt-4 border-t border-white/5 mt-4">
                    <p className="text-gray-400 text-sm line-clamp-2">{app.stack}</p>
                </div>
            )}
        </a>
    );
}
