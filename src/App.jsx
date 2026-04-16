import React, { useState, useEffect } from 'react';
import { 
  MapPin, Map as MapIcon, Users, LayoutDashboard, Menu, X,
  FileCheck, FileText, Printer, ChevronRight,
  CarFront, Image as ImageIcon, Megaphone,
  Maximize, ExternalLink, Navigation,
  BookOpen, BarChart3, Maximize2, Minimize2, Calendar
} from 'lucide-react';

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

const OPERATION_DATA = {
  name: 'Operação Elos de Minas: Sgt Rodrigo',
  date: '08 de maio de 2026',
  location: 'EFAS/APM'
};

export default function App() {

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const handlePrint = () => window.print();

  const navItems = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'map', label: 'Mapas', icon: MapIcon },
    { id: 'programas', label: 'Programas', icon: FileCheck },
    { id: 'documents', label: 'Documentos', icon: BookOpen },
    { id: 'productivity', label: 'Produtividade', icon: BarChart3 }
  ];

  const renderContent = () => {
    switch (activeTab) {

      case 'dashboard':
        return (
          <div className="flex-1 flex flex-col p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {navItems.map(item => (
                <button key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="p-6 rounded-xl bg-[#1a1a1a] border border-[#8e8161] text-white hover:scale-[1.02] transition-all"
                >
                  <item.icon />
                  <h3 className="mt-4 font-bold">{item.label}</h3>
                </button>
              ))}
            </div>
          </div>
        );

      case 'map':
        return (
          <div className="flex-1 flex flex-col p-4">
            <div className={`flex flex-col flex-1 bg-black border rounded-xl overflow-hidden ${isMaximized ? 'fixed inset-0 z-50' : 'min-h-[400px]'}`}>
              
              <button onClick={() => setIsMaximized(!isMaximized)}
                className="absolute top-4 right-4 z-10 bg-black p-2 border border-[#8e8161] rounded">
                {isMaximized ? <Minimize2 /> : <Maximize2 />}
              </button>

              <iframe
                src="https://www.google.com/maps"
                className="w-full flex-1 border-0"
                title="Mapa"
              />
            </div>
          </div>
        );

      case 'programas':
        return (
          <div className="flex-1 flex flex-col p-4">
            <div className="flex flex-col flex-1 bg-black border rounded-xl overflow-hidden min-h-[500px]">
              <iframe
                src="https://docs.google.com"
                className="w-full flex-1 border-0"
                title="Programas"
              />
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="flex-1 flex flex-col p-4">
            <div className="flex flex-col flex-1 bg-black border rounded-xl overflow-hidden min-h-[500px]">
              <iframe
                src="https://docs.google.com"
                className="w-full flex-1 border-0"
                title="Documentos"
              />
            </div>
          </div>
        );

      case 'productivity':
        return (
          <div className="flex-1 flex flex-col p-4">
            <div className="flex flex-col flex-1 bg-black border rounded-xl overflow-hidden min-h-[500px]">
              <iframe
                src="https://forms.google.com"
                className="w-full flex-1 border-0"
                title="Produtividade"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.BLACK }}>

      {/* HEADER */}
      <header className="p-4 border-b border-[#8e8161] flex justify-between items-center">
        <h1 className="text-white font-bold">{OPERATION_DATA.name}</h1>

        <div className="flex gap-2">
          <button onClick={handlePrint} className="text-white border px-3 py-1">Imprimir</button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* MENU MOBILE */}
      {mobileMenuOpen && (
        <div className="flex flex-col bg-black border-b border-[#8e8161]">
          {navItems.map(item => (
            <button key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className="p-4 text-white border-b border-[#222]"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        {renderContent()}
      </main>

      {/* FOOTER */}
      <footer className="p-6 text-center text-white border-t border-[#8e8161]">
        PMMG • Operação Elos de Minas
      </footer>

    </div>
  );
}