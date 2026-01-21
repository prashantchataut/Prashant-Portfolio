import Hero from "@/components/home/Hero";
import Philosophy from "@/components/home/Philosophy";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Projects from "@/components/home/Projects";

export default function Home() {
    return (
        <main className="min-h-screen bg-sand text-ink selection:bg-accent selection:text-sand">
            <Hero />
            <Philosophy />
            <About />
            <Skills />
            <Projects />
        </main>
    );
}
