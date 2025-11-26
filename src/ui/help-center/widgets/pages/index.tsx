import {
  LayoutDashboard,
  MapPin,
  Sliders,
  Bell,
  AlertTriangle,
  Users,
  HelpCircle,
  ArrowRight,
  Zap,
  BellRing,
} from 'lucide-react'

// Configuração simples dos itens de menu
const menuItems = [
  {
    title: 'Dashboard',
    desc: 'Visão geral, KPIs e saúde do sistema.',
    icon: <LayoutDashboard className='w-6 h-6 text-indigo-600' />,
    href: '/help-center/dashboard',
    color: 'bg-indigo-50 border-indigo-100',
  },
  {
    title: 'Estações',
    desc: 'Cadastro, mapa e gestão de equipamentos.',
    icon: <MapPin className='w-6 h-6 text-blue-600' />,
    href: '/help-center/stations',
    color: 'bg-blue-50 border-blue-100',
  },
  {
    title: 'Parâmetros',
    desc: 'Configuração de sensores e unidades.',
    icon: <Sliders className='w-6 h-6 text-purple-600' />,
    href: '/help-center/parameters',
    color: 'bg-purple-50 border-purple-100',
  },
  {
    title: 'Alarmes',
    desc: 'Regras de monitoramento e gatilhos.',
    icon: <Bell className='w-6 h-6 text-red-600' />,
    href: '/help-center/alarms',
    color: 'bg-red-50 border-red-100',
  },
  {
    title: 'Alertas',
    desc: 'Histórico de incidentes e auditoria.',
    icon: <AlertTriangle className='w-6 h-6 text-orange-600' />,
    href: '/help-center/alerts',
    color: 'bg-orange-50 border-orange-100',
  },
  {
    title: 'Notificações',
    desc: 'Central de avisos rápidos.',
    icon: <BellRing className='w-6 h-6 text-pink-600' />,
    href: '/help-center/notifications',
    color: 'bg-pink-50 border-pink-100',
  },
  {
    title: 'Usuários',
    desc: 'Controle de acesso e permissões.',
    icon: <Users className='w-6 h-6 text-teal-600' />,
    href: '/help-center/users',
    color: 'bg-teal-50 border-teal-100',
  },
]

export default function HelpCenterIndexPage() {
  return (
    <article className='mx-auto px-4 py-12 bg-white sm:px-6 lg:px-8 max-w-5xl'>
      {/* Hero Section */}
      <div className='text-center mb-16'>
        <div className='inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4'>
          <HelpCircle className='w-8 h-8 text-indigo-600' />
        </div>
        <h1 className='text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4'>
          Central de Ajuda GAIA
        </h1>
        <p className='text-xl text-slate-500 max-w-2xl mx-auto'>
          Bem-vindo à documentação oficial. Aqui você encontra guias detalhados sobre como
          operar, configurar e extrair o máximo do seu sistema de monitoramento.
        </p>
      </div>

      {/* Grid de Navegação */}
      <section className='mb-20'>
        <h2 className='text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2 border-b border-slate-100 pb-4'>
          <Zap className='w-5 h-5 text-yellow-500' />
          Módulos do Sistema
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={`group block p-6 rounded-xl border transition-all duration-200 hover:shadow-md hover:-translate-y-1 ${item.color}`}
            >
              <div className='flex items-start justify-between mb-4'>
                <div className='p-3 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform'>
                  {item.icon}
                </div>
                <ArrowRight className='w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0' />
              </div>
              <h3 className='text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-700'>
                {item.title}
              </h3>
              <p className='text-sm text-slate-600 leading-relaxed'>{item.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className='bg-slate-50 rounded-2xl p-8 border border-slate-200'>
        <h2 className='text-2xl font-bold text-slate-800 mb-8 text-center'>
          Perguntas Frequentes
        </h2>

        <div className='grid gap-6 md:grid-cols-2'>
          <div className='bg-white p-6 rounded-xl shadow-sm border border-slate-100'>
            <h3 className='font-bold text-slate-900 mb-3 text-lg'>
              Como faço para poder começar?
            </h3>
            <p className='text-slate-600 text-sm leading-relaxed'>
              Recomendamos iniciar pelo <strong>Dashboard</strong> para ter uma visão
              geral dos dados. Em seguida, acesse a seção de <strong>Estações</strong>{' '}
              para verificar se todos os seus equipamentos estão online e configurados
              corretamente.
            </p>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-sm border border-slate-100'>
            <h3 className='font-bold text-slate-900 mb-3 text-lg'>
              Qual a diferença entre Alarmes e Alertas?
            </h3>
            <p className='text-slate-600 text-sm leading-relaxed'>
              Esta é a dúvida mais comum!
              <br />
              <br />
              <span className='text-indigo-600 font-medium'>• Alarmes</span> são as{' '}
              <strong>regras</strong> que você configura (ex: "Avise se chover muito").
              <br />
              <span className='text-orange-600 font-medium'>• Alertas</span> são as{' '}
              <strong>notificações</strong> que o sistema gera quando essa regra acontece.
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}
