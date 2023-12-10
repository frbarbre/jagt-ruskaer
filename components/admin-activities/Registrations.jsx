import { User } from 'lucide-react';
import Heading from '../shared/Heading';
import UserCard from '../shared/UserCard';
import AddUser from './AddUser';

export default function Registrations({
  registrations,
  maxParticipants,
  activity,
  profiles,
  currentDogs,
}) {
  let people = 0;

  for (let i = 0; i < registrations.length; i++) {
    people += registrations[i].participants;
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Heading
          icon={<User />}
          title={`Tilmeldte ${
            maxParticipants && `(${people}/${maxParticipants})`
          }`}
        />
        {maxParticipants > people && (
          <AddUser
            activity={activity}
            profiles={profiles}
            maxParticipants={maxParticipants}
            currentParticipants={people}
            currentDogs={currentDogs}
          />
        )}
      </div>
      <section className="flex flex-col gap-3 mt-5">
        {registrations.map((registration) => (
          <UserCard
            avatar={registration.profile.avatar_url}
            dogs={registration.dogs}
            email={registration.profile.email}
            isRegistration={true}
            firstName={registration.profile.first_name}
            lastName={registration.profile.last_name}
            participants={registration.participants}
            phone={registration.profile.phone_number}
            registration_id={registration.id}
            user_id={registration.profile.id}
            key={registration.id}
          />
        ))}
      </section>
    </>
  );
}
