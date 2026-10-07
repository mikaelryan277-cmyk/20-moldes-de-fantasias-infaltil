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
const CHECKOUT_URL = "https://ggcheckout.app/checkout/v4/e2JuRCOtPeneTm3E4llh";
const PRODUCT_NAME = "20 Moldes de Fantasias Infantis";
const PRICE = "19,90";
const OLD_PRICE = "97,00";

// --- ASSETS ---
const IMAGES = {
  hero: "/src/assets/images/hero_mockup_1791402111308.jpg",
  sample1: "/src/assets/images/costume_sample_1_1791402133658.jpg",
  sample2: "/src/assets/images/costume_sample_2_1791402142657.jpg",
  bonus: "/images/bonus-kit-3-princesas.jpg",
  guarantee: "/images/garantia-7-dias.png",
  infographic: "/images/infografico-moldes.jpg",
  section_digital: "/images/moldes-prontos-pdf.webp",
  avatar1: "/images/avatar-avaliacao-01.webp",
  avatar2: "/images/avatar-avaliacao-02.webp",
  avatar3: "/images/avatar-avaliacao-03.webp",
  marquee: [
    "/images/fantasia-01.webp",
    "/images/fantasia-02.webp",
    "/images/fantasia-03.webp",
    "/images/fantasia-04.webp",
    "/images/fantasia-05.webp",
    "/images/fantasia-06.webp",
    "/images/fantasia-07.webp",
    "/images/fantasia-08.webp",
    "/images/fantasia-09.webp",
    "/images/fantasia-10.webp",
  ]
};

// --- COMPONENTS ---

const MarqueeCard = ({ src }: { src: string }) => (
  <div className="w-[155px] md:w-[165px] aspect-[4/5] bg-slate-200 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
    <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
  </div>
);

const AutoplaySlider = ({ images, direction = 'left', interval = 2000 }: { images: string[], direction?: 'left' | 'right', interval?: number }) => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  // We double the images to allow smooth infinite loop
  const displayImages = [...images, ...images];
  const itemWidth = 165; // Matches card width
  const gap = 10;
  const step = itemWidth + gap;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        if (direction === 'left') {
          // Move left: increment index
          if (prev >= images.length) {
            // We are at the end of the first set, jump back to start after this transition
            return prev + 1;
          }
          return prev + 1;
        } else {
          // Move right: decrement index
          if (prev <= 0) {
            return prev - 1;
          }
          return prev - 1;
        }
      });
      setIsTransitioning(true);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, direction, interval]);

  // Handle the jump for infinite loop
  useEffect(() => {
    if (direction === 'left' && index > images.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(1); // Jump to the second item (index 1 is same as the one we just transitioned to)
      }, 600); // Wait for transition to finish
      return () => clearTimeout(timeout);
    }
    
    if (direction === 'right' && index < 0) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(images.length - 1);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [index, images.length, direction]);

  // For the 'right' direction, we start at the end of the first set
  useEffect(() => {
    if (direction === 'right') {
      setIndex(images.length);
      setIsTransitioning(false);
    }
  }, [direction, images.length]);

  const offset = -index * step;

  return (
    <div className="w-full overflow-hidden py-2 bg-white">
      <div 
        className="flex gap-[10px] will-change-transform"
        style={{ 
          transform: `translate3d(${offset}px, 0, 0)`,
          transition: isTransitioning ? 'transform 600ms ease-in-out' : 'none',
          paddingLeft: '16px' // Initial offset to show previous cards
        }}
      >
        {displayImages.map((src, i) => (
          <MarqueeCard key={i} src={src} />
        ))}
      </div>
    </div>
  );
};

