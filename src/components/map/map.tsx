import GoogleMapReact from "google-map-react";
import { LucidePin } from "lucide-react";

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 53.4631,
      lng: -2.2913,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ width: "100%", height: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <LocationPin lat={53.4631} lng={-2.2913} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}

interface LocationPinProps {
  lat: number;
  lng: number;
  text: string;
}

const LocationPin = ({ text }: LocationPinProps) => (
  <div className="pin">
    <LucidePin />
    <p className="pin-text">{text}</p>
  </div>
);
