import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Projects from "@/components/home/Projects";
import Contact from "@/components/home/Contact";

export default function Home() {
    return (
        <main className="min-h-screen bg-sand text-ink">
            <CustomCursor />
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
        </main>
    );
}
