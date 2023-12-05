import CreateActivityForm from '@/components/admin-activities/CreateActivityForm';

export default async function CreateActivity({ searchParams }) {
  const placeId = searchParams.place_id;

  let data = null;

  if (placeId) {
    const mapUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_API_KEY}&place_id=${placeId}`;
    const mapData = await fetch(mapUrl);
    data = await mapData.json();
  }
  return (
    <CreateActivityForm
      position={data?.result.geometry.location}
      placeId={placeId}
    />
  );
}
