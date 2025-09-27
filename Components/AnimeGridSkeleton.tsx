export default function AnimeGridSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-10 mt-16">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="border dark:border-white border-black rounded-lg p-2 h-fit animate-pulse"
        >
          <div className="w-[200px] h-[300px] bg-gray-300 dark:bg-gray-700 rounded-lg mb-2" />
          <div className="w-[180px] h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
          <div className="flex justify-between">
            <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="w-12 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="w-8 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}