import React, { useState, useEffect, useCallback } from 'react';
import { 
  MapPin, 
  Map as MapIcon,
  Users, 
  LayoutDashboard, 
  Menu, 
  X,
  FileCheck,
  FileText,
  Printer,
  ChevronRight,
  ChevronLeft,
  CarFront,
  Bike,
  Image as ImageIcon,
  Share2,
  Megaphone,
  Maximize,
  ExternalLink,
  Navigation,
  BookOpen,
  BarChart3,
  Maximize2, 
  Minimize2, 
  Calendar
} from 'lucide-react';

// --- CORES TEMÁTICAS ESTRITAS (PMMG) ---
const COLORS = {
  PMMG_CLARO: '#efe3bd',   
  PMMG_MAIN: '#d0c19e',    
  PMMG_MEDIO: '#9f8e5f',   
  PMMG_ESCURO: '#8e8161',
  PMMG_CAQUI: '#9b8a5c',  
  BLACK: '#000000',        
  RED: '#ff0000',          
  WHITE: '#FFFFFF'         
};

// URL DA IMAGEM DE IDENTIDADE e ESTADO MAIOR (Usada no fundo e nos diagramas)
const OP_IDENTITY_IMAGE = "https://drive.google.com/file/d/1SpmexnmN7biKjiJgX2KAJwfm6HMnyVSe/view?usp=drive_link";
const OP_IDENTITY_EM = "https://drive.google.com/file/d/11l7U2x2MVZfDhT8dhBH6mp60tn3_bUHQ/view?usp=drive_link";
const OP_IDENTITY_EME = "https://drive.google.com/file/d/11l7U2x2MVZfDhT8dhBH6mp60tn3_bUHQ/view?usp=drive_link";

// --- IMAGENS ESTADO MAIOR (PMMG) ---
const EM_PHOTOS = [
  { 
    id: 'EM1', 
    title: 'Organograma do Estado Maior', 
    url: OP_IDENTITY_EM 
  },
  { 
    id: 'EM2', 
    title: 'Estado Maior Especial', 
    url: OP_IDENTITY_EME 
  }
];


// URL da imagem do escudo da operação
const OPERATION_SHIELD_IMAGE = "https://drive.google.com/file/d/1n2ORU1Afgi06QF-ELWV3_doLzgY8Jo0o/view?usp=drive_link";
const OPERATION_SHIELD_PMMG = "https://drive.google.com/file/d/1qLuyF3z89BluUhQ3-0HF7MEg6eJQ85py/view?usp=drive_link";

// ============================================================================
// ÁREA DE CONFIGURAÇÃO DE DADOS
// ============================================================================
const OPERATION_DATA = {
  id: 'elos_de_minas_sgt_rodrigo',
  name: 'Operação Elos de Minas: Sgt Rodrigo',
  date: '08 de maio de 2026', 
  location: 'EFAS/APM', 
  mapUrl: "", 
  programas: [] 
};

// ============================================================================
// CONFIGURAÇÃO DOS CARTÕES PROGRAMAS (PLANILHA DE ABAS)
// ============================================================================
const PROGRAM_SECTORS = [
  { 
    sectorId: 1, 
    sectorName: "Planilha Mestra (Todas as Abas)", 
    pdfLink: "https://docs.google.com/spreadsheets/d/1X4NViJffeKC_jGYcE1ovan8nwkNOEpizbs1UUpGGyfg/export?format=pdf", 
    embedLink: "https://docs.google.com/spreadsheets/d/1X4NViJffeKC_jGYcE1ovan8nwkNOEpizbs1UUpGGyfg/preview" 
  },
  { 
    sectorId: 2, 
    sectorName: "Exemplo: Aba Isolada 1 (GEPMOR)", 
    pdfLink: "", 
    embedLink: "https://docs.google.com/spreadsheets/d/1X4NViJffeKC_jGYcE1ovan8nwkNOEpizbs1UUpGGyfg/preview?gid=0" 
  },
  { 
    sectorId: 3, 
    sectorName: "Exemplo: Aba Isolada 2 (Tático Móvel)", 
    pdfLink: "", 
    embedLink: "https://docs.google.com/spreadsheets/d/1X4NViJffeKC_jGYcE1ovan8nwkNOEpizbs1UUpGGyfg/preview?gid=123456789" 
  }
];
OPERATION_DATA.programas = PROGRAM_SECTORS;


// ============================================================================
// CONFIGURAÇÃO DE ESCALAS (PLANILHA DE ABAS)
// ============================================================================

const ESCALA_SECTORS = [
  { 
    sectorId: 'escala-1', 
    sectorName: "ESCALA GERAL - 1ª RPM", 
    pdfLink: 'https://docs.google.com/document/d/1aWfZpNPSME18w-an7LV7JjbNj5CctAUL/edit?usp=drive_link&ouid=104157628376196908085&rtpof=true&sd=true',
    embedLink: 'https://docs.google.com/document/d/1aWfZpNPSME18w-an7LV7JjbNj5CctAUL/preview' 
  },
  { 
    sectorId: 'escala-2', 
    sectorName: "ESCALA ADMINISTRATIVA", 
    pdfLink: 'https://docs.google.com/document/d/1aWfZpNPSME18w-an7LV7JjbNj5CctAUL/edit?usp=drive_link&ouid=104157628376196908085&rtpof=true&sd=true',
    embedLink: 'https://docs.google.com/document/d/1aWfZpNPSME18w-an7LV7JjbNj5CctAUL/preview' 
  },
  // Adicione mais escalas conforme a necessidade
];

