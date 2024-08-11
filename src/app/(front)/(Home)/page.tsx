import MeetingTypeList from "@/components/HomeComponents/MeetingTypeList";

export default async function Home() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-BN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-BN", { dateStyle: "full" }).format(
    now
  );
  return (
    <section className="flex size-full flex-col gap-10">
      <div className="h-[300px] w-full rounded-3xl bg-cover bg-[url('/images/hero-background.png')]">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="max-w-[270px] py-2 text-center text-base rounded-lg bg-slate-900">
            Upcoming Meeting at: 12:30 pm
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl lg:text-7xl font-extrabold">{time}</h1>
            <p className="text-lg font-medium text-sky-600 lg:text-2xl">
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
}
