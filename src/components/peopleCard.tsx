type TPeopleCardProps = {
  firstName: string;
  middleName?: string;
  lastName: string;
  position: string;
  history: string;
  picture: string;
};
export function PeopleCard({
  firstName,
  middleName,
  lastName,
  position,
  history,
  picture,
}: TPeopleCardProps) {
  return (
    <div className="w-full flex flex-row gap-4">
      <img src={picture} alt="" className="w-12 h-12" />
      <div className="flex flex-col flex-grow">
        <p className="text-black font-bold">
          {firstName} {middleName} {lastName}
          <span className="text-gray-400 px-3">{position}</span>
        </p>
        <p className="text-gray-400">{history}</p>
      </div>
    </div>
  );
}