// --- MAPAS REGIÕES/ BPMS ---
const MAPS_REPOSITORY = {
  "1ª RPM": [
    { id: 1, name: "1ºBPM", url: "https://www.google.com/maps/d/embed?mid=1ONjEDWyMSUSDgZYhs1CVYZU50JD9UGo&hl=pt-BR&ehbc=2E312F" },
    { id: 5, name: "5ºBPM", url: "URL_MAPA_2" },
    { id: 16, name: "16ºBPM", url: "https://www.google.com/maps/d/embed?mid=1Ago9riJHSx_hendOZC3yPjSVuH5IPiU&hl=pt-BR&ehbc=2E312F" },
    { id: 22, name: "22ºBPM", url: "URL_MAPA_2" },
    { id: 34, name: "34ºBPM", url: "https://www.google.com/maps/d/embed?mid=1Ago9riJHSx_hendOZC3yPjSVuH5IPiU&hl=pt-BR&ehbc=2E312F" },
    { id: 41, name: "41ºBPM", url: "URL_MAPA_2" },
    { id: 49, name: "49ºBPM", url: "https://www.google.com/maps/d/embed?mid=1Ago9riJHSx_hendOZC3yPjSVuH5IPiU&hl=pt-BR&ehbc=2E312F" },
    { id: 11, name: "BPTRAN", url: "URL_MAPA_2" },
    { id: 12, name: "1ªCIA IND PVD", url: "URL_MAPA_2" },
    // ... adicione os 20 mapas aqui
  ],
  "2ª RPM": [
    { id: 18, name: "18ºBPM", url: "https://www.google.com/maps/d/embed?mid=1Ago9riJHSx_hendOZC3yPjSVuH5IPiU&hl=pt-BR&ehbc=2E312F" },
    { id: 33, name: "33ºBPM", url: "URL_MAPA_2" },
    { id: 39, name: "39ºBPM", url: "https://www.google.com/maps/d/embed?mid=1Ago9riJHSx_hendOZC3yPjSVuH5IPiU&hl=pt-BR&ehbc=2E312F" },
    { id: 40, name: "40ºBPM", url: "URL_MAPA_2" },
    { id: 48, name: "48ºBPM", url: "https://www.google.com/maps/d/embed?mid=1Ago9riJHSx_hendOZC3yPjSVuH5IPiU&hl=pt-BR&ehbc=2E312F" },
    { id: 66, name: "66ºBPM", url: "https://www.google.com/maps/d/embed?mid=1Ago9riJHSx_hendOZC3yPjSVuH5IPiU&hl=pt-BR&ehbc=2E312F" },
    // ... os 6 mapas
  ],
  "3ª RPM": [
    { id: 35, name: "35ºBPM", url: "https://www.google.com/maps/d/embed?mid=1Ago9riJHSx_hendOZC3yPjSVuH5IPiU&hl=pt-BR&ehbc=2E312F" },
    { id: 36, name: "36ºBPM", url: "URL_MAPA_2" },
    { id: 61, name: "61ºBPM", url: "https://www.google.com/maps/d/embed?mid=1Ago9riJHSx_hendOZC3yPjSVuH5IPiU&hl=pt-BR&ehbc=2E312F" },
    { id: 13, name: "1ªCIA PM IND", url: "URL_MAPA_2" },
    // ... os 4 mapas
  ]
};

const SECTORS_IMAGES = [
  { id: 'mapa_geral', name: 'Mapa Tático Geral', driveLink: '' },
  { id: 'pontos_bloqueio', name: 'Pontos de Bloqueio / Interceptação', driveLink: '' }
];

const COMMUNICATION_DATA = {
  title: "Acervo de Mídia Fotográfica",
  description: "Acesse a galeria de imagens, registros fotográficos e materiais de divulgação gerados durante a operação.",
  
  // URL AJUSTADA: Usa o endpoint 'embeddedfolderview' e força o modo 'grid' (galeria)
  folderEmbedUrl: "https://drive.google.com/embeddedfolderview?id=1uS9htNRS9UnYajjH1erQiNDF2kQAH-VR#grid",
  
  // Link original para quem quiser abrir noutra aba
  folderExternalUrl: "https://drive.google.com/drive/folders/1uS9htNRS9UnYajjH1erQiNDF2kQAH-VR?usp=drive_link"
};

const EXTERNAL_POLICING_DOCS = [
  {
    id: 'ordem_servico',
    title: 'Ordem de Serviço (OSv.)',
    pdfLink: 'https://docs.google.com/document/d/1aWfZpNPSME18w-an7LV7JjbNj5CctAUL/edit?usp=drive_link&ouid=104157628376196908085&rtpof=true&sd=true',
    embedLink: 'https://docs.google.com/document/d/1aWfZpNPSME18w-an7LV7JjbNj5CctAUL/preview'
  },
  {
    id: 'Apresentação Operação',
    title: 'Apresentação Op. Elos de Minas',
    pdfLink: 'https://docs.google.com/presentation/d/1A-rgnT3nPUUBkQEIl60yDndJB3RnztHw/edit?usp=drive_link&ouid=104157628376196908085&rtpof=true&sd=true',
    embedLink: 'https://docs.google.com/presentation/d/1A-rgnT3nPUUBkQEIl60yDndJB3RnztHw/preview'
  },
  {
  id: 'Documentos Úteis',
  title: 'Documentos Úteis',
  pdfLink: 'https://drive.google.com/drive/folders/1B5RWXvBuIYtKAOxgnGHOrpXBnFjD9M9S?usp=drive_link',
  embedLink: 'https://drive.google.com/embeddedfolderview?id=1B5RWXvBuIYtKAOxgnGHOrpXBnFjD9M9S#grid'
}
];

