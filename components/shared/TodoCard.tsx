export default function TodoCard() {
  return (
    <div className="bg-blue-5 dark:bg-blue-1 p-4 rounded-lg w-full sm:w-[280px] lg:w-[250px] xl:w-[280px] 2xl:w-[320px]">
      <h1 className="text-xl">10/10</h1>
      <div className="flex gap-4">
        <input type="checkbox" />
        <span>Finish building contactME</span>
      </div>
      <div className="flex gap-4">
        <input type="checkbox" />
        <span>Finish building contactME</span>
      </div>
      <div className="flex gap-4">
        <input type="checkbox" />
        <span>Finish building contactME</span>
      </div>
    </div>
  );
}