const TestimonialCard = ({ name, text, date, avatar }: { name: string, text: string, date: string, avatar: string }) => {
  const [liked, setLiked] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const [replies, setReplies] = useState<string[]>([]);

  const handleSendReply = () => {
    if (replyInput.trim()) {
      setReplies([...replies, replyInput.trim()]);
      setReplyInput("");
      setReplyOpen(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-[46px] h-[46px] rounded-full overflow-hidden border border-white shadow-sm flex-shrink-0">
          <img src={avatar} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900 leading-none mb-1">{name}</h4>
          <span className="text-[10px] text-slate-400 font-bold">{date}</span>
        </div>
      </div>
      <p className="text-sm text-slate-700 leading-snug">{text}</p>
      
      <div className="mt-3 pt-3 border-t border-slate-100 flex gap-4">
        <button 
          onClick={() => setLiked(!liked)}
          className={`text-[10px] font-black uppercase tracking-widest transition-all active:scale-90 ${liked ? 'text-rose-500' : 'text-slate-400'}`}
        >
          {liked ? 'Curtido' : 'Curtir'}
        </button>
        <button 
          onClick={() => setReplyOpen(!replyOpen)}
          className="text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest active:scale-95"
        >
          Responder
        </button>
      </div>

      <AnimatePresence>
        {replyOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <textarea 
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              placeholder="Escreva uma resposta..."
              className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500 mb-2 bg-slate-50 min-h-[80px]"
            />
            <div className="flex gap-2 justify-end">
              <button 
                onClick={() => setReplyOpen(false)}
                className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSendReply}
                className="px-4 py-1.5 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg active:scale-95 transition-transform"
              >
                Enviar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {replies.length > 0 && (
        <div className="mt-4 space-y-3 pl-4 border-l-2 border-slate-100">
          {replies.map((r, i) => (
            <div key={i} className="bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 rounded-full bg-slate-300 flex items-center justify-center text-[8px] text-white font-black">V</div>
                <span className="text-[10px] font-black text-slate-900">Você</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{r}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const UrgencyBar = () => {
  const [date, setDate] = useState("");
  
  useEffect(() => {
    const now = new Date();
    // Format: "7 DE OUTUBRO"
    const day = now.getDate();
    const month = now.toLocaleDateString('pt-BR', { month: 'long' });
    setDate(`${day} DE ${month.toUpperCase()}`);
  }, []);

  return (
    <div className="bg-[#E11D48] text-white py-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] sticky top-0 z-50">
      🔥 Oferta Especial — {date || "HOJE"}
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
  <div className="text-center mb-6 px-4">
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
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden">
      <UrgencyBar />

      {/* --- HERO SECTION --- */}
      <section className="bg-white pt-8 pb-4 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-5">
            <span className="bg-rose-50 text-rose-600 border border-rose-100 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em]">
              ✂️ 20 Moldes Digitais em PDF
            </span>
          </div>
          
          <h1 className="text-3xl font-black text-center leading-[1.1] mb-4 tracking-tighter">
            Crie <span className="text-rose-600">Fantasias Infantis</span> Incríveis com Moldes Prontos para Imprimir
          </h1>

          <p className="text-slate-500 text-center text-sm mb-8 leading-relaxed px-4">
            Receba 20 moldes digitais em PDF, prontos para imprimir em folha A4 e usar nas suas próximas criações.
          </p>

          <div className="grid grid-cols-2 gap-2 mb-10">
            {[
              "20 modelos",
              "Arquivos em PDF",
              "Impressão em A4",
              "Acesso digital"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap uppercase tracking-tight">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center animate-bounce">
            <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">VEJA ALGUNS DOS MOLDES QUE VOCÊ VAI RECEBER 👇</p>
          </div>
        </div>
      </section>

      {/* --- MARQUEE SHOWCASE --- */}
      <section className="pt-6 pb-10 bg-white border-t border-slate-100">
        <div className="max-w-md mx-auto">
          <SectionTitle subtitle="Alguns dos modelos que você recebe no pacote">
            Olha quantas coisas você poderá criar 😍
          </SectionTitle>
        </div>

        <div className="flex flex-col gap-2">
          <AutoplaySlider 
            images={IMAGES.marquee.slice(0, 5)} 
            direction="left" 
            interval={2000}
          />
          <AutoplaySlider 
            images={IMAGES.marquee.slice(5, 10)} 
            direction="right" 
            interval={2300}
          />
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

          <div className="relative mb-8">
            <div className="absolute inset-0 bg-rose-200 blur-3xl opacity-30 rounded-full"></div>
            <img 
              src={IMAGES.section_digital} 
              alt="Digital Product Mockup" 
              className="w-full h-auto relative z-10 rounded-2xl shadow-xl object-contain border border-white bg-white"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-3">
            {[
              "Acesso imediato a todos os 20 moldes",
              "Arquivos organizados e fáceis de encontrar",
              "Suporte para dúvidas via e-mail",
              "Acesso vitalício ao material"
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
          <SectionTitle subtitle="Grade completa de 1 a 14 anos">
            Kit 3 Princesas de Bônus 👑
          </SectionTitle>

          <div className="bg-white rounded-3xl p-4 shadow-xl shadow-amber-900/5 border border-amber-200">
            <img 
              src={IMAGES.bonus} 
              alt="Bônus Kit 3 Princesas" 
              className="w-full h-auto rounded-2xl shadow-md object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="mt-6 bg-amber-50 rounded-xl p-4 text-center">
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
              className="w-full max-w-[240px] h-auto mx-auto mb-6 object-contain"
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

          <div className="space-y-4">
            {/* Facebook style Testimonials */}
            {[
              { name: "Juliana Martins", text: "Amei esse pacote! Comprei na semana passada e chegou certinho no meu e-mail. Vale super a pena!", date: "1 h", avatar: IMAGES.avatar1 },
              { name: "Ana Lúcia Santos", text: "Quero comprar também, vou fazer pro meu netinho de 2 anos. 😍", date: "3 h", avatar: IMAGES.avatar2 },
              { name: "Kátia Luciana F.", text: "Esses moldes me ajudam demais, agilizam meu trabalho e as partes se encaixam certinho.", date: "1 d", avatar: IMAGES.avatar3 }
            ].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
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
      <footer className="py-8 px-4 bg-slate-950 text-slate-600 text-[10px] text-center border-t border-slate-900">
        <p className="mb-2 uppercase tracking-widest">© {new Date().getFullYear()} {PRODUCT_NAME}</p>
        <p className="px-4">Este produto é comercializado com o apoio da [NOME DA PLATAFORMA]. A plataforma não faz controle editorial prévio dos produtos comercializados.</p>
      </footer>
    </div>
  );
}
