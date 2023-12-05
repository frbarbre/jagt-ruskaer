import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '150px',
  borderRadius: '4px',
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
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={center}>
      <Marker position={center} />
    </GoogleMap>
  );
}
