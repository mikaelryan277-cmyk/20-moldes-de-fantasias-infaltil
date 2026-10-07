/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ChevronDown, 
  Clock, 
  Download, 
  FileText, 
  Lock, 
  Printer, 
  Scissors, 
  Star,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- CONFIGURATION ---
const CHECKOUT_URL = "#"; // Replace with real checkout link
const PRODUCT_NAME = "20 Moldes de Fantasias Infantis";
const PRICE = "19,90";
const OLD_PRICE = "97,00";

// --- ASSETS ---
const IMAGES = {
  hero: "/src/assets/images/hero_mockup_1791402111308.jpg",
  guarantee: "/src/assets/images/guarantee_seal_1791402122921.jpg",
  sample1: "/src/assets/images/costume_sample_1_1791402133658.jpg",
  sample2: "/src/assets/images/costume_sample_2_1791402142657.jpg",
  bonus: "/src/assets/images/bonus_kit_mockup_1791402151011.jpg",
};

// --- COMPONENTS ---

const UrgencyBar = () => {
  const [date, setDate] = useState("");
  
  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    setDate(formatted);
  }, []);

  return (
    <div className="bg-[#E11D48] text-white py-2 text-center text-xs font-bold uppercase tracking-wider sticky top-0 z-50">
      🔥 Oferta Especial Disponível Hoje ({date})
    </div>
  );
};

