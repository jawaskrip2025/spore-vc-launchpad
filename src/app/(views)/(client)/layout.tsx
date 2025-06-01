import MainFooter from "./_components/footer";
import MainNavbar from "./_components/navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNavbar />
      <main>{children}</main>
      <MainFooter />
    </>
  );
}
