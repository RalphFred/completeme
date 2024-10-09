export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  (
    <div className="flex-center">
      {children}
    </div>
  );
}