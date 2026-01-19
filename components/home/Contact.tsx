"use client";
import MagneticButton from "../ui/MagneticButton";

export default function Contact() {
    return (
        <footer id="contact" className="bg-ink text-sand pt-24 pb-12 rounded-t-[3rem] relative -mt-8 z-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
                <p className="text-sm uppercase tracking-[0.3em] text-sand/50 mb-8">What's Next?</p>
                <h2 className="text-[12vw] leading-none font-bold tracking-tighter mb-12">
                    LET'S WORK <br /> TOGETHER
                </h2>

                <MagneticButton className="mb-24">
                    <a href="mailto:prashantchataut8@gmail.com" className="inline-block px-12 py-6 bg-sand text-ink rounded-full text-xl font-bold hover:scale-110 transition-transform duration-300">
                        prashantchataut8@gmail.com
                    </a>
                </MagneticButton>

                <div className="w-full flex flex-col md:flex-row justify-between items-center pt-12 border-t border-sand/10 text-sm text-sand/50 gap-6">
                    <p>© {new Date().getFullYear()} Prashant Chataut</p>
                    <div className="flex gap-8">
                        <a href="https://github.com/prashantchataut" className="hover:text-sand transition-colors">Github</a>
                        <a href="https://www.instagram.com/prashantchataut_/" className="hover:text-sand transition-colors">Instagram</a>
                        <a href="#" className="hover:text-sand transition-colors">LinkedIn</a>
                    </div>
                    <p className="uppercase tracking-widest hidden md:block">Nepal</p>
                </div>
            </div>
        </footer>
    );
}
