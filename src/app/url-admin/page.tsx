"use client";
import Header from "@/components/Header";
import { ExternalURLForm, InternalURLForm, TimeForm } from "@/components/Forms";
import { useMultistep } from "@/hooks/useMultistep";
import { FormEvent, useState, useEffect } from "react";

type FormData = {
  url: string;
  path: string;
  time: number;
};

const INITIAL_FORM_DATA: FormData = {
  url: "",
  path: "",
  time: 0,
};

export default function UrlAdmin() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  function updateFormData(data: Partial<FormData>) {
    setFormData((current) => {
      return { ...current, ...data };
    });
  }

  const { step, nextStep, backStep, isLastStep, isFirstStep } = useMultistep([
    <ExternalURLForm {...formData} setFormData={updateFormData} />,
    <InternalURLForm {...formData} setFormData={updateFormData} />,
    <TimeForm {...formData} setFormData={updateFormData} />,
  ]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return nextStep();
    alert("Successful Link Creation!");
  }

  return (
    <main className="absolute inset-0 bg-konfidens-white overflow-hidden">
      <Header />
      <form
        onSubmit={onSubmit}
        className="w-full h-full flex flex-col gap-10 items-center justify-center"
      >
        <h1 className="text-konfidens-green font-serif text-5xl">
          Shorten your URL.
        </h1>
        {step}
        <div className="w-4/5 md:w-3/5 lg:w-2/5 flex justify-between gap-5 animate-fade-up">
          {!isFirstStep && (
            <button
              onClick={backStep}
              className="bg-konfidens-darkGreen text-konfidens-white flex-1 py-2 rounded-md transition duration-[400ms] hover:brightness-75"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="bg-konfidens-darkGreen text-konfidens-white flex-1 py-2 rounded-md transition duration-[400ms] hover:brightness-75"
          >
            {isLastStep ? "Create" : "Next"}
          </button>
        </div>
      </form>
    </main>
  );
}