const CTAButton = ({ children, className = "", secondary = false }: { children: React.ReactNode, className?: string, secondary?: boolean }) => (
  <a 
    href={CHECKOUT_URL}
    className={`
      inline-flex items-center justify-center w-full py-4 px-6 rounded-xl font-black text-lg transition-all active:scale-95 shadow-lg
      ${secondary 
        ? "bg-white text-[#10B981] border-2 border-[#10B981] hover:bg-slate-50" 
        : "bg-[#10B981] text-white hover:bg-[#059669] shadow-[#10B981]/20"}
      ${className}
    `}
  >
    {children}
  </a>
);

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-8 px-4">
    <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-2 uppercase tracking-tight">
      {children}
    </h2>
    {subtitle && <p className="text-slate-600 text-sm md:text-base">{subtitle}</p>}
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
      >
        <span className="font-bold text-slate-800 pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-slate-600 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky after passing the hero section
      if (window.scrollY > 800) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden">
      <UrgencyBar />

      {/* --- HERO SECTION --- */}
      <section className="bg-white pt-8 pb-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              20 Moldes Digitais em PDF
            </span>
          </div>
          
          <h1 className="text-3xl font-black text-center leading-[1.1] mb-6 tracking-tighter">
            Crie Fantasias Infantis Incríveis com Moldes Prontos para Imprimir <span className="inline-block">✂️</span>
          </h1>

          <p className="text-slate-600 text-center text-sm md:text-base mb-8 px-2">
            Receba uma coleção com 20 moldes de fantasias infantis em PDF, preparados para impressão em folha A4.
          </p>

          <div className="bg-slate-50 rounded-2xl p-6 mb-8 space-y-3">
            {[
              "20 moldes digitais exclusivos",
              "Arquivos em PDF de alta qualidade",
              "Impressão fácil em folha A4",
              "Acesso imediato após a compra"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-emerald-500 rounded-full p-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold text-slate-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center animate-bounce mb-2">
            <p className="text-xs font-bold text-slate-400">Veja abaixo tudo o que você vai receber 👇</p>
          </div>
        </div>
      </section>

      {/* --- PRODUCT GALLERY --- */}
      <section className="py-12 px-4 bg-white border-y border-slate-100">
        <div className="max-w-md mx-auto">
          <SectionTitle subtitle="São 20 moldes de fantasias infantis reunidos em um único pacote.">
            Olha quanta coisa você poderá criar 😍
          </SectionTitle>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden relative">
               <img src={IMAGES.sample1} alt="Molde Leão" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-bold">MOLDE LEÃO</div>
            </div>
            <div className="aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden relative">
               <img src={IMAGES.sample2} alt="Molde Fada" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-bold">MOLDE FADA</div>
            </div>
            {/* Generating 18 placeholders as requested */}
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-4 group">
                <div className="text-center space-y-2">
                  <Scissors className="w-8 h-8 text-slate-300 mx-auto" />
                  <span className="block text-[10px] font-black text-slate-400 uppercase">Molde {i + 3}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FIRST OFFER --- */}
      <section className="py-16 px-4 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-rose-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-md mx-auto relative z-10 text-center">
          <p className="text-rose-400 font-black uppercase tracking-widest text-xs mb-4">OFERTA POR TEMPO LIMITADO</p>
          <h2 className="text-2xl font-black mb-2 uppercase italic tracking-tighter">Leve os 20 moldes completos por apenas:</h2>
          
          <div className="flex flex-col items-center justify-center mb-8">
            <span className="text-slate-400 line-through text-lg font-bold">De R$ {OLD_PRICE}</span>
            <div className="flex items-start">
              <span className="text-2xl font-black mt-2 mr-1">R$</span>
              <span className="text-7xl font-black tracking-tighter text-emerald-400">{PRICE}</span>
            </div>
            <span className="bg-emerald-400/20 text-emerald-300 px-4 py-1 rounded-full text-[10px] font-black uppercase mt-2">Pagamento Único</span>
          </div>

          <div className="space-y-4 mb-8">
            <CTAButton>QUERO RECEBER OS 20 MOLDES</CTAButton>
            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Pagamento Seguro</span>
              <span className="flex items-center gap-1"><Download className="w-3 h-3" /> Acesso Digital</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left">
            {[
              { icon: CheckCircle2, text: "Acesso digital" },
              { icon: FileText, text: "20 moldes em PDF" },
              { icon: Printer, text: "Impressão em A4" },
              { icon: Lock, text: "Compra segura" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 p-3 rounded-lg">
                <item.icon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-slate-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-md mx-auto">
          <SectionTitle subtitle="Tudo pensado para facilitar sua produção">
            É muito simples usar seus moldes
          </SectionTitle>

          <div className="grid grid-cols-1 gap-4">
            {[
              { step: "01", title: "ESCOLHA", desc: "Escolha a fantasia que deseja produzir no seu catálogo PDF.", icon: Star },
              { step: "02", title: "IMPRIMA", desc: "Imprima as páginas do molde em folhas A4 comuns na sua casa.", icon: Printer },
              { step: "03", title: "PREPARE", desc: "Monte o molde seguindo as guias e utilize-o para preparar o tecido.", icon: Scissors },
              { step: "04", title: "COSTURE", desc: "Siga as orientações do material e produza sua peça em minutos.", icon: CheckCircle2 }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <item.icon className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-rose-400">{item.step}</span>
                    <h3 className="font-black text-slate-900 tracking-tighter">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHAT YOU GET --- */}
      <section className="py-16 px-4 bg-slate-50 overflow-hidden">
        <div className="max-w-md mx-auto">
          <SectionTitle subtitle="Seu material fica disponível para sempre em seu e-mail">
            Tudo organizado para você acessar quando precisar
          </SectionTitle>

          <div className="relative mb-8 px-4">
            <div className="absolute inset-0 bg-rose-200 blur-3xl opacity-30 rounded-full"></div>
            <img 
              src={IMAGES.hero} 
              alt="Digital Product Mockup" 
              className="w-full h-auto relative z-10 rounded-2xl shadow-2xl border border-white"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-3">
            {[
              "20 moldes digitais exclusivos",
              "Arquivos em PDF em alta resolução",
              "Material totalmente preparado para impressão",
              "Acesso digital imediato pós confirmação"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-bold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOR WHO --- */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-md mx-auto">
          <SectionTitle>
            Esse pacote é para você que...
          </SectionTitle>

          <div className="space-y-4">
            {[
              "Gosta de costurar peças infantis para filhos ou netos",
              "Quer economizar tempo criando moldes do zero",
              "Procura novas ideias de fantasias criativas",
              "Quer ter vários modelos reunidos em um único pacote prático",
              "Prefere a praticidade de imprimir os moldes em casa"
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="bg-rose-50 rounded-full p-2 shrink-0">
                  <Check className="w-4 h-4 text-rose-500" />
                </div>
                <p className="text-sm font-bold text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BONUS SECTION --- */}
      <section className="py-16 px-4 bg-amber-50">
        <div className="max-w-md mx-auto">
          <div className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit mx-auto mb-4">
            BÔNUS EXCLUSIVO
          </div>
          <SectionTitle subtitle="Comprando hoje você ganha um presente especial">
            Kit 3 Princesas de Bônus 👑
          </SectionTitle>

          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-amber-900/5 border border-amber-200">
            <img 
              src={IMAGES.bonus} 
              alt="Bônus Kit 3 Princesas" 
              className="w-full h-auto rounded-2xl mb-6 shadow-md"
              referrerPolicy="no-referrer"
            />
            <h3 className="text-xl font-black text-center mb-2">Grade Completa de 1 a 14 anos</h3>
            <p className="text-slate-600 text-center text-sm mb-6">
              Além dos 20 moldes, você recebe o nosso kit queridinho com as 3 princesas mais famosas.
            </p>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <span className="text-amber-800 font-bold text-xs uppercase">VALOR DO BÔNUS: </span>
              <span className="text-amber-800 font-black line-through">R$ 47,00</span>
              <span className="text-emerald-600 font-black ml-2 text-lg">HOJE: GRÁTIS</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- GUARANTEE --- */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-50 border-2 border-slate-100 rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
            
            <img 
              src={IMAGES.guarantee} 
              alt="Garantia de 7 dias" 
              className="w-24 h-24 mx-auto mb-6 drop-shadow-xl"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-2xl font-black mb-4 tracking-tighter">Você tem 7 dias para conhecer o material</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Após a compra, você poderá acessar o produto e avaliá-lo dentro do prazo de garantia informado no checkout. Consulte as condições aplicáveis. Sua satisfação é nossa prioridade.
            </p>
            <div className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Lock className="w-3 h-3" /> Compra 100% Segura
            </div>
          </div>
        </div>
      </section>

      {/* --- RE-OFFER --- */}
      <section className="py-16 px-4 bg-white border-t border-slate-100">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-black mb-4 tracking-tighter leading-tight">20 Moldes de Fantasias Infantis por apenas R$19,90</h2>
          
          <div className="bg-slate-50 p-6 rounded-2xl mb-8 space-y-3 text-left">
            <div className="flex items-center justify-between font-bold text-slate-700 text-sm">
              <span>20 Moldes Diversos</span>
              <Check className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-center justify-between font-bold text-slate-700 text-sm">
              <span>Formato PDF Digital</span>
              <Check className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-center justify-between font-bold text-slate-700 text-sm">
              <span>Impressão A4 Facilitada</span>
              <Check className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-center justify-between font-bold text-slate-700 text-sm">
              <span>Acesso Digital Vitalício</span>
              <Check className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          <div className="mb-8">
            <div className="text-3xl font-black text-emerald-500">R$ 19,90</div>
            <p className="text-xs font-bold text-slate-400">PAGAMENTO ÚNICO • SEM MENSALIDADES</p>
          </div>

          <CTAButton className="mb-4">QUERO MEUS MOLDES AGORA</CTAButton>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Acesso enviado imediatamente no seu e-mail</p>
        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-md mx-auto">
          <SectionTitle subtitle="Depoimentos de quem já está colocando a mão na massa">
            Veja o que nossas clientes estão criando
          </SectionTitle>

          <div className="space-y-4 mb-8">
            {/* Facebook style Testimonials */}
            {[
              { name: "Juliana Martins", text: "Amei esse pacote! Comprei na semana passada e chegou certinho no meu e-mail. Vale super a pena!", date: "1 h" },
              { name: "Ana Lúcia Santos", text: "Quero comprar também, vou fazer pro meu netinho de 2 anos. 😍", date: "3 h" },
              { name: "Kátia Luciana F.", text: "Esses moldes me ajudam demais, agilizam meu trabalho e as partes se encaixam certinho.", date: "1 d" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 font-black text-xs">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-none mb-1">{t.name}</h4>
                    <span className="text-[10px] text-slate-400 font-bold">{t.date}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-snug">{t.text}</p>
                <div className="mt-3 pt-3 border-t border-slate-100 flex gap-4">
                  <button className="text-[10px] font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest">Curtir</button>
                  <button className="text-[10px] font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest">Responder</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-xl border-2 border-dashed border-slate-200 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">[INSERIR FOTO REAL DE RESULTADO]</p>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-md mx-auto">
          <SectionTitle>Perguntas Frequentes</SectionTitle>
          <div className="space-y-1">
            <FAQItem 
              question="Como vou receber os moldes?" 
              answer="Assim que o pagamento for aprovado, você recebe um e-mail automático com os dados de acesso. O download é imediato e você pode acessar sempre que quiser." 
            />
            <FAQItem 
              question="Os arquivos são digitais?" 
              answer="Sim, são 100% digitais no formato PDF. Você não receberá nada físico pelos correios, o que garante acesso imediato e sem frete." 
            />
            <FAQItem 
              question="Como faço para imprimir?" 
              answer="Os moldes foram preparados para serem impressos em folhas A4 comuns. Basta abrir o arquivo e mandar imprimir no tamanho real." 
            />
            <FAQItem 
              question="Quais tamanhos estão disponíveis?" 
              answer="[PREENCHER] - Geralmente os moldes seguem uma grade infantil padrão que atende a diversas idades." 
            />
            <FAQItem 
              question="Preciso saber costurar?" 
              answer="O material facilita muito o processo com moldes prontos, mas é necessário ter conhecimento básico de corte e costura para montar as peças." 
            />
            <FAQItem 
              question="Como funciona a garantia?" 
              answer="Você tem 7 dias de garantia incondicional. Se não gostar do material por qualquer motivo, pode solicitar o reembolso total." 
            />
            <FAQItem 
              question="O pagamento é único?" 
              answer="Sim! Você paga apenas uma vez o valor de R$ 19,90 e tem acesso vitalício ao pacote de moldes e ao bônus." 
            />
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-16 px-4 bg-slate-900 text-white text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-black mb-4 tracking-tighter italic">Comece hoje mesmo a criar suas fantasias</h2>
          <div className="text-2xl font-black text-emerald-400 mb-6 tracking-tight">R$ 19,90</div>
          <CTAButton>QUERO RECEBER OS 20 MOLDES</CTAButton>
          <div className="flex items-center justify-center gap-4 mt-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            <span>Pagamento Único</span>
            <span>·</span>
            <span>Produto Digital</span>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 px-4 bg-slate-950 text-slate-600 text-[10px] text-center border-t border-slate-900 mb-20 md:mb-0">
        <p className="mb-2 uppercase tracking-widest">© {new Date().getFullYear()} {PRODUCT_NAME}</p>
        <p className="px-4">Este produto é comercializado com o apoio da [NOME DA PLATAFORMA]. A plataforma não faz controle editorial prévio dos produtos comercializados.</p>
      </footer>

      {/* --- STICKY CTA MOBILE --- */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:hidden"
          >
            <div className="max-w-md mx-auto flex items-center gap-4">
              <div className="flex-1">
                <div className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">20 Moldes PDF</div>
                <div className="text-lg font-black text-slate-900 leading-none tracking-tight">R$ 19,90</div>
              </div>
              <div className="flex-[1.5]">
                <a 
                  href={CHECKOUT_URL}
                  className="flex items-center justify-center w-full py-3 bg-[#10B981] text-white rounded-xl font-black text-sm uppercase tracking-wider active:scale-95 shadow-md shadow-emerald-500/10"
                >
                  Quero Agora
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
