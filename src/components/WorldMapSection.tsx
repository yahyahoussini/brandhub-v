import { WorldMap } from "@/components/ui/world-map";

export function WorldMapSection() {
  return (
    <div className="py-40 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center px-4">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Connectivité{" "}
          <span className="text-neutral-400 animate-fade-in">
            Mondiale
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          Présence internationale avec expertise locale. Nous servons nos clients à travers le monde
          depuis nos bureaux stratégiquement positionnés.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <WorldMap
          dots={[
            // Morocco to Europe
            {
              start: { lat: 33.5731, lng: -7.5898 }, // Morocco (Casablanca)
              end: { lat: 40.4168, lng: -3.7038 }, // Spain (Madrid)
            },
            {
              start: { lat: 33.5731, lng: -7.5898 }, // Morocco
              end: { lat: 48.8566, lng: 2.3522 }, // France (Paris)
            },
            {
              start: { lat: 40.4168, lng: -3.7038 }, // Spain (Madrid)
              end: { lat: 51.5074, lng: -0.1278 }, // UK (London)
            },
            {
              start: { lat: 40.4168, lng: -3.7038 }, // Madrid
              end: { lat: 41.9028, lng: 12.4964 }, // Italy (Rome)
            },

            // Morocco to Middle East
            {
              start: { lat: 33.5731, lng: -7.5898 }, // Morocco (Casablanca)
              end: { lat: 24.7136, lng: 46.6753 }, // Saudi Arabia (Riyadh)
            },
            {
              start: { lat: 33.5731, lng: -7.5898 }, // Morocco
              end: { lat: 25.2048, lng: 55.2708 }, // UAE (Dubai)
            },
            {
              start: { lat: 24.7136, lng: 46.6753 }, // Saudi Arabia (Riyadh)
              end: { lat: 25.2048, lng: 55.2708 }, // UAE (Dubai)
            },
            {
              start: { lat: 25.2048, lng: 55.2708 }, // Dubai
              end: { lat: 25.2854, lng: 51.5310 }, // Qatar (Doha)
            },
            {
              start: { lat: 24.7136, lng: 46.6753 }, // Riyadh
              end: { lat: 29.3759, lng: 47.9774 }, // Kuwait
            },
            {
              start: { lat: 25.2048, lng: 55.2708 }, // Dubai
              end: { lat: 24.4539, lng: 54.3773 }, // Abu Dhabi
            },

            // Morocco to North Africa
            {
              start: { lat: 33.5731, lng: -7.5898 }, // Morocco (Casablanca)
              end: { lat: 36.7538, lng: 3.0588 }, // Algeria (Algiers)
            },
            {
              start: { lat: 33.5731, lng: -7.5898 }, // Morocco
              end: { lat: 36.8065, lng: 10.1815 }, // Tunisia (Tunis)
            },
            {
              start: { lat: 36.7538, lng: 3.0588 }, // Algeria
              end: { lat: 36.8065, lng: 10.1815 }, // Tunisia
            },
            {
              start: { lat: 36.8065, lng: 10.1815 }, // Tunisia
              end: { lat: 30.0444, lng: 31.2357 }, // Egypt (Cairo)
            },

            // Morocco to Sub-Saharan Africa
            {
              start: { lat: 33.5731, lng: -7.5898 }, // Morocco
              end: { lat: 14.6928, lng: -17.4467 }, // Senegal (Dakar)
            },
            {
              start: { lat: 14.6928, lng: -17.4467 }, // Senegal
              end: { lat: 6.5244, lng: 3.3792 }, // Nigeria (Lagos)
            },
            {
              start: { lat: 6.5244, lng: 3.3792 }, // Nigeria
              end: { lat: -1.2921, lng: 36.8219 }, // Kenya (Nairobi)
            },
            {
              start: { lat: -1.2921, lng: 36.8219 }, // Kenya
              end: { lat: -26.2041, lng: 28.0473 }, // South Africa (Johannesburg)
            },

            // Middle East to Africa
            {
              start: { lat: 30.0444, lng: 31.2357 }, // Egypt (Cairo)
              end: { lat: 24.7136, lng: 46.6753 }, // Saudi Arabia (Riyadh)
            },
            {
              start: { lat: 30.0444, lng: 31.2357 }, // Egypt
              end: { lat: -1.2921, lng: 36.8219 }, // Kenya (Nairobi)
            },
          ]}
          lineColor="#6366f1"
        />
      </div>
    </div>
  );
}
