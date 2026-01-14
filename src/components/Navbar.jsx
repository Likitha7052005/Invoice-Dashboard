import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex justify-between items-center px-6 py-4 bg-black/50 backdrop-blur border-b border-white/10">
      <h1 className="text-xl font-bold">Invoice Dashboard</h1>

      {!user ? (
        <button
          onClick={openSignIn}
          className="px-6 py-2 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)]"
        >
          Login
        </button>
      ) : (
        <UserButton />
      )}
    </div>
  );
};

export default Navbar;
