export default function StatsCard({ icon: Icon, label, value, color, iconBgColor }) {
  return (
    <div className="bg-[var(--card)] rounded-md sm:rounded-xl shadow-sm sm:shadow-md  shadow-blue-600/20 border-l-3  border-b-2 border-[var(--stats-card-border)] p-2 sm:p-5 transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--secondary-text)]">{label}</p>
          <p className={`text-xl sm:text-3xl font-medium mt-2 text-[var(--muted-foreground)]`}>{value}</p>
        </div>
        <div className={`${iconBgColor} p-1 sm:p-3 rounded-md flex items-center justify-center`}>
          <Icon className={` h-4 w-5 sm:w-6 sm:h-6 ${color}`} />
        </div>
      </div>
    </div>
  );
 
}
