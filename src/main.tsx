import { createRoot } from "react-dom/client";
import { Provider } from "./store";
import { Header, Hero, Trust, Destinations, Packages, HowItWorks, Vendors, Gallery, Testimonials, Contact, Footer, FloatingWhatsApp, Toast } from "./sections";
import { Builder } from "./builder";
import { Quiz, VendorDrawer } from "./overlays";

function App() {
  return (
    <Provider>
      <Header />
      <main>
        <Hero />
        <Trust />
        <Destinations />
        <Packages />
        <Builder />
        <HowItWorks />
        <Vendors />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Quiz />
      <VendorDrawer />
      <Toast />
    </Provider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
