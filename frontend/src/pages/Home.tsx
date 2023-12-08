import Hero from '../components/Hero';
import Services from '../components/Services';
import Products from '../components/Products';
import Pricing from '../components/Pricing';
import About from '../components/About';
import Contact from '../components/Contact';

    const Home = (): JSX.Element => {
  return (
    <div id='home'>
      <Hero />
      <Services />
      <Products />
      <Pricing />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
