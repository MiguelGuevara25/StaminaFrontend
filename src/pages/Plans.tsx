import { usePlansStore } from "@/store/plans.store";
import { useEffect } from "react";

const Plans = () => {
  const { plans, loading, fetchPlans } = usePlansStore();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  if (loading)
    return <p className="text-white p-10">Cargando planes de Stamina...</p>;

  return (
    <div className="p-6 bg-[#121212] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-stamina-lime">
        Planes Disponibles
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-[#2A2A2A] p-6 rounded-lg border border-gray-700"
          >
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="text-2xl text-stamina-lime font-black mt-2">
              S/ {plan.price}
            </p>
            <p className="text-gray-400 mt-1">
              Duración: {plan.durationDays} días
            </p>
            <button className="mt-4 w-full bg-stamina-lime text-black font-bold py-2 rounded">
              Editar Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
