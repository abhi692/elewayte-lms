export default function Badge({ children, tone="gray" }) {
  const map = {
    gray: "bg-gray-100 text-gray-600 border border-gray-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    green: "bg-green-50 text-green-700 border border-green-200",
  };
  return (
    <span className={`inline-flex items-center text-[11px] px-2.5 py-1 rounded-md ${map[tone]}`}>
      {children}
    </span>
  );
}
