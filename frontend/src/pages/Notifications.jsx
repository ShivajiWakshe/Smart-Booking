export default function Notifications() {
  const alerts = [
    "Booking Confirmed",
    "Reminder: Appointment at 4 PM",
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>

      {alerts.map((msg, i) => (
        <div key={i} className="bg-yellow-100 p-3 mb-2 rounded">
          {msg}
        </div>
      ))}
    </div>
  );
}