import Widget from "@/components/dashboard/Widget";
import Stat from "@/components/dashboard/Stat";
import {
  FireIcon,
  LightBulbIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

interface StatsProps {
  totalRecipes: string;
  streaks: { longest: number; current: number };
}

export default function Stats({ totalRecipes, streaks }: StatsProps) {
  return (
    <>
      <Widget size="small">
        <Stat title="Total Recipes" value={totalRecipes} color="purple">
          <LightBulbIcon className="w-8 h-8 text-purple-500" />
        </Stat>
      </Widget>
      <Widget size="small">
        <Stat
          title="Longest Streak"
          value={`${streaks.longest} days`}
          color="yellow"
        >
          <TrophyIcon className="w-8 h-8 text-yellow-500" />
        </Stat>
      </Widget>
      <Widget size="small">
        <Stat
          title="Current Streak"
          value={`${streaks.current} days`}
          color="red"
        >
          <FireIcon className="w-8 h-8 text-red-500" />
        </Stat>
      </Widget>
    </>
  );
}
