import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen flex justify-center items-center">
      <div className="mx-auto max-w-screen-2xl p-4 flex flex-col justify-between items-center">
        <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
          <Image
            className="mb-3"
            src="/images/e-commerce.png"
            width={200}
            height={35}
            alt="Dashboard Logo"
          />
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
