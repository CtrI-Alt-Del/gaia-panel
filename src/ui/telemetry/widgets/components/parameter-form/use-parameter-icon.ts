import { useMemo } from "react";
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Cloud,
  Gauge,
  Eye,
  Zap,
  Mountain,
  CloudRain,
  Compass,
  AlertTriangle,
} from "lucide-react";

export type ParameterIconType = {
  Icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  badgeColor: string;
  iconBgColor: string;
};

export function getParameterIconFromUnit(unit: string): ParameterIconType {
  const unitLower = unit.toLowerCase();

  // Temperatura - Múltiplas escalas e variações
  if (
    unitLower.includes("°c") ||
    unitLower.includes("celsius") ||
    (unitLower.includes("c") && !unitLower.includes("cm") && !unitLower.includes("°c")) ||
    unitLower.includes("fahrenheit") ||
    unitLower.includes("f") ||
    unitLower.includes("°f") ||
    unitLower.includes("kelvin") ||
    (unitLower.includes("k") && !unitLower.includes("km")) ||
    unitLower.includes("rankine") ||
    (unitLower.includes("r") && !unitLower.includes("rh") && !unitLower.includes("bar") && !unitLower.includes("°f") && !unitLower.includes("°c")) ||
    unitLower.includes("reaumur") ||
    unitLower.includes("réaumur") ||
    unitLower.includes("temp") ||
    unitLower.includes("temperatura") ||
    unitLower.includes("temperature") ||
    unitLower.includes("thermal") ||
    unitLower.includes("térmica") ||
    unitLower.includes("heat") ||
    unitLower.includes("calor") ||
    unitLower.includes("cold") ||
    unitLower.includes("frio") ||
    unitLower.includes("hot") ||
    unitLower.includes("quente") ||
    unitLower.includes("ambient") ||
    unitLower.includes("ambiente") ||
    unitLower.includes("air_temp") ||
    unitLower.includes("soil_temp") ||
    unitLower.includes("water_temp") ||
    unitLower.includes("surface_temp") ||
    unitLower.includes("dew_point") ||
    unitLower.includes("ponto_orvalho") ||
    unitLower.includes("wet_bulb") ||
    unitLower.includes("bulbo_umido") ||
    unitLower.includes("heat_index") ||
    unitLower.includes("indice_calor") ||
    unitLower.includes("wind_chill") ||
    unitLower.includes("sensacao_termica")
  ) {
    return {
      Icon: Thermometer,
      iconColor: "text-red-500",
      badgeColor: "bg-red-50 ring-red-200",
      iconBgColor: "bg-red-100",
    };
  }

  // Umidade Relativa e Absoluta
  if (
    unitLower.includes("%") ||
    unitLower.includes("umidade") ||
    unitLower.includes("humidity") ||
    unitLower.includes("rh") ||
    unitLower.includes("relative_humidity") ||
    unitLower.includes("umidade_relativa") ||
    unitLower.includes("absolute_humidity") ||
    unitLower.includes("umidade_absoluta") ||
    unitLower.includes("specific_humidity") ||
    unitLower.includes("umidade_especifica") ||
    unitLower.includes("mixing_ratio") ||
    unitLower.includes("razao_mistura") ||
    unitLower.includes("vapor_pressure") ||
    unitLower.includes("pressao_vapor") ||
    unitLower.includes("saturation") ||
    unitLower.includes("saturacao") ||
    unitLower.includes("moisture") ||
    unitLower.includes("umidade_ar") ||
    unitLower.includes("air_humidity") ||
    unitLower.includes("soil_humidity") ||
    unitLower.includes("umidade_solo") ||
    unitLower.includes("leaf_wetness") ||
    unitLower.includes("molhamento_foliar")
  ) {
    return {
      Icon: Droplets,
      iconColor: "text-blue-500",
      badgeColor: "bg-blue-50 ring-blue-200",
      iconBgColor: "bg-blue-100",
    };
  }

  // Pressão Atmosférica - Múltiplas unidades e tipos
  if (
    unitLower.includes("hpa") ||
    unitLower.includes("pa") ||
    unitLower.includes("bar") ||
    unitLower.includes("atm") ||
    unitLower.includes("pressão") ||
    unitLower.includes("pressure") ||
    unitLower.includes("atmospheric_pressure") ||
    unitLower.includes("pressao_atmosferica") ||
    unitLower.includes("barometric_pressure") ||
    unitLower.includes("pressao_barometrica") ||
    unitLower.includes("sea_level_pressure") ||
    unitLower.includes("pressao_nivel_mar") ||
    unitLower.includes("station_pressure") ||
    unitLower.includes("pressao_estacao") ||
    unitLower.includes("altimeter_setting") ||
    unitLower.includes("ajuste_altimetro") ||
    unitLower.includes("qnh") ||
    unitLower.includes("qfe") ||
    unitLower.includes("qff") ||
    unitLower.includes("mb") ||
    unitLower.includes("millibar") ||
    unitLower.includes("torr") ||
    unitLower.includes("mmhg") ||
    unitLower.includes("inHg") ||
    unitLower.includes("psi") ||
    unitLower.includes("pounds_per_square_inch") ||
    unitLower.includes("kpa") ||
    unitLower.includes("kilopascal") ||
    unitLower.includes("mbar") ||
    unitLower.includes("pressure_tendency") ||
    unitLower.includes("tendencia_pressao") ||
    unitLower.includes("pressure_change") ||
    unitLower.includes("mudanca_pressao")
  ) {
    return {
      Icon: Gauge,
      iconColor: "text-purple-500",
      badgeColor: "bg-purple-50 ring-purple-200",
      iconBgColor: "bg-purple-100",
    };
  }

  // Vento - Velocidade e Intensidade
  if (
    unitLower.includes("m/s") ||
    unitLower.includes("km/h") ||
    unitLower.includes("km") ||
    unitLower.includes("mph") ||
    unitLower.includes("vento") ||
    unitLower.includes("wind") ||
    unitLower.includes("wind_speed") ||
    unitLower.includes("velocidade_vento") ||
    unitLower.includes("wind_velocity") ||
    unitLower.includes("velocidade_vento") ||
    unitLower.includes("wind_gust") ||
    unitLower.includes("rajada_vento") ||
    unitLower.includes("wind_peak") ||
    unitLower.includes("pico_vento") ||
    unitLower.includes("wind_avg") ||
    unitLower.includes("vento_medio") ||
    unitLower.includes("wind_max") ||
    unitLower.includes("vento_maximo") ||
    unitLower.includes("wind_min") ||
    unitLower.includes("vento_minimo") ||
    unitLower.includes("knots") ||
    unitLower.includes("kt") ||
    unitLower.includes("nós") ||
    unitLower.includes("beaufort") ||
    unitLower.includes("escala_beaufort") ||
    unitLower.includes("wind_force") ||
    unitLower.includes("forca_vento") ||
    unitLower.includes("wind_power") ||
    unitLower.includes("potencia_vento") ||
    unitLower.includes("wind_energy") ||
    unitLower.includes("energia_vento") ||
    unitLower.includes("wind_turbulence") ||
    unitLower.includes("turbulencia_vento") ||
    unitLower.includes("wind_shear") ||
    unitLower.includes("cisalhamento_vento")
  ) {
    return {
      Icon: Wind,
      iconColor: "text-gray-500",
      badgeColor: "bg-gray-50 ring-gray-200",
      iconBgColor: "bg-gray-100",
    };
  }

  // Direção do Vento e Navegação
  if (
    unitLower.includes("°") ||
    unitLower.includes("graus") ||
    unitLower.includes("degrees") ||
    unitLower.includes("direção") ||
    unitLower.includes("direction") ||
    unitLower.includes("wind_direction") ||
    unitLower.includes("direcao_vento") ||
    unitLower.includes("wind_heading") ||
    unitLower.includes("rumo_vento") ||
    unitLower.includes("wind_bearing") ||
    unitLower.includes("azimute_vento") ||
    unitLower.includes("compass") ||
    unitLower.includes("bússola") ||
    unitLower.includes("bearing") ||
    unitLower.includes("rumo") ||
    unitLower.includes("heading") ||
    unitLower.includes("azimute") ||
    unitLower.includes("north") ||
    unitLower.includes("norte") ||
    unitLower.includes("south") ||
    unitLower.includes("sul") ||
    unitLower.includes("east") ||
    unitLower.includes("leste") ||
    unitLower.includes("west") ||
    unitLower.includes("oeste") ||
    unitLower.includes("northeast") ||
    unitLower.includes("nordeste") ||
    unitLower.includes("northwest") ||
    unitLower.includes("noroeste") ||
    unitLower.includes("southeast") ||
    unitLower.includes("sudeste") ||
    unitLower.includes("southwest") ||
    unitLower.includes("sudoeste") ||
    unitLower.includes("wind_rose") ||
    unitLower.includes("rosa_vento") ||
    unitLower.includes("cardinal") ||
    unitLower.includes("cardeal") ||
    unitLower.includes("ordinal") ||
    unitLower.includes("ordinal") ||
    unitLower.includes("rad") ||
    unitLower.includes("radians") ||
    unitLower.includes("radianos")
  ) {
    return {
      Icon: Compass,
      iconColor: "text-sky-500",
      badgeColor: "bg-sky-50 ring-sky-200",
      iconBgColor: "bg-sky-100",
    };
  }

  // Radiação Solar, UV e Energia Solar
  if (
    unitLower.includes("w/m²") ||
    unitLower.includes("w/m2") ||
    unitLower.includes("lux") ||
    unitLower.includes("radiação") ||
    unitLower.includes("radiation") ||
    unitLower.includes("solar_radiation") ||
    unitLower.includes("radiacao_solar") ||
    unitLower.includes("global_radiation") ||
    unitLower.includes("radiacao_global") ||
    unitLower.includes("direct_radiation") ||
    unitLower.includes("radiacao_direta") ||
    unitLower.includes("diffuse_radiation") ||
    unitLower.includes("radiacao_difusa") ||
    unitLower.includes("reflected_radiation") ||
    unitLower.includes("radiacao_refletida") ||
    unitLower.includes("net_radiation") ||
    unitLower.includes("radiacao_liquida") ||
    unitLower.includes("uv") ||
    unitLower.includes("ultraviolet") ||
    unitLower.includes("ultra_violeta") ||
    unitLower.includes("uv_index") ||
    unitLower.includes("indice_uv") ||
    unitLower.includes("uv_a") ||
    unitLower.includes("uv_b") ||
    unitLower.includes("uv_c") ||
    unitLower.includes("uv_dose") ||
    unitLower.includes("dose_uv") ||
    unitLower.includes("erythemal_uv") ||
    unitLower.includes("uv_eritemal") ||
    unitLower.includes("uv_effective") ||
    unitLower.includes("uv_efetivo") ||
    unitLower.includes("índice") ||
    unitLower.includes("index") ||
    unitLower.includes("indice") ||
    unitLower.includes("solar_irradiance") ||
    unitLower.includes("irradiancia_solar") ||
    unitLower.includes("solar_flux") ||
    unitLower.includes("fluxo_solar") ||
    unitLower.includes("solar_energy") ||
    unitLower.includes("energia_solar") ||
    unitLower.includes("solar_power") ||
    unitLower.includes("potencia_solar") ||
    unitLower.includes("sunshine") ||
    unitLower.includes("brilho_solar") ||
    unitLower.includes("sunshine_duration") ||
    unitLower.includes("duracao_brilho") ||
    unitLower.includes("solar_elevation") ||
    unitLower.includes("elevacao_solar") ||
    unitLower.includes("solar_azimuth") ||
    unitLower.includes("azimute_solar") ||
    unitLower.includes("solar_angle") ||
    unitLower.includes("angulo_solar") ||
    unitLower.includes("par") ||
    unitLower.includes("photosynthetically_active_radiation") ||
    unitLower.includes("radiacao_fotosinteticamente_ativa") ||
    unitLower.includes("ppfd") ||
    unitLower.includes("photon_flux_density") ||
    unitLower.includes("densidade_fluxo_foton") ||
    unitLower.includes("mol/m²/s") ||
    unitLower.includes("mol/m2/s") ||
    unitLower.includes("einstein") ||
    unitLower.includes("einstein/m²/s") ||
    unitLower.includes("einstein/m2/s")
  ) {
    return {
      Icon: Sun,
      iconColor: "text-yellow-500",
      badgeColor: "bg-yellow-50 ring-yellow-200",
      iconBgColor: "bg-yellow-100",
    };
  }

  // Precipitação e Hidrometeorologia
  if (
    unitLower.includes("mm") ||
    unitLower.includes("cm") ||
    unitLower.includes("inch") ||
    unitLower.includes("precipitação") ||
    unitLower.includes("precipitation") ||
    unitLower.includes("rain") ||
    unitLower.includes("chuva") ||
    unitLower.includes("rainfall") ||
    unitLower.includes("precipitacao") ||
    unitLower.includes("rain_rate") ||
    unitLower.includes("taxa_chuva") ||
    unitLower.includes("rain_intensity") ||
    unitLower.includes("intensidade_chuva") ||
    unitLower.includes("rain_accumulation") ||
    unitLower.includes("acumulo_chuva") ||
    unitLower.includes("rain_duration") ||
    unitLower.includes("duracao_chuva") ||
    unitLower.includes("rain_frequency") ||
    unitLower.includes("frequencia_chuva") ||
    unitLower.includes("rain_probability") ||
    unitLower.includes("probabilidade_chuva") ||
    unitLower.includes("rain_events") ||
    unitLower.includes("eventos_chuva") ||
    unitLower.includes("snow") ||
    unitLower.includes("neve") ||
    unitLower.includes("snowfall") ||
    unitLower.includes("nevasca") ||
    unitLower.includes("snow_depth") ||
    unitLower.includes("profundidade_neve") ||
    unitLower.includes("snow_water_equivalent") ||
    unitLower.includes("equivalente_agua_neve") ||
    unitLower.includes("snow_density") ||
    unitLower.includes("densidade_neve") ||
    unitLower.includes("hail") ||
    unitLower.includes("granizo") ||
    unitLower.includes("hail_size") ||
    unitLower.includes("tamanho_granizo") ||
    unitLower.includes("hail_intensity") ||
    unitLower.includes("intensidade_granizo") ||
    unitLower.includes("sleet") ||
    unitLower.includes("chuva_gelada") ||
    unitLower.includes("freezing_rain") ||
    unitLower.includes("chuva_congelante") ||
    unitLower.includes("drizzle") ||
    unitLower.includes("garoa") ||
    unitLower.includes("mist") ||
    unitLower.includes("neblina") ||
    unitLower.includes("fog") ||
    unitLower.includes("nevoeiro") ||
    unitLower.includes("dew") ||
    unitLower.includes("orvalho") ||
    unitLower.includes("frost") ||
    unitLower.includes("geada") ||
    unitLower.includes("rime") ||
    unitLower.includes("geada_branca") ||
    unitLower.includes("liquid_precipitation") ||
    unitLower.includes("precipitacao_liquida") ||
    unitLower.includes("solid_precipitation") ||
    unitLower.includes("precipitacao_solida") ||
    unitLower.includes("mixed_precipitation") ||
    unitLower.includes("precipitacao_mista")
  ) {
    return {
      Icon: CloudRain,
      iconColor: "text-teal-500",
      badgeColor: "bg-teal-50 ring-teal-200",
      iconBgColor: "bg-teal-100",
    };
  }

  // Energia e Potência Elétrica
  if (
    unitLower.includes("watt") ||
    unitLower.includes("w") ||
    unitLower.includes("energia") ||
    unitLower.includes("energy") ||
    unitLower.includes("power") ||
    unitLower.includes("potencia") ||
    unitLower.includes("electrical_power") ||
    unitLower.includes("potencia_eletrica") ||
    unitLower.includes("electrical_energy") ||
    unitLower.includes("energia_eletrica") ||
    unitLower.includes("kwh") ||
    unitLower.includes("kilowatt_hour") ||
    unitLower.includes("quilowatt_hora") ||
    unitLower.includes("mwh") ||
    unitLower.includes("megawatt_hour") ||
    unitLower.includes("gwh") ||
    unitLower.includes("gigawatt_hour") ||
    unitLower.includes("joule") ||
    unitLower.includes("j") ||
    unitLower.includes("calorie") ||
    unitLower.includes("cal") ||
    unitLower.includes("btu") ||
    unitLower.includes("british_thermal_unit") ||
    unitLower.includes("thermal_energy") ||
    unitLower.includes("energia_termica") ||
    unitLower.includes("heat_energy") ||
    unitLower.includes("energia_calor") ||
    unitLower.includes("electrical_current") ||
    unitLower.includes("corrente_eletrica") ||
    unitLower.includes("ampere") ||
    unitLower.includes("amp") ||
    unitLower.includes("voltage") ||
    unitLower.includes("tensao") ||
    unitLower.includes("volt") ||
    unitLower.includes("v") ||
    unitLower.includes("resistance") ||
    unitLower.includes("resistencia") ||
    unitLower.includes("ohm") ||
    unitLower.includes("frequency") ||
    unitLower.includes("frequencia") ||
    unitLower.includes("hertz") ||
    unitLower.includes("hz")
  ) {
    return {
      Icon: Zap,
      iconColor: "text-orange-500",
      badgeColor: "bg-orange-50 ring-orange-200",
      iconBgColor: "bg-orange-100",
    };
  }

  // Visibilidade e Neblina
  if (
    (unitLower.includes("m") && !unitLower.includes("mm") && !unitLower.includes("cm") && !unitLower.includes("m/s") && !unitLower.includes("w/m") && !unitLower.includes("mol/m")) ||
    unitLower.includes("visibilidade") ||
    unitLower.includes("visibility") ||
    unitLower.includes("horizontal_visibility") ||
    unitLower.includes("visibilidade_horizontal") ||
    unitLower.includes("vertical_visibility") ||
    unitLower.includes("visibilidade_vertical") ||
    unitLower.includes("fog") ||
    unitLower.includes("nevoeiro") ||
    unitLower.includes("mist") ||
    unitLower.includes("neblina") ||
    unitLower.includes("haze") ||
    unitLower.includes("neblina_secura") ||
    unitLower.includes("smog") ||
    unitLower.includes("poluicao") ||
    unitLower.includes("pollution") ||
    unitLower.includes("aerosol") ||
    unitLower.includes("particulate") ||
    unitLower.includes("particulas") ||
    unitLower.includes("pm1") ||
    unitLower.includes("pm2.5") ||
    unitLower.includes("pm10") ||
    unitLower.includes("tsp") ||
    unitLower.includes("total_suspended_particles") ||
    unitLower.includes("particulas_suspensas") ||
    unitLower.includes("optical_depth") ||
    unitLower.includes("profundidade_optica") ||
    unitLower.includes("aod") ||
    unitLower.includes("aerosol_optical_depth") ||
    unitLower.includes("transparency") ||
    unitLower.includes("transparencia") ||
    unitLower.includes("opacity") ||
    unitLower.includes("opacidade") ||
    unitLower.includes("turbidity") ||
    unitLower.includes("turbidez")
  ) {
    return {
      Icon: Eye,
      iconColor: "text-indigo-500",
      badgeColor: "bg-indigo-50 ring-indigo-200",
      iconBgColor: "bg-indigo-100",
    };
  }

  // Altitude e Elevação
  if (
    unitLower.includes("altitude") ||
    unitLower.includes("elevation") ||
    unitLower.includes("elevacao") ||
    unitLower.includes("height") ||
    unitLower.includes("altura") ||
    unitLower.includes("sea_level") ||
    unitLower.includes("nivel_mar") ||
    unitLower.includes("above_sea_level") ||
    unitLower.includes("acima_nivel_mar") ||
    unitLower.includes("asl") ||
    unitLower.includes("msl") ||
    unitLower.includes("mean_sea_level") ||
    unitLower.includes("nivel_mar_medio") ||
    unitLower.includes("geopotential") ||
    unitLower.includes("geopotencial") ||
    unitLower.includes("geopotential_height") ||
    unitLower.includes("altura_geopotencial") ||
    unitLower.includes("pressure_altitude") ||
    unitLower.includes("altitude_pressao") ||
    unitLower.includes("density_altitude") ||
    unitLower.includes("altitude_densidade") ||
    unitLower.includes("true_altitude") ||
    unitLower.includes("altitude_verdadeira") ||
    unitLower.includes("indicated_altitude") ||
    unitLower.includes("altitude_indicada") ||
    unitLower.includes("barometric_altitude") ||
    unitLower.includes("altitude_barometrica") ||
    unitLower.includes("geometric_altitude") ||
    unitLower.includes("altitude_geometrica") ||
    unitLower.includes("orthometric_height") ||
    unitLower.includes("altura_ortometrica") ||
    unitLower.includes("ellipsoidal_height") ||
    unitLower.includes("altura_elipsoidal") ||
    unitLower.includes("topographic") ||
    unitLower.includes("topografico") ||
    unitLower.includes("terrain") ||
    unitLower.includes("terreno") ||
    unitLower.includes("ground_level") ||
    unitLower.includes("nivel_solo") ||
    unitLower.includes("surface_level") ||
    unitLower.includes("nivel_superficie")
  ) {
    return {
      Icon: Mountain,
      iconColor: "text-slate-500",
      badgeColor: "bg-slate-50 ring-slate-200",
      iconBgColor: "bg-slate-100",
    };
  }

  // Qualidade do Ar e Poluição
  if (
    unitLower.includes("air_quality") ||
    unitLower.includes("qualidade_ar") ||
    unitLower.includes("aqi") ||
    unitLower.includes("air_quality_index") ||
    unitLower.includes("indice_qualidade_ar") ||
    unitLower.includes("co") ||
    unitLower.includes("carbon_monoxide") ||
    unitLower.includes("monoxido_carbono") ||
    unitLower.includes("co2") ||
    unitLower.includes("carbon_dioxide") ||
    unitLower.includes("dioxido_carbono") ||
    unitLower.includes("no2") ||
    unitLower.includes("nitrogen_dioxide") ||
    unitLower.includes("dioxido_nitrogenio") ||
    unitLower.includes("no") ||
    unitLower.includes("nitric_oxide") ||
    unitLower.includes("oxido_nitrico") ||
    unitLower.includes("nox") ||
    unitLower.includes("nitrogen_oxides") ||
    unitLower.includes("oxidos_nitrogenio") ||
    unitLower.includes("so2") ||
    unitLower.includes("sulfur_dioxide") ||
    unitLower.includes("dioxido_enxofre") ||
    unitLower.includes("o3") ||
    unitLower.includes("ozone") ||
    unitLower.includes("ozonio") ||
    unitLower.includes("ch4") ||
    unitLower.includes("methane") ||
    unitLower.includes("metano") ||
    unitLower.includes("nh3") ||
    unitLower.includes("ammonia") ||
    unitLower.includes("amonia") ||
    unitLower.includes("h2s") ||
    unitLower.includes("hydrogen_sulfide") ||
    unitLower.includes("sulfeto_hidrogenio") ||
    unitLower.includes("voc") ||
    unitLower.includes("volatile_organic_compounds") ||
    unitLower.includes("compostos_organicos_volateis") ||
    unitLower.includes("benzene") ||
    unitLower.includes("benzeno") ||
    unitLower.includes("toluene") ||
    unitLower.includes("tolueno") ||
    unitLower.includes("xylene") ||
    unitLower.includes("xileno") ||
    unitLower.includes("formaldehyde") ||
    unitLower.includes("formaldeido") ||
    unitLower.includes("acetaldehyde") ||
    unitLower.includes("acetaldeido") ||
    unitLower.includes("particulate_matter") ||
    unitLower.includes("materia_particulada") ||
    unitLower.includes("pm") ||
    unitLower.includes("aerosol") ||
    unitLower.includes("aerosol") ||
    unitLower.includes("dust") ||
    unitLower.includes("poeira") ||
    unitLower.includes("pollen") ||
    unitLower.includes("polen") ||
    unitLower.includes("allergen") ||
    unitLower.includes("alergeno") ||
    unitLower.includes("mold") ||
    unitLower.includes("mofo") ||
    unitLower.includes("spore") ||
    unitLower.includes("esporo") ||
    unitLower.includes("bacteria") ||
    unitLower.includes("bacteria") ||
    unitLower.includes("virus") ||
    unitLower.includes("virus") ||
    unitLower.includes("pathogen") ||
    unitLower.includes("patogeno") ||
    unitLower.includes("toxin") ||
    unitLower.includes("toxina") ||
    unitLower.includes("contaminant") ||
    unitLower.includes("contaminante") ||
    unitLower.includes("pollutant") ||
    unitLower.includes("poluente") ||
    unitLower.includes("emission") ||
    unitLower.includes("emissao") ||
    unitLower.includes("concentration") ||
    unitLower.includes("concentracao") ||
    unitLower.includes("level") ||
    unitLower.includes("nivel") ||
    unitLower.includes("threshold") ||
    unitLower.includes("limite") ||
    unitLower.includes("exposure") ||
    unitLower.includes("exposicao") ||
    unitLower.includes("risk") ||
    unitLower.includes("risco") ||
    unitLower.includes("hazard") ||
    unitLower.includes("perigo") ||
    unitLower.includes("warning") ||
    unitLower.includes("aviso") ||
    unitLower.includes("alert") ||
    unitLower.includes("alerta")
  ) {
    return {
      Icon: AlertTriangle,
      iconColor: "text-amber-500",
      badgeColor: "bg-amber-50 ring-amber-200",
      iconBgColor: "bg-amber-100",
    };
  }

  // Padrão para unidades não reconhecidas
  return {
    Icon: Cloud,
    iconColor: "text-gray-400",
    badgeColor: "bg-gray-50 ring-gray-200",
    iconBgColor: "bg-gray-100",
  };
}

