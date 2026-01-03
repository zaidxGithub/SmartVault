import { LayoutListIcon, Shield, ShieldAlert, ShieldCheck, Star, Clock, LayoutGridIcon } from 'lucide-react';
import StatsCard from './StatsCard.jsx';
import { connectAuthEmulator } from 'firebase/auth';

export default function StatsDashboard( stats ) {

 const statsArray=stats.stats[0];
return (
  <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-1 sm:gap-2 lg:gap-2 ">
    <StatsCard
      icon={LayoutGridIcon}
      label="Total "
      value={statsArray?.totalPasswords || 0}
      color="text-[var(--all-color)]"
      iconBgColor="bg-[var(--background)]"
    />
    <StatsCard
      icon={ShieldAlert}
      label="Weak"
      value={statsArray?.weakCount || 0}
      color="text-[var(--sheild-weak-color)]"
      iconBgColor="bg-[var(--background)]"
    />
    <StatsCard
      icon={Shield}
      label="Medium"
      value={statsArray?.mediumCount || 0}
      color="text-[var(--sheild-Medium-color)]"
      iconBgColor="bg-[var(--background)]"
    />
    <StatsCard
      icon={ShieldCheck}
      label="Strong"
      value={statsArray?.strongCount || 0}
      color="text-[var(--sheild-Strong-color)]"
      iconBgColor="bg-[var(--background)]"
    />
    <StatsCard
      icon={Star}
      label="Important"
      value={statsArray?.importantCount || 0}
      color="text-[var(--important-color)]"
      iconBgColor="bg-[var(--background)]"
    />
    <StatsCard
      icon={Clock}
      label="Expiring Soon"
      value={statsArray?.expiringSoonCount || 0}
      color="text-[var(--clock-expiry-color)]"
      iconBgColor="bg-[var(--background)]"
    />
  </div>
);


}
