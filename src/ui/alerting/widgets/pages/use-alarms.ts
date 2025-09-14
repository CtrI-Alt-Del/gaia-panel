export interface AlarmRule {
  id: string
  name: string
  icon: string
  condition: string
  conditionLabel: string
  message: string
  messageLabel: string
  severity: 'critical' | 'alarm' | 'warning'
  target: string
  targetLabel: string
  status: 'active' | 'inactive'
}

export interface AlarmFilters {
  search: string
  status: 'all' | 'active' | 'inactive'
}

export interface AlarmPagination {
  limit: number
  cursor: string | null
  nextCursor: string | null
  prevCursor: string | null
}

export interface AlarmStats {
  total: number
  active: number
  critical: number
  bySeverity: Record<string, number>
}

export const useAlarms = () => {
  const allAlarms: AlarmRule[] = [
    {
      id: '1',
      name: 'Temperatura Alta',
      icon: 'thermometer',
      condition: 'Temperatura > 35°C',
      conditionLabel: 'Limite de disparo',
      message: 'Temperatura acima do nível crítico',
      messageLabel: 'Mensagem de notificação de alarme',
      severity: 'critical',
      target: 'Todas as Estações',
      targetLabel: 'Parâmetro de temperatura',
      status: 'active',
    },
    {
      id: '2',
      name: 'Umidade Baixa',
      icon: 'droplets',
      condition: 'Umidade < 30%',
      conditionLabel: 'Limite mínimo',
      message: 'Umidade abaixo do nível recomendado',
      messageLabel: 'Notificação de aviso',
      severity: 'alarm',
      target: 'Região Urbana',
      targetLabel: 'Parâmetro de umidade',
      status: 'active',
    },
    {
      id: '3',
      name: 'Qualidade do Ar Ruim',
      icon: 'cloud-rain',
      condition: 'PM2.5 > 50 µg/m³',
      conditionLabel: 'Limite de qualidade do ar',
      message: 'Qualidade do ar excede níveis seguros',
      messageLabel: 'Alarme de aviso de saúde',
      severity: 'critical',
      target: 'Estação ST-001',
      targetLabel: 'Parâmetro PM2.5',
      status: 'active',
    },
    {
      id: '4',
      name: 'Níveis Altos de CO2',
      icon: 'trending-up',
      condition: 'CO2 > 1000 ppm',
      conditionLabel: 'Limite de dióxido de carbono',
      message: 'Concentração de CO2 acima do normal',
      messageLabel: 'Alarme ambiental',
      severity: 'alarm',
      target: 'Zona Industrial',
      targetLabel: 'Parâmetro CO2',
      status: 'active',
    },
    {
      id: '5',
      name: 'Queda de Pressão',
      icon: 'arrow-down',
      condition: 'Pressão < 950 hPa',
      conditionLabel: 'Aviso de baixa pressão',
      message: 'Pressão atmosférica abaixo do normal',
      messageLabel: 'Alarme do sistema meteorológico',
      severity: 'alarm',
      target: 'Região Costeira',
      targetLabel: 'Parâmetro de pressão',
      status: 'inactive',
    },
    {
      id: '6',
      name: 'Velocidade do Vento Alta',
      icon: 'trending-up',
      condition: 'Vento > 50 km/h',
      conditionLabel: 'Limite de velocidade do vento',
      message: 'Velocidade do vento acima do seguro',
      messageLabel: 'Alarme meteorológico',
      severity: 'critical',
      target: 'Estação ST-002',
      targetLabel: 'Parâmetro de vento',
      status: 'active',
    },
    {
      id: '7',
      name: 'Radiação UV Extrema',
      icon: 'thermometer',
      condition: 'UV > 11',
      conditionLabel: 'Índice UV extremo',
      message: 'Radiação UV em níveis perigosos',
      messageLabel: 'Alarme de saúde pública',
      severity: 'critical',
      target: 'Todas as Estações',
      targetLabel: 'Parâmetro UV',
      status: 'active',
    },
    {
      id: '8',
      name: 'Temperatura Muito Baixa',
      icon: 'thermometer',
      condition: 'Temperatura < -5°C',
      conditionLabel: 'Limite de temperatura mínima',
      message: 'Temperatura abaixo do ponto de congelamento',
      messageLabel: 'Alarme de geada',
      severity: 'alarm',
      target: 'Região Norte',
      targetLabel: 'Parâmetro de temperatura',
      status: 'inactive',
    },
    {
      id: '9',
      name: 'Chuva Intensa',
      icon: 'cloud-rain',
      condition: 'Chuva > 20mm/h',
      conditionLabel: 'Limite de precipitação',
      message: 'Chuva intensa detectada',
      messageLabel: 'Alarme de inundação',
      severity: 'alarm',
      target: 'Região Sul',
      targetLabel: 'Parâmetro de chuva',
      status: 'active',
    },
    {
      id: '10',
      name: 'Visibilidade Baixa',
      icon: 'cloud-rain',
      condition: 'Visibilidade < 1km',
      conditionLabel: 'Limite de visibilidade',
      message: 'Visibilidade reduzida por neblina',
      messageLabel: 'Alarme de segurança',
      severity: 'alarm',
      target: 'Estação ST-003',
      targetLabel: 'Parâmetro de visibilidade',
      status: 'active',
    },
  ]

  const getPaginatedAlarms = (
    alarms: AlarmRule[],
    limit: number,
    cursor: string | null = null,
  ): { alarms: AlarmRule[]; nextCursor: string | null; prevCursor: string | null } => {
    const startIndex = cursor ? parseInt(cursor, 10) : 0
    const endIndex = startIndex + limit

    const paginatedAlarms = alarms.slice(startIndex, endIndex)
    const nextCursor = endIndex < alarms.length ? endIndex.toString() : null
    const prevCursor = startIndex > 0 ? Math.max(0, startIndex - limit).toString() : null

    return {
      alarms: paginatedAlarms,
      nextCursor,
      prevCursor,
    }
  }

  const filterAlarms = (alarms: AlarmRule[], filters: AlarmFilters): AlarmRule[] => {
    return alarms.filter((alarm) => {
      const matchesSearch =
        alarm.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        alarm.condition.toLowerCase().includes(filters.search.toLowerCase()) ||
        alarm.message.toLowerCase().includes(filters.search.toLowerCase()) ||
        alarm.target.toLowerCase().includes(filters.search.toLowerCase())

      const matchesStatus = filters.status === 'all' || alarm.status === filters.status

      return matchesSearch && matchesStatus
    })
  }

  const calculateStats = (alarms: AlarmRule[]): AlarmStats => {
    const active = alarms.filter((alarm) => alarm.status === 'active').length
    const critical = alarms.filter((alarm) => alarm.severity === 'critical').length

    const bySeverity = alarms.reduce(
      (acc, alarm) => {
        acc[alarm.severity] = (acc[alarm.severity] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      total: alarms.length,
      active,
      critical,
      bySeverity,
    }
  }

  const getAlarmById = (id: string): AlarmRule | undefined => {
    return allAlarms.find((alarm) => alarm.id === id)
  }

  const createAlarm = (newAlarm: Omit<AlarmRule, 'id'>): AlarmRule => {
    const id = (allAlarms.length + 1).toString()
    return { ...newAlarm, id }
  }

  const updateAlarm = (id: string, updates: Partial<AlarmRule>): AlarmRule | null => {
    const alarmIndex = allAlarms.findIndex((alarm) => alarm.id === id)
    if (alarmIndex === -1) return null

    return { ...allAlarms[alarmIndex], ...updates }
  }

  const deleteAlarm = (id: string): boolean => {
    const alarmIndex = allAlarms.findIndex((alarm) => alarm.id === id)
    if (alarmIndex === -1) return false

    allAlarms.splice(alarmIndex, 1)
    return true
  }

  const handleViewAlarm = (alarmId: string) => {
    console.log('Visualizar alarme:', alarmId)
    // Aqui você implementaria a lógica de navegação para visualizar o alarme
  }

  const handleEditAlarm = (alarmId: string) => {
    console.log('Editar alarme:', alarmId)
    // Aqui você implementaria a lógica de abertura do modal de edição
  }

  const handleSaveEditAlarm = (alarmId: string, data: Partial<AlarmRule>) => {
    console.log('Salvar edição do alarme:', alarmId, data)
    updateAlarm(alarmId, data)
    // Aqui você implementaria a lógica de atualização do alarme
  }

  const handleDeleteAlarm = (alarmId: string) => {
    console.log('Deletar alarme:', alarmId)
    deleteAlarm(alarmId)
    // Aqui você implementaria a lógica de exclusão do alarme
  }

  return {
    allAlarms,
    calculateStats,
    filterAlarms,
    getPaginatedAlarms,
    getAlarmById,
    createAlarm,
    updateAlarm,
    deleteAlarm,
    handleViewAlarm,
    handleEditAlarm,
    handleSaveEditAlarm,
    handleDeleteAlarm,
  }
}
