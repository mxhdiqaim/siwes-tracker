import { type FC } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Import custom Marker icons to fix a common issue with react-leaflet icons
import L from "leaflet";

// Fix for the default marker icon missing in Webpack/Vite builds
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
    center: { lat: number; lng: number };
    markers: { position: { lat: number; lng: number }; label: string; icon?: string }[];
}

const containerStyle = {
    width: "100%",
    height: "100%", // MapContainer needs 100% height, parent will define max-height
};

const MapDisplay: FC<MapProps> = ({ center, markers }) => {
    return (
        <MapContainer center={[center.lat, center.lng]} zoom={15} scrollWheelZoom={true} style={containerStyle}>
            {/* 1. Add the Tile Layer (OpenStreetMap default tiles) */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* 2. Loop through Markers */}
            {markers.map((marker, index) => (
                <Marker key={index} position={[marker.position.lat, marker.position.lng]}>
                    {/* Use a Popup to display the location label */}
                    <Popup>
                        {marker.label}
                        <br />
                        Lat: {marker.position.lat}, Lng: {marker.position.lng}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapDisplay;
