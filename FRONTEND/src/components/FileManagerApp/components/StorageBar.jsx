const StorageBar = ({ usedMB, totalMB = 200 }) => {
  const TotalUsedMB=formatBytesToMB(usedMB);
  const percentage = Math.min((TotalUsedMB / totalMB) * 100, 100);

 
  let barColor = "bg-green-500";
  if (percentage > 80) barColor = "bg-red-500";
  else if (percentage > 50) barColor = "bg-yellow-400";

  
function formatBytesToMB(bytes, withUnit = false) {
  if (bytes === 0) return 0;
  const mb = bytes / (1024 * 1024);
  const value = parseFloat(mb.toFixed(2));
  return withUnit ? `${value} MB` : value;
}

  return (
  <div className="w-full max-w-sm">
      <div className="flex justify-between mb-1 text-sm font-light text-[var(--foreground)]">
        <span>
          {formatBytesToMB(usedMB)} / {totalMB} MB
        </span>
      </div>
      <div className="w-full h-4 bg-[var(--muted)] rounded-full overflow-hidden">
        
        <div
          className={`h-4 rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs mt-1 text-[var(--muted-foreground)]">
      </div>
    </div>
  );
};

export default StorageBar;
