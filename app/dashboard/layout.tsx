import Menu from "@/components/menu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <div className="flex w-[15%] h-full">
        <div className="flex w-full">
          <Menu />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-[85%] bg-[#FBFBFD] overflow-y-scroll flex flex-col">
        {children}
      </div>
    </div>
  );
}
