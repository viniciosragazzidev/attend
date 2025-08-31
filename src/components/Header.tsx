import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4  lg:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-10">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-34 flex items-center justify-center">
                  <img src="/logo.svg" alt="Kyper" className="w-full" />
                </div>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8  text-[14px] text-secondary-foreground">
              <Link to="/" className=" hover:text-primary">
                Funções
              </Link>
              <Link to="/" className=" hover:text-primary">
                Recursos extras
              </Link>
              <Link to="/" className=" hover:text-primary">
                Preços
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant={"outline"} className=" font-semibold">
              Ver Exemplo{" "}
              <span className="-rotate-45">
                <ArrowRight />
              </span>
            </Button>
            <Link to="/signin">
              <Button>Entrar</Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
