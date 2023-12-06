import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Skeleton } from "../ui/skeleton";
const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "190px",
  borderRadius: "4px",
};

export default function GoogleMaps({ position }) {
  const center = {
    lat: position.lat, // default latitude
    lng: position.lng, // default longitude
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });

  if (loadError) {
    return (
      <div className={"w-full h-[190px] flex items-center justify-center"}>
        Error loading maps
      </div>
    );
  }

  if (!isLoaded) {
    return <Skeleton className={"w-full h-[190px]"} />;
  }

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={center}>
      <Marker position={center} />
    </GoogleMap>
  );
}
