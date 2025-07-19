export function Footer({ className = "" }) {
  return (
    <footer className={`bg-white border-t mt-12 py-6 px-4 text-center text-gray-600 text-sm ${className}`}>
      <p>© {new Date().getFullYear()} Trackfi. All rights reserved.</p>
    </footer>
  );
}