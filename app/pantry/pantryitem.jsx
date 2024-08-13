import { useRouter } from 'next/navigation'

export default function PantryItem({ item }) {
  const router = useRouter();
  const today = new Date();
  let date = new Date(item.expiryDate.seconds * 1000);
  let time_difference = date.getTime() - today.getTime();
  let days_difference = Math.ceil(time_difference / (1000 * 3600 * 24));

  console.log(item);

  return (
    <button className="w-dvw" onClick={() => router.push(`/pantry/${item.id}`)}>
    <div className="border-b p-4 flex justify-between items-center hover:bg-gray-800">
      <div className="text-left">
        <p className="text-lg">{item.name}</p>
        <p className="text-sm text-gray-500 flex items-center">
          {
            days_difference > 0 && `Expires in ${days_difference} days`
          }
          {
            days_difference == 0 && `Expires today`
          }
          {
            days_difference < 0 && `Expired ${Math.abs(days_difference)} days ago`
          }
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg">{item.quantity}</p>
      </div>
    </div>
    </button>
  );
}
