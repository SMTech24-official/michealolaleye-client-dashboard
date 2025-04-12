import BestsellingTable from "@/components/modules/Dashboard/BestsellingTable";
import OverView from "@/components/modules/Dashboard/OverView";

const CommonLayoutHomePage = () => {
  return (
    <div>
      <OverView />
      <div className="grid md:grid-cols-2 gap-6 md:mt-16 mt-8">
        <BestsellingTable />
      </div>
    </div>
  );
};

export default CommonLayoutHomePage;
