import ButtonGradient from  "./assets/svg/ButtonGradient";
import Benefits from "./components/Benifits";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
const App=() => {
  

  return (
    <>
    
    <div className="pt-[4.75rem] lg:pt-[5.25rem] position-fixed">
     <Header/>
     <Hero/>
     </div>
     <div>
     <Benefits/>
</div><div>
     <Roadmap/>
     <Pricing/>
    </div>
    <ButtonGradient/>
    </>
  );
};

export default App