export function getBadgeColorFromUnit(
  unit: string
):
  | "stone"
  | "blue"
  | "sky"
  | "teal"
  | "green"
  | "yellow"
  | "orange"
  | "red"
  | "violet"
  | "purple"
  | "indigo"
  | "amber"
  | "slate"
  | "gray" {
  const unitLower = unit.toLowerCase();

  // Temperatura
  if (
    unitLower.includes("°c") ||
    unitLower.includes("°f") ||
    unitLower.includes("kelvin") ||
    unitLower.includes("celsius") ||
    unitLower.includes("fahrenheit") ||
    unitLower.includes("temp") ||
    unitLower.includes("temperatura") ||
    unitLower.includes("thermal") ||
    unitLower.includes("heat") ||
    unitLower.includes("cold")
  )
    return "red";
  
  // Umidade
  if (
    unitLower.includes("%") ||
    unitLower.includes("umidade") ||
    unitLower.includes("humidity") ||
    unitLower.includes("rh") ||
    unitLower.includes("moisture")
  )
    return "blue";
  
  // Pressão
  if (
    unitLower.includes("hpa") ||
    unitLower.includes("pa") ||
    unitLower.includes("bar") ||
    unitLower.includes("atm") ||
    unitLower.includes("pressure") ||
    unitLower.includes("pressão")
  )
    return "purple";
  
  // Vento
  if (
    unitLower.includes("m/s") ||
    unitLower.includes("km/h") ||
    unitLower.includes("mph") ||
    unitLower.includes("vento") ||
    unitLower.includes("wind") ||
    unitLower.includes("knots")
  )
    return "gray";
  
  // Direção
  if (
    unitLower.includes("°") ||
    unitLower.includes("graus") ||
    unitLower.includes("degrees") ||
    unitLower.includes("direção") ||
    unitLower.includes("direction") ||
    unitLower.includes("compass") ||
    unitLower.includes("bearing")
  )
    return "sky";
  
  // Radiação Solar
  if (
    unitLower.includes("w/m²") ||
    unitLower.includes("w/m2") ||
    unitLower.includes("lux") ||
    unitLower.includes("radiação") ||
    unitLower.includes("radiation") ||
    unitLower.includes("uv") ||
    unitLower.includes("solar")
  )
    return "yellow";
  
  // Precipitação
  if (
    unitLower.includes("mm") ||
    unitLower.includes("cm") ||
    unitLower.includes("precipitação") ||
    unitLower.includes("precipitation") ||
    unitLower.includes("rain") ||
    unitLower.includes("snow") ||
    unitLower.includes("hail")
  )
    return "teal";
  
  // Energia
  if (
    unitLower.includes("watt") ||
    unitLower.includes("w") ||
    unitLower.includes("energia") ||
    unitLower.includes("energy") ||
    unitLower.includes("power") ||
    unitLower.includes("joule") ||
    unitLower.includes("kwh")
  )
    return "orange";
  
  // Visibilidade
  if (
    unitLower.includes("km") ||
    unitLower.includes("visibilidade") ||
    unitLower.includes("visibility") ||
    unitLower.includes("fog") ||
    unitLower.includes("mist")
  )
    return "indigo";
  
  // Altitude
  if (
    unitLower.includes("altitude") ||
    unitLower.includes("elevation") ||
    unitLower.includes("height") ||
    unitLower.includes("sea_level")
  )
    return "slate";
  
  // Qualidade do Ar
  if (
    unitLower.includes("air_quality") ||
    unitLower.includes("qualidade_ar") ||
    unitLower.includes("aqi") ||
    unitLower.includes("co") ||
    unitLower.includes("co2") ||
    unitLower.includes("no2") ||
    unitLower.includes("o3") ||
    unitLower.includes("pm") ||
    unitLower.includes("pollution")
  )
    return "amber";

  return "stone";
}

export function useParameterIcon(unit: string) {
  const iconInfo = useMemo(() => {
    return getParameterIconFromUnit(unit);
  }, [unit]);

  const badgeColor = useMemo(() => {
    return getBadgeColorFromUnit(unit);
  }, [unit]);

  return {
    iconInfo,
    badgeColor,
  };
}
