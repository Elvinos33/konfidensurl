"use client";
import { ExternalURLForm, InternalURLForm, TimeForm } from "@/components/Forms";
import { useMultistep } from "@/hooks/useMultistep";
import { FormEvent, useState } from "react";
import { newLink, getAllLinks } from "@/lib/links";
import Finish from "@/components/Finish";

type FormData = {
  id: number;
  url: string;
  path: string;
  expires: Date | undefined;
};

const INITIAL_FORM_DATA: FormData = {
  id: 0,
  url: "",
  path: "",
  expires: undefined,
};

export default function CreateLink() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [error, setError] = useState({ isError: false, message: "" });
  function updateFormData(data: Partial<FormData>) {
    setFormData((current) => {
      return { ...current, ...data };
    });
  }

  const {
    currentStep,
    step,
    nextStep,
    backStep,
    isFinishStep,
    isLastStep,
    isFirstStep,
  } = useMultistep([
    <ExternalURLForm {...formData} setFormData={updateFormData} />,
    <InternalURLForm {...formData} setFormData={updateFormData} />,
    <TimeForm {...formData} setFormData={updateFormData} />,
    <Finish url={formData.path} />,
  ]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (currentStep === 1) {
      const response = await getAllLinks();
      console.log(response);
      if (
        response.links.some((link: FormData) => link.path === formData.path)
      ) {
        setError({
          isError: true,
          message: "Path already exists, try another path.",
        });
        return;
      } else {
        setError({ isError: false, message: "" });
      }
    }

    if (!isFinishStep) return nextStep();

    const response = await newLink({ ...formData });

    console.log(response);

    if (response.status === 200) {
      return nextStep();
    }
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
        <div className="flex flex-col w-full items-center gap-2">
          {step}
          {error.isError && (
            <h2 className="text-red-500 font-semibold">{error.message}</h2>
          )}
        </div>

        {!isLastStep && (
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
              {isFinishStep ? "Create" : "Next"}
            </button>
          </div>
        )}
      </form>
    </main>
  );
}
