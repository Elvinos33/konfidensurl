"use client";
import Header from "@/components/Header";
import { ExternalURLForm, InternalURLForm } from "@/components/Forms";
import { useMultistep } from "@/hooks/useMultistep";

export default function UrlAdmin() {
  const { step, nextStep, backStep, isLastStep, isFirstStep } = useMultistep([
    <ExternalURLForm />,
    <ExternalURLForm />,
    <InternalURLForm />,
  ]);

  return (
    <main className="absolute inset-0 bg-konfidens-white overflow-hidden">
      <Header />
      <section className="w-full h-full flex flex-col gap-10 items-center justify-center">
        {step}
        <div className="w-4/5 md:w-3/5 lg:w-2/5  flex justify-between gap-5">
          {!isFirstStep && (
            <button
              onClick={backStep}
              className="bg-konfidens-darkGreen text-konfidens-white flex-1 py-2 rounded-md transition duration-[400ms] hover:brightness-75"
            >
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            className="bg-konfidens-darkGreen text-konfidens-white flex-1 py-2 rounded-md transition duration-[400ms] hover:brightness-75"
          >
            {isLastStep ? "Create" : "Next"}
          </button>
        </div>
      </section>
    </main>
  );
}
