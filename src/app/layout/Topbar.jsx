export default function Topbar() {
  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-5">
      <div className="font-medium">Welcome Abhishek!</div>
      <div className="text-sm text-gray-500 space-x-4">
        <button className="hover:text-gray-700">Schedule session</button>
        <span>•</span>
        <button className="hover:text-gray-700">What’s New</button>
      </div>
    </header>
  );
}
