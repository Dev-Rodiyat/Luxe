export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-amber-50 relative overflow-hidden px-4">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-300 rounded-full blur-3xl opacity-30 animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-200 rounded-full blur-2xl opacity-30 animate-pulse delay-200 -z-10" />

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6 z-10">
        <h1 className="text-3xl font-bold text-emerald-700 text-center">{title}</h1>
        {children}
      </div>
    </div>
  );
}
