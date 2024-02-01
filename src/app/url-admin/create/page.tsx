"use client";
import { ExternalURLForm, InternalURLForm, TimeForm } from "@/components/Forms";
import { useMultistep } from "@/hooks/useMultistep";
import { FormEvent, useState } from "react";
import { newLink } from "@/lib/links";

type FormData = {
  url: string;
  path: string;
  expires: Date | null;
};

const INITIAL_FORM_DATA: FormData = {
  url: "",
  path: "",
  expires: null,
};

export default function CreateLink() {
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

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return nextStep();
    const response = await newLink({ ...formData });
    console.log(response);
  }

  return (
    <main className="absolute inset-0 overflow-hidden">
      <form
        name="Create URL"
        onSubmit={onSubmit}
        className="w-full h-full flex flex-col gap-10 items-center justify-center"
      >
        <h1 className="text-konfidens-green font-serif text-4xl md:text-5xl text-center animate-fade-down">
          Shorten your URL.
        </h1>
        {step}
        <div className="w-4/5 md:w-3/5 lg:w-2/5 flex justify-between gap-5 animate-fade-up">
          {!isFirstStep && (
            <button
              type="button"
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
