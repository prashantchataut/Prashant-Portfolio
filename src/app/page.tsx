import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Projects from "@/components/home/Projects";

export default function Home() {
    return (
        <main className="min-h-screen bg-sand text-ink">
            <Hero />
            <About />
            <Skills />
            <Projects />
        </main>
    );
}
