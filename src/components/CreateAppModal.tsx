"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAppModal({ onClose }: { onClose: () => void }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        imageUrl: "",
        stack: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/apps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.refresh();
                onClose();
            } else {
                alert("Failed to create app");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating app");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="glass-panel w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-6 text-white">Add Application</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name">App Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. My Awesome App"
                        />
                    </div>

                    <div>
                        <label htmlFor="url">Application URL</label>
                        <input
                            type="url"
                            id="url"
                            required
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="imageUrl">Logo / Image URL</label>
                        <input
                            type="url"
                            id="imageUrl"
                            value={formData.imageUrl}
                            onChange={(e) =>
                                setFormData({ ...formData, imageUrl: e.target.value })
                            }
                            placeholder="https://example.com/logo.png"
                        />
                    </div>

                    <div>
                        <label htmlFor="stack">Tech Stack</label>
                        <input
                            type="text"
                            id="stack"
                            value={formData.stack}
                            onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                            placeholder="React, Next.js, MySQL..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn text-gray-300 hover:bg-white/10"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Add Application"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
