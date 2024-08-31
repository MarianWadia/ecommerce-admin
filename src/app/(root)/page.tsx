import { UserButton } from "@clerk/nextjs";

export default function SetupPage() {
  return (
    <main className="">
      Hello Admin,
      This is a protected route😎🔒 
      <UserButton afterSwitchSessionUrl="/" />
    </main>
  );
}