const PRODUCTIVITY_DATA = {
  formEmbedUrl: 'https://forms.gle/Hbf6Aayu377rDx1V9',
  dashboardEmbedUrl: '' 
};

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================
const getDriveDirectLink = (url) => {
  if (!url) return '';
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`;
  }
  return url;
};

const OperationShield = ({ size = 40, className = "" }) => (
  <img
    src={getDriveDirectLink(OPERATION_SHIELD_IMAGE)}
    alt="Escudo da Operação"
    width={size}
    height={size}
    className={`object-contain ${className}`}
  />
);

const OperationShieldPMMG = ({ size = 40, className = "" }) => (
  <img
    src={getDriveDirectLink(OPERATION_SHIELD_PMMG)}
    alt="Escudo da PMMG"
    width={size}
    height={size}
    className={`object-contain ${className}`}
  />
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-8 border-l-4 pl-4 pb-2" style={{ borderColor: COLORS.PMMG_CAQUI }}>
    <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
    {title}
    </h2>
    <p className="text-stone-400 font-medium mt-2 text-lg">{subtitle}</p>
  </div>
);

// ============================================================================
// COMPONENTE PRINCIPAL (REACT APP)
// ============================================================================
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(PROGRAM_SECTORS[0]?.sectorId || 1);
  const [selectedSector, setSelectedSector] = useState(SECTORS_IMAGES[0]?.id || '');
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [selectedExternalDoc, setSelectedExternalDoc] = useState(EXTERNAL_POLICING_DOCS[0]?.id || '');
  const [prodTab, setProdTab] = useState('dashboard');
  const [activeRpm, setActiveRpm] = useState("1ª RPM");
  const [selectedMap, setSelectedMap] = useState(MAPS_REPOSITORY["1ª RPM"][0]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [viewMode, setViewMode] = useState('cartoes');
  const [cardsSubTab, setCardsSubTab] = useState('programas'); // 'programas' ou 'escalas'


  const targetDate = new Date('2026-05-08T00:00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isOpActive, setIsOpActive] = useState(false);

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
          setIsOpActive(true);
          clearInterval(timer);
        } else {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          });
        }
      }, 1000);
      return () => clearInterval(timer);
    }, []);

  const handlePrint = () => {
    window.print();
  };

  const navItems = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard, description: 'Painel principal da operação integrada.' },
    { id: 'EM', label: 'Estado Maior da Operação', icon: Users, description: 'Planejamento e coordenação das diretrizes da operação.' },
    { id: 'map', label: 'Mapas Setoriais', icon: MapIcon, description: 'Georreferenciamento e áreas de atuação.' },
    { id: 'programas', label: 'Cartões Programas', icon: FileCheck, description: 'Distribuição de efetivo e viaturas.' },
    { id: 'productivity', label: 'Produtividade', icon: BarChart3, description: 'Registro e monitoramento de resultados em tempo real.' },
    { id: 'documents', label: 'Documentos', icon: BookOpen, description: 'Ordens de Serviço, apresentação e normas.' },
    { id: 'sectors', label: 'Comunicação organizacional', icon: Megaphone, description: 'Gestão de mídias e valorização da marca PMMG.' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
  switch (activeTab) {
    case 'dashboard':
      return (
        <div className="animate-in fade-in duration-700 w-full relative"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${getDriveDirectLink(OP_IDENTITY_IMAGE)})`,
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'
          }}
        >
          {/* HERO SECTION COM CRONÔMETRO DINÂMICO */}
          <div className="relative w-full py-28 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-b" 
               style={{ backgroundColor: 'transparent', borderColor: COLORS.PMMG_ESCURO }}>
            
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-6 z-10" style={{ color: COLORS.PMMG_MAIN }}>
              {OPERATION_DATA.date} • {OPERATION_DATA.location}
            </h2>

            {/* CRONÔMETRO (SÓ APARECE SE NÃO ESTIVER ATIVA) */}
            {!isOpActive && (
              <div className="flex gap-6 mb-8 z-10 animate-pulse">
                {[
                  { label: 'Dias', value: timeLeft.days },
                  { label: 'Horas', value: timeLeft.hours },
                  { label: 'Min', value: timeLeft.minutes },
                  { label: 'Seg', value: timeLeft.seconds }
                ].map((t, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-3xl md:text-5xl font-black text-white">{String(t.value).padStart(2, '0')}</span>
                    <span className="text-[10px] uppercase font-bold text-[#8e8161] tracking-tighter">{t.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="w-24 h-1 rounded-full mb-8" style={{ backgroundColor: isOpActive ? '#22c55e' : COLORS.RED }}></div>

            <div className="flex flex-wrap justify-center gap-4 z-10">
              <span className="px-6 py-3 text-white rounded-full text-sm font-bold uppercase tracking-widest flex items-center gap-3 backdrop-blur-md shadow-2xl border transition-all duration-500" 
                    style={{ backgroundColor: isOpActive ? 'rgba(34, 197, 94, 0.6)' : `${COLORS.RED}99`, borderColor: COLORS.WHITE }}>
                <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: isOpActive ? '#4ade80' : COLORS.WHITE }}></span>
                {isOpActive ? "Operação Ativa" : "Em planejamento"}
              </span>
            </div>
          </div>

          {/* GRID DE MÓDULOS OPERACIONAIS */}
          <div className="relative py-20 container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {navItems.filter(item => item.id !== 'dashboard').map((item) => (
                <button 
                  key={item.id} onClick={() => handleNavClick(item.id)} 
                  className="flex flex-col items-start p-8 rounded-2xl shadow-2xl transition-all duration-300 group relative overflow-hidden border backdrop-blur-sm" 
                  style={{ backgroundColor: 'rgba(26, 26, 26, 0.7)', borderColor: COLORS.PMMG_ESCURO }}
                >
                  <div className="p-4 rounded-xl shadow-lg mb-6 bg-white text-black group-hover:scale-110 transition-transform">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase mb-3">{item.label}</h3>
                  <p className="text-stone-300 text-sm mb-8">{item.description}</p>
                  <div className="flex items-center text-sm font-bold uppercase mt-auto text-[#efe3bd]">
                    Acessar <ChevronRight size={20} className="ml-1 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );

      case 'EM':
        return (
          <div className="container mx-auto px-4 py-10 max-w-7xl animate-in fade-in duration-500">
            <SectionHeader 
              title="Estado-Maior da Operação" 
              subtitle="Responsáveis pelo planejamento e coordenação das atividades da operação." 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {EM_PHOTOS.map((photo) => (
                <div 
                  key={photo.id} 
                  className="group relative p-1 rounded-2xl shadow-2xl transition-all hover:scale-[1.01]" 
                  style={{ background: `linear-gradient(to bottom right, ${COLORS.PMMG_MEDIO}, ${COLORS.BLACK})` }}
                >
                  <div className="bg-[#1a1a1a] p-4 rounded-xl h-full">
                    <h3 className="text-lg font-black text-white uppercase mb-4 border-l-4 pl-3" style={{ borderColor: COLORS.PMMG_MAIN }}>
                      {photo.title}
                    </h3>
                    
                    <div 
                      className="relative rounded-lg overflow-hidden border cursor-pointer bg-black aspect-video flex items-center justify-center" 
                      style={{ borderColor: COLORS.PMMG_ESCURO }}
                      onClick={() => setFullscreenImage(getDriveDirectLink(photo.url))}
                    >
                      <img 
                        src={getDriveDirectLink(photo.url)} 
                        alt={photo.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/800x450?text=Erro+ao+carregar+imagem+do+Drive"; }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize className="text-white" size={32} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'map':
        return (
          <div className={`container mx-auto px-4 py-10 max-w-7xl animate-in fade-in duration-500 print:py-2 ${isMaximized ? 'fixed inset-0 z-[60] bg-black max-w-none p-0 py-0' : ''}`}>
            
            {/* Oculta o Header se estiver em Foco Total para ganhar tela */}
            {!isMaximized && (
              <SectionHeader 
                title="Mapas Setoriais" 
                subtitle={`Distribuição do efetivo nos setores da ${activeRpm} e no ${selectedMap.name}`} 
              />
            )}
            
            <div className={`grid grid-cols-1 ${isMaximized ? 'h-screen w-full' : 'lg:grid-cols-4 gap-8 mt-8'}`}>
              
              {/* MENU LATERAL - Oculto no Modo Foco Total */}
              {!isMaximized && (
                <div className="lg:col-span-1 space-y-8">
                  
                  {/* Bloco de Seleção de RPM */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase text-[#8e8161] tracking-[0.2em] mb-2 border-b border-[#8e8161]/30 pb-2">
                      Região (RPM)
                    </label>
                    {Object.keys(MAPS_REPOSITORY).map(rpm => (
                      <button
                        key={rpm}
                        onClick={() => {
                          setActiveRpm(rpm);
                          setSelectedMap(MAPS_REPOSITORY[rpm][0]);
                        }}
                        className={`px-5 py-4 rounded-xl text-xs font-black uppercase transition-all border text-left flex justify-between items-center w-full shadow-lg ${
                          activeRpm === rpm 
                            ? 'bg-[#efe3bd] text-black border-[#efe3bd] scale-[1.02]' 
                            : 'bg-[#111] text-white border-stone-800 hover:border-[#8e8161] opacity-70 hover:opacity-100'
                        }`}
                      >
                        {rpm}
                        <ChevronRight size={16} className={activeRpm === rpm ? 'text-black' : 'text-stone-600'} />
                      </button>
                    ))}
                  </div>

                  {/* Bloco de Seleção de Unidade (BPM) */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8e8161] tracking-[0.2em] mb-2 border-b border-[#8e8161]/30 pb-2">
                      Unidade (BPM)
                    </label>
                    <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {MAPS_REPOSITORY[activeRpm].map(unidade => (
                        <div key={unidade.id} className="flex gap-2 group">
                          <button
                            onClick={() => setSelectedMap(unidade)}
                            className={`flex-1 px-4 py-3 rounded-lg text-[11px] font-bold uppercase transition-all border text-left ${
                              selectedMap.id === unidade.id 
                                ? 'bg-[#8e8161] text-white border-[#8e8161] shadow-md' 
                                : 'bg-black text-stone-400 border-stone-800 hover:text-white hover:border-stone-600'
                            }`}
                          >
                            {unidade.name}
                          </button>
                          
                          {/* INOVAÇÃO: BOTÃO DE GPS DIRETO (WAZE/MAPS) */}
                          <button 
                            onClick={() => window.open(unidade.url, '_blank')}
                            className="px-3 rounded-lg bg-stone-900 border border-stone-800 text-[#efe3bd] hover:bg-[#8e8161] hover:text-white transition-all shadow-md flex items-center justify-center"
                            title="Navegar para este Setor"
                          >
                            <Navigation size={16} className="rotate-45" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ÁREA DE VISUALIZAÇÃO DO MAPA */}
              <div className={`${isMaximized ? 'h-full w-full' : 'lg:col-span-3'}`}>
                <div className={`w-full relative bg-[#0a0a0a] transition-all duration-500 overflow-hidden ${isMaximized ? 'h-full rounded-none border-0' : 'h-[650px] lg:h-[750px] rounded-3xl border-2 shadow-2xl'}`} 
                    style={{ borderColor: isMaximized ? 'transparent' : '#8e8161' }}>
                  
                  {/* INOVAÇÃO: BOTÃO FOCO TOTAL (EXPANDIR/MINIMIZAR) */}
                  <button 
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="absolute top-4 left-4 z-[70] bg-black/70 hover:bg-black text-[#efe3bd] p-3 rounded-xl border border-[#8e8161] backdrop-blur-md transition-all shadow-2xl flex items-center gap-2 group"
                  >
                    {isMaximized ? (
                      <><Minimize2 size={20} /> <span className="text-[10px] font-bold uppercase hidden group-hover:block">Sair do Foco</span></>
                    ) : (
                      <><Maximize2 size={20} /> <span className="text-[10px] font-bold uppercase hidden group-hover:block">Foco Total</span></>
                    )}
                  </button>

                  {/* Validação de Link */}
                  {selectedMap.url.includes("URL_MAPA") || !selectedMap.url ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-10">
                      <div className="bg-stone-900/50 p-6 rounded-full inline-block mb-4">
                        <MapPin size={48} className="text-[#8e8161] animate-bounce" />
                      </div>
                      <h3 className="text-xl font-black text-white uppercase mb-2">Aguardando Configuração</h3>
                      <p className="text-stone-500 text-sm max-w-xs mx-auto">Link pendente para {selectedMap.name}</p>
                    </div>
                  ) : (
                    <iframe 
                      src={selectedMap.url} 
                      width="100%" 
                      height="100%" 
                      className="border-0 w-full h-full" 
                      title={`Mapa Operacional - ${selectedMap.name}`} 
                      allowFullScreen 
                      allow="autoplay; fullscreen"
                    ></iframe>
                  )}

                  {/* Badge de Status no Canto do Mapa */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-black/80 backdrop-blur-md text-[#efe3bd] border border-[#8e8161] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tighter flex items-center gap-2 shadow-xl">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                      Georreferenciamento
                    </span>
                  </div>
                </div>
                
                {/* Oculta os créditos se estiver em Foco Total */}
                {!isMaximized && (
                  <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 px-2">
                    <p className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">
                      Operação Elos de Minas • Mapas Setoriais
                    </p>
                    <button 
                      onClick={() => window.open(selectedMap.url, '_blank')}
                      className="text-[10px] bg-stone-900 hover:bg-stone-800 text-[#efe3bd] px-4 py-2 rounded-lg transition-colors border border-stone-800 flex items-center gap-2"
                    >
                      <ExternalLink size={14} /> ABRIR NO APP GOOGLE MAPS
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        );

      case 'programas':
        const currentData = viewMode === 'cartoes' ? PROGRAM_SECTORS : ESCALA_SECTORS;
        
        return (
          <div className={`container mx-auto px-4 py-10 max-w-7xl animate-in fade-in duration-500 ${isMaximized ? 'fixed inset-0 z-[60] bg-black max-w-none p-0 py-0' : ''}`}>
            
            {/* Oculta o Header e as abas quando estiver maximizado para limpar a visão */}
            {!isMaximized && (
              <>
                <SectionHeader 
                  title={viewMode === 'cartoes' ? "Cartões Programas" : "Escalas de Serviço"} 
                  subtitle="Planejamento detalhado de efetivo" 
                />
                <div className="flex justify-center mb-8">
                  <div className="inline-flex p-1 bg-[#111] border border-stone-800 rounded-2xl">
                    <button onClick={() => setViewMode('cartoes')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase ${viewMode === 'cartoes' ? 'bg-[#efe3bd] text-black' : 'text-stone-500'}`}>Cartões</button>
                    <button onClick={() => setViewMode('escalas')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase ${viewMode === 'escalas' ? 'bg-[#efe3bd] text-black' : 'text-stone-500'}`}>Escalas</button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mb-8 bg-[#111] p-2 rounded-2xl border" style={{ borderColor: COLORS.PMMG_ESCURO }}>
                  {currentData.map(doc => (
                    <button key={doc.sectorId} onClick={() => setSelectedProgram(doc.sectorId)} className={`px-5 py-3 rounded-xl text-xs font-bold uppercase transition-all ${selectedProgram === doc.sectorId ? 'bg-[#d0c19e] text-black scale-105 shadow-lg' : 'text-stone-400 hover:text-white'}`}>
                      {doc.sectorName}
                    </button>
                  ))}
                </div>
              </>
            )}

            {currentData.filter(doc => doc.sectorId === selectedProgram).map(doc => (
              <div key={doc.sectorId} className={`${isMaximized ? 'h-screen w-full' : 'p-1 rounded-2xl shadow-2xl'}`} style={{ background: isMaximized ? 'black' : `linear-gradient(to bottom right, ${COLORS.PMMG_MEDIO}, ${COLORS.BLACK})` }}>
                <div className={`${isMaximized ? 'h-full w-full p-0' : 'bg-[#1a1a1a] p-6 rounded-xl h-full w-full relative'}`}>
                  
                  {!isMaximized && (
                    <div className="flex items-center justify-between mb-6 border-b pb-6" style={{ borderColor: COLORS.PMMG_ESCURO }}>
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-black">
                          {viewMode === 'escalas' ? <Calendar size={28} style={{ color: COLORS.PMMG_MAIN }} /> : <CarFront size={28} style={{ color: COLORS.PMMG_MAIN }} />}
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white uppercase">{doc.sectorName}</h3>
                      </div>
                    </div>
                  )}

                  {/* CONTAINER DO IFRAME COM LÓGICA DE AMPLIAÇÃO */}
                  <div className={`bg-black relative overflow-hidden border transition-all duration-500 ${isMaximized ? 'h-screen w-screen border-0' : 'h-[700px] rounded-xl'}`} style={{ borderColor: COLORS.PMMG_ESCURO }}>
                    
                    {/* BOTÃO DE FOCO TOTAL (EXPANDIR / RECOLHER) */}
                    <button 
                      onClick={() => setIsMaximized(!isMaximized)}
                      className="absolute top-4 right-4 z-[110] bg-black/70 hover:bg-black text-[#efe3bd] p-3 rounded-xl border border-[#8e8161] backdrop-blur-md transition-all shadow-2xl flex items-center gap-2 group"
                    >
                      {isMaximized ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                      <span className="text-[10px] font-bold uppercase hidden group-hover:block">
                        {isMaximized ? "Sair do Foco" : "Foco Total"}
                      </span>
                    </button>

                    <iframe 
                      src={doc.embedLink} 
                      width="100%" 
                      height="100%" 
                      className="border-0 w-full h-full"
                      allow="autoplay"
                    ></iframe>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );


      case 'productivity':
        return (
          <div className="container mx-auto px-4 py-10 max-w-7xl animate-in fade-in duration-500 print:py-2">
            <SectionHeader title="Produtividade Operacional" subtitle="Acompanhamento gerencial em tempo real e lançamento de dados" />
            <div className="flex flex-wrap gap-3 mb-8 print:hidden bg-[#111] p-2 rounded-2xl border w-fit" style={{ borderColor: COLORS.PMMG_ESCURO }}>
              <button onClick={() => setProdTab('dashboard')} className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase transition-all shadow-md text-center flex items-center gap-2 ${prodTab === 'dashboard' ? 'scale-105' : 'hover:brightness-125 opacity-70'}`} style={{ backgroundColor: prodTab === 'dashboard' ? COLORS.PMMG_MAIN : 'transparent', color: prodTab === 'dashboard' ? COLORS.BLACK : COLORS.PMMG_CLARO }}>
                <BarChart3 size={18} /> Resultados
              </button>
              <button onClick={() => setProdTab('form')} className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase transition-all shadow-md text-center flex items-center gap-2 ${prodTab === 'form' ? 'scale-105' : 'hover:brightness-125 opacity-70'}`} style={{ backgroundColor: prodTab === 'form' ? COLORS.PMMG_MAIN : 'transparent', color: prodTab === 'form' ? COLORS.BLACK : COLORS.PMMG_CLARO }}>
                <FileText size={18} /> Lançar Dados
              </button>
            </div>
            <div className="bg-[#1a1a1a] p-2 rounded-2xl shadow-2xl overflow-hidden h-[1200px] lg:h-[1600px] border border-[#8e8161]">
              {prodTab === 'dashboard' ? (
                <iframe srcDoc={DASHBOARD_HTML} width="100%" height="100%" className="rounded-xl border-0" title="Dashboard"></iframe>
              ) : (
                <iframe src={PRODUCTIVITY_DATA.formEmbedUrl} width="100%" height="100%" className="rounded-xl border-0" title="Formulário"></iframe>
              )}
            </div>
          </div>
        );

      case 'documents':
  // Busca o documento selecionado para facilitar o uso no iframe
  const selectedDoc = EXTERNAL_POLICING_DOCS.find(d => d.id === selectedExternalDoc);

  return (
    <div className={`container mx-auto px-4 py-10 max-w-7xl animate-in fade-in duration-500 print:py-2 ${isMaximized ? 'fixed inset-0 z-[60] bg-black max-w-none p-0 py-0' : ''}`}>
      
      {/* Oculta o Título e os Botões de Seleção quando estiver em Foco Total */}
      {!isMaximized && (
        <>
          <SectionHeader title="Documentos da Operação" subtitle="Ordens de Serviço, Apresentação e Outros" />
          
          <div className="flex flex-wrap gap-3 mb-8 print:hidden bg-[#111] p-2 rounded-2xl border" style={{ borderColor: COLORS.PMMG_ESCURO }}>
            {EXTERNAL_POLICING_DOCS.map(doc => (
              <button 
                key={doc.id} 
                onClick={() => setSelectedExternalDoc(doc.id)} 
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase transition-all shadow-md flex-grow sm:flex-grow-0 text-center ${selectedExternalDoc === doc.id ? 'scale-105' : 'hover:brightness-125 opacity-70'}`} 
                style={{ 
                  backgroundColor: selectedExternalDoc === doc.id ? COLORS.PMMG_MAIN : 'transparent', 
                  color: selectedExternalDoc === doc.id ? COLORS.BLACK : COLORS.PMMG_CLARO 
                }}
              >
                {doc.title}
              </button>
            ))}
          </div>
        </>
      )}

      {/* CONTAINER DO DOCUMENTO COM LÓGICA DE AMPLIAÇÃO */}
      <div className={`bg-[#1a1a1a] transition-all duration-500 relative ${isMaximized ? 'h-screen w-screen p-0 border-0' : 'p-2 rounded-2xl shadow-2xl h-[800px] border border-[#8e8161]'}`}>
        
        {/* BOTÃO DE FOCO TOTAL (EXPANDIR / RECOLHER) */}
        <button 
          onClick={() => setIsMaximized(!isMaximized)}
          className="absolute top-4 right-4 z-[110] bg-black/70 hover:bg-black text-[#efe3bd] p-3 rounded-xl border border-[#8e8161] backdrop-blur-md transition-all shadow-2xl flex items-center gap-2 group"
          title={isMaximized ? "Sair do Foco" : "Maximizar Documento"}
        >
          {isMaximized ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
          <span className="text-[10px] font-black uppercase hidden group-hover:block">
            {isMaximized ? "Recolher" : "Foco Total"}
          </span>
        </button>

        {/* IFRAME */}
        <iframe 
          src={selectedDoc?.embedLink} 
          width="100%" 
          height="100%" 
          className={`${isMaximized ? 'rounded-none' : 'rounded-xl'} border-0 w-full h-full`}
          title={`Documento: ${selectedDoc?.title}`}
          allowFullScreen
        ></iframe>
      </div>

      {/* Botão para abrir externo (Só aparece se não estiver maximizado) */}
      {!isMaximized && selectedDoc?.pdfLink && (
        <div className="mt-4 flex justify-center">
           <a 
            href={selectedDoc.pdfLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-[10px] font-black uppercase text-stone-500 hover:text-[#efe3bd] transition-colors"
          >
            <ExternalLink size={14} /> Abrir arquivo original em nova aba
          </a>
        </div>
      )}
    </div>
  );

      case 'sectors':
        return (
          <div className="container mx-auto px-4 py-10 max-w-7xl animate-in fade-in duration-500 print:py-2">
            <SectionHeader title="Comunicação Organizacional" subtitle={COMMUNICATION_DATA.description} />
            
            <div className="p-1 rounded-2xl shadow-2xl print:p-0 print:border-none print:shadow-none print:bg-white" style={{ background: `linear-gradient(to bottom right, ${COLORS.PMMG_MEDIO}, ${COLORS.BLACK})` }}>
              <div className="bg-[#1a1a1a] p-6 rounded-xl h-full w-full">
                
                {/* CONTAINER DA GALERIA DRIVE */}
                <div className="bg-black rounded-xl overflow-hidden h-[700px] border border-[#8e8161]">
                  <iframe 
                    src={COMMUNICATION_DATA.folderEmbedUrl} 
                    width="100%" 
                    height="100%" 
                    className="border-0 w-full h-full" 
                    title="Pasta do Google Drive" 
                    allow="autoplay; fullscreen" // Permite autoplay e fullscreen
                    allowFullScreen              // Atributo essencial para o botão de ampliar
                  ></iframe>
                </div>

                {/* BOTÃO EXTERNO */}
                <div className="mt-6 flex justify-center">
                  <a 
                    href={COMMUNICATION_DATA.folderExternalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-xs font-bold text-white px-6 py-3 rounded-lg uppercase transition-all shadow-lg hover:scale-105" 
                    style={{ backgroundColor: COLORS.PMMG_CAQUI }}
                  >
                    <ExternalLink size={18} /> Acessar no Drive Original
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  }; // Fim da função renderContent

  {/* --- MODAL DE AMPLIAÇÃO (LIGHTBOX) --- */}
{fullscreenImage && (
  <div 
    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-2xl animate-in fade-in duration-300"
    onClick={() => setFullscreenImage(null)} // Fecha ao clicar em qualquer lugar do fundo
  >
    {/* Botão de fechar no canto superior */}
    <button 
      className="absolute top-6 right-6 text-white p-3 rounded-full transition-all hover:scale-110 active:scale-95 z-[110]"
      style={{ backgroundColor: COLORS.RED }}
      onClick={() => setFullscreenImage(null)}
    >
      <X size={32} />
    </button>
    
    {/* Imagem Ampliada */}
    <img 
      src={fullscreenImage} 
      alt="Visualização Ampliada" 
      className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-pmmg-dark animate-in zoom-in-95 duration-300"
      onClick={(e) => e.stopPropagation()} // Impede que o clique na imagem feche o modal
    />
    
    {/* Legenda Opcional */}
    <div className="absolute bottom-8 text-white/70 text-sm font-bold uppercase tracking-widest bg-black/50 px-6 py-2 rounded-full backdrop-blur-md">
      Clique fora para fechar
    </div>
  </div>
)}

  return (
    <div className="min-h-screen text-stone-100 font-sans flex flex-col print:bg-white print:text-black selection:text-black" style={{ backgroundColor: COLORS.BLACK, selectionBackgroundColor: COLORS.PMMG_MAIN }}>
      
      <header className="sticky top-0 z-50 w-full shadow-2xl print:hidden border-t-4 flex flex-col relative" style={{ backgroundColor: '#111', borderTopColor: COLORS.PMMG_CAQUI }}>
        <div className="w-full border-b" style={{ borderColor: COLORS.PMMG_ESCURO, backgroundColor: '#1a1a1a' }}>
          <div className="container mx-auto px-4 lg:px-6 py-3 flex items-center justify-between xl:justify-center">
            <nav className="hidden xl:flex items-center gap-2 lg:gap-3">
              {navItems.map(item => (
                <button key={item.id} onClick={() => handleNavClick(item.id)} className={`px-4 py-2 rounded-xl text-sm font-bold uppercase transition-all flex items-center gap-2 ${activeTab === item.id ? 'shadow-md' : 'hover:bg-[#333] text-stone-300 hover:text-white'}`} style={{ backgroundColor: activeTab === item.id ? COLORS.PMMG_MAIN : 'transparent', color: activeTab === item.id ? COLORS.BLACK : undefined }}>
                  <item.icon size={18} /><span>{item.label}</span>
                </button>
              ))}
              <div className="w-px h-6 mx-2" style={{ backgroundColor: COLORS.PMMG_ESCURO }}></div>
              <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 border text-white rounded-xl text-xs font-black transition-all uppercase tracking-widest hover:scale-105" style={{ backgroundColor: COLORS.PMMG_CAQUI, borderColor: COLORS.PMMG_CAQUI }} title="Imprimir Relatório">
                <Printer size={18} />Imprimir
              </button>
            </nav>
            <div className="flex items-center justify-between w-full xl:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl transition-colors border" style={{ backgroundColor: COLORS.BLACK, borderColor: COLORS.PMMG_ESCURO, color: COLORS.PMMG_MAIN }}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: COLORS.PMMG_CLARO }}>Menu Operacional</span>
            </div>
          </div>
        </div>
        <div className="w-full border-b shadow-md py-5" style={{ backgroundColor: '#141413', borderColor: COLORS.PMMG_ESCURO }}>
          <div className="container mx-auto px-4 lg:px-6 flex justify-center items-center">
            <div className="flex items-center gap-4 lg:gap-6 cursor-pointer group" onClick={() => handleNavClick('dashboard')}>
              <div className="hidden sm:block transition-all group-hover:scale-105">
                <OperationShield size={60} />
              </div>
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-xl md:text-3xl lg:text-4xl font-black tracking-widest uppercase leading-tight drop-shadow-md" style={{ color: COLORS.PMMG_MAIN }}>{OPERATION_DATA.name}</span>
                <span className="text-xs md:text-sm uppercase tracking-widest font-bold mt-1 opacity-90" style={{ color: COLORS.PMMG_CLARO }}>{OPERATION_DATA.date} • {OPERATION_DATA.location}</span>
              </div>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 w-full shadow-2xl border-b animate-in slide-in-from-top-2 z-50" style={{ backgroundColor: '#111', borderColor: COLORS.PMMG_ESCURO }}>
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map(item => (
                <button key={item.id} onClick={() => handleNavClick(item.id)} className="w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all font-bold uppercase tracking-widest text-sm border" style={{ backgroundColor: activeTab === item.id ? COLORS.PMMG_MAIN : COLORS.BLACK, color: activeTab === item.id ? COLORS.BLACK : COLORS.PMMG_CLARO, borderColor: activeTab === item.id ? COLORS.PMMG_MAIN : COLORS.PMMG_ESCURO }}>
                  <item.icon size={22} /><span className="text-left">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 w-full relative print:bg-white" style={{ backgroundColor: COLORS.BLACK }}>
        {renderContent()}
      </main>

      <footer className="py-16 border-t print:hidden" style={{ backgroundColor: '#0a0a0a', borderColor: COLORS.PMMG_ESCURO }}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6"><OperationShieldPMMG size={70} className="opacity-80" /></div>
          <h3 className="text-2xl font-black uppercase tracking-widest mb-2" style={{ color: COLORS.WHITE }}>PMMG</h3>
          <p className="mb-8 max-w-xl mx-auto text-sm text-stone-400 tracking-wide">{OPERATION_DATA.name} • {OPERATION_DATA.location}</p>
          <div className="flex justify-center items-center mt-8 pt-8 border-t" style={{ borderColor: '#222' }}>
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm md:text-base font-black tracking-widest uppercase text-white drop-shadow-sm">A Força do Povo Mineiro</span>
              <span className="text-[10px] md:text-xs italic font-bold tracking-[0.3em] uppercase mt-1" style={{ color: COLORS.PMMG_CLARO }}>Presença que protege</span>
            </div>
          </div>
        </div>
      </footer>

      {fullscreenImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-2 sm:p-6 backdrop-blur-xl" onClick={() => setFullscreenImage(null)}>
          <button className="absolute top-6 right-6 text-white p-3 rounded-full transition-all z-50 shadow-2xl border hover:scale-110" style={{ backgroundColor: COLORS.PMMG_CAQUI, borderColor: COLORS.PMMG_CAQUI }} onClick={() => setFullscreenImage(null)}><X size={32} /></button>
          <img src={fullscreenImage} alt="Fullscreen" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border" style={{ borderColor: COLORS.PMMG_ESCURO }} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}