export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return(
    <div className="flex-center h-screen">
      {children}
    </div>
  );
}