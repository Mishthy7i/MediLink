export default function Footer() {
  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content mt-12 w-full fixed bottom-0 left-0 z-10">
      <div>
        <span className="font-bold text-primary text-lg">MediLink</span>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MediLink. All rights reserved.
        </p>
        <p className="text-xs text-gray-500">
          Built with <span className="text-accent">React</span> &amp; <span className="text-accent">Appwrite</span> | Designed with <span className="text-accent">DaisyUI</span>
        </p>
      </div>
    </footer>
  );
}