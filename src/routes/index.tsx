import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen ">
      <Header />

      {/* Hero Section */}
      <section className="py-20 min-h-[500px] flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8 px-4 md:px-0"
            >
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Estudantes motivados e{" "}
                  <span className="text-primary">sua rotina simplificada</span>
                </h1>
                <p className=" text-base md:text-lg text-secondary-foreground/80 leading-relaxed">
                  Organize suas turmas e atividades pedagógicas de forma
                  intuitiva, seja você professor particular, coordenador
                  educacional ou gestor de instituições de ensino.
                </p>
              </div>

              <div className="flex  gap-4">
                <Button className="px-8 py-3 rounded-lg text-sm md:text-base  ">
                  Demonstração grátis
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-sm md:text-base bg-transparent"
                >
                  Ver exemplos
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="p-8">
                <div className="flex items-center justify-center">
                  <div className="relative w-[420px] max-sm:w-[80vw]">
                    <img src="/menino_hero.svg" className="w-full" alt="" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
