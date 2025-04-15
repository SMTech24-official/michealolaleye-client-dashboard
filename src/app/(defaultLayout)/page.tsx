import BestsellingTable from "@/components/modules/Dashboard/BestsellingTable";
import OverView from "@/components/modules/Dashboard/OverView";
import RecommendedTable from "@/components/modules/Dashboard/RecommendedTable";

const CommonLayoutHomePage = () => {
  return (
    <div>
      <OverView />
      <div className="grid md:grid-cols-2 gap-6 md:mt-16 mt-8">
        <BestsellingTable />
        <RecommendedTable />
      </div>
    </div>
  );
};

export default CommonLayoutHomePage;
