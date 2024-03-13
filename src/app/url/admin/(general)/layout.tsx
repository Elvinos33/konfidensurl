import Header from "@/components/Header";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";
import { validateUser } from "@/lib/login";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  const validationResponse = await validateUser(
    cookieStore.get("token")?.value,
  );

  if (!validationResponse.valid) {
    console.log(validationResponse.valid);
    permanentRedirect("/url/admin/login");
  }

  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
