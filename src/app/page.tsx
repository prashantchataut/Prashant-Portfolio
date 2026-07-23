import NameHero from '@/components/hero/NameHero';
import Philosophy from '@/components/home/Philosophy';
import About from '@/components/home/About';
import Skills from '@/components/home/Skills';
import Projects from '@/components/home/Projects';

export default function Home() {
    return (
        <>
            <NameHero />
            <Projects />
            <About />
            <Philosophy />
            <Skills />
        </>
    );
}
