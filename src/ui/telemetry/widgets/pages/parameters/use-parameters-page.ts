import { useLocation } from "react-router";
import { useState } from "react";
import type { ParameterDto } from "@/core/dtos/Parameter-dto";

// ‼️‼️‼️‼️ ESSA PAGINA ESTA MOCKADA APENAS POR DEMONSTRAÇÃO, NADA DISSO VAI ESTAR AQUI.

const mockParameters: ParameterDto[] = [
  {
    id: "1",
    name: "Temperatura do Ar",
    unitOfMeasure: "°C",
    factor: 0.1,
    offset: -40.0,
    isActive: true,
    numberOfDecimalPlaces: 1,
    createdAt: new Date(),
  },
  {
    id: "2",  
    name: "Umidade Relativa",
    unitOfMeasure: "%",
    factor: 0.1,
    offset: 0.0,
    isActive: true,
    numberOfDecimalPlaces: 1,
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Pressão Atmosférica",
    unitOfMeasure: "hPa",
    factor: 0.1,
    offset: 300.0,
    isActive: true,
    numberOfDecimalPlaces: 1,
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Velocidade do Vento",
    unitOfMeasure: "m/s",
    factor: 0.1,
    offset: 0.0,
    isActive: false,
    numberOfDecimalPlaces: 1,
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "Direção do Vento",
    unitOfMeasure: "°",
    factor: 1.0,
    offset: 0.0,
    isActive: true,
    numberOfDecimalPlaces: 1,
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "Radiação Solar",
    unitOfMeasure: "W/m²",
    factor: 1.0,
    offset: 0.0,
    isActive: true,
    numberOfDecimalPlaces: 1,
    createdAt: new Date(),
  },
  {
    id: "7",
    name: "Precipitação",
    unitOfMeasure: "mm",
    factor: 0.1,
    offset: 0.0,
    isActive: false,
    numberOfDecimalPlaces: 1,
    createdAt: new Date(),
  },
  {
    id: "8",
    name: "Índice UV",
    unitOfMeasure: "índice",
    factor: 0.1,
    offset: 0.0,
    isActive: true,
    numberOfDecimalPlaces: 1,
    createdAt: new Date(),
  },
];

export type ParametersPageProps = {
  items: ParameterDto[];
  nextCursor: string | null;
  prevCursor: string | null;
  limit: number;
  q: string;
  isActive: string;
};

export function useParametersPage() {
  const { search } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = new URLSearchParams(search);
  const q = searchParams.get("q") || "";
  const isActive = searchParams.get("isActive") || "all";
  const limit = parseInt(searchParams.get("limit") || "10");
  const cursor = searchParams.get("cursor");

  const filteredItems = mockParameters.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(q.toLowerCase());
    const matchesisActive =
      isActive === "all" ||
      (isActive === "active" && item.isActive === true) ||
      (isActive === "inactive" && item.isActive === false);
    return matchesName && matchesisActive;
  });

  const startIndex = cursor ? parseInt(cursor) : 0;
  const endIndex = startIndex + limit;
  const items = filteredItems.slice(startIndex, endIndex);
  const nextCursor = endIndex < filteredItems.length ? String(endIndex) : null;
  const prevCursor =
    startIndex > 0 ? String(Math.max(0, startIndex - limit)) : null;

  function handleView(id: string) {
    console.log("Visualizar parâmetro:", id);
  };

  function handleEdit(id: string) {
    console.log("Editar parâmetro:", id);
  };

  function handleToggleisActive(id: string) {
    console.log("Alternar isActive do parâmetro:", id);
  };

  function handleNewParameter() {
    setIsModalOpen(true);
  };

  function handleCloseModal() {
    setIsModalOpen(false);
  };

  return {
    items,
    nextCursor,
    prevCursor,
    limit,
    q,
    isActive,
    searchParams,
    isModalOpen,
    onView: handleView,
    onEdit: handleEdit,
    onToggleisActive: handleToggleisActive,
    onNewParameter: handleNewParameter,
    onCloseModal: handleCloseModal,
  };
}
