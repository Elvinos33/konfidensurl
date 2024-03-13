import { useState } from "react";
import { login } from "@/lib/login";
import { useRouter } from "next/navigation";

type UrlData = {
  url: string;
  path: string;
  expires: number | null;
};

type LoginResponse = {
  status: number;
  token: string;
  user: string;
};

type FormProps = UrlData & {
  setFormData: (form: Partial<UrlData>) => void;
};

export function ExternalURLForm({ url, setFormData }: FormProps) {
  return (
    <div className="w-4/5 md:w-3/5 lg:w-2/5 space-y-5 animate-fade-down">
      <h1 className="text-xl md:text-2xl font-serif text-center">
        Where would you like to redirect to?
      </h1>
      <div className="w-full flex flex-col gap-4 items-center justify-center h-10">
        <input
          required
          value={url}
          onChange={(e) => setFormData({ url: e.target.value })}
          className="w-full h-full outline outline-1 outline-neutral-300 transition-all ease-linear duration-[100ms] hover:shadow-sm hover:outline-neutral-600 focus:outline-black focus:outline-2 rounded-md px-2"
          placeholder="Your URL..."
          type="url"
        />
      </div>
    </div>
  );
}

export function InternalURLForm({ path, setFormData }: FormProps) {
  return (
    <div className="w-4/5 md:w-3/5 lg:w-2/5 space-y-5 animate-fade-up">
      <h1 className="text-xl md:text-2xl font-serif text-center">
        Where would you like to redirect from?
      </h1>
      <div className="w-full flex flex-col gap-4 items-center justify-center h-10">
        <input
          value={path}
          onChange={(e) => setFormData({ path: e.target.value })}
          className="w-full h-full outline outline-1 outline-neutral-300 transition-all ease-linear duration-[100ms] hover:shadow-sm hover:outline-neutral-600 focus:outline-black focus:outline-2 rounded-md px-2"
          placeholder="Endpoint..."
          type="text"
        />
      </div>
    </div>
  );
}

export function TimeForm({ setFormData }: FormProps) {
  const [selectedTime, setSelectedTime] = useState("Forever");

  function convertTime(metric: string, value: number) {
    switch (metric) {
      case "Minutes":
        return value * 60000;
      case "Hours":
        return value * 3600000;
      case "Days":
        return value * 86400000;
      case "Years":
        return value * 31536000000;
    }
  }

  return (
    <div className="w-4/5 md:w-3/5 lg:w-2/5 space-y-5 animate-fade-down">
      <h1 className="text-xl md:text-2xl font-serif text-center">
        How long would you like the URL to last?
      </h1>
      <div className="w-full flex items-center justify-center h-10">
        <select
          name="Time Metric"
          id="Time Select"
          className="bg-white text-neutral-600 h-full outline outline-1 outline-neutral-300 transition-all ease-linear duration-[100ms] hover:shadow-sm hover:outline-neutral-600 rounded-l-md px-2"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="Minutes">Minutes</option>
          <option value="Hours">Days</option>
          <option value="Days">Days</option>
          <option value="Years">Years</option>
          <option value="Forever">Forever</option>
        </select>
        <input
          required
          onChange={(e) =>
            setFormData({
              expires: convertTime(selectedTime, Number(e.target.value)),
            })
          }
          className="disabled:brightness-90 disabled:cursor-not-allowed z-10 w-full h-full outline outline-1 outline-neutral-400 transition-all ease-linear duration-[100ms] hover:shadow-sm hover:outline-neutral-600 focus:outline-black focus:outline-2 rounded-r-md px-2"
          disabled={selectedTime === "Forever"}
          placeholder="Time..."
          type="number"
          min={0}
        />
      </div>
    </div>
  );
}

export function LoginForm() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const router = useRouter();

  async function handleLogin() {
    console.log("Logging in...");
    const loginResponse: LoginResponse = await login(
      loginData.username,
      loginData.password,
    );
    console.log(loginResponse);
    if (loginResponse.token) {
      router.push("/url/admin");
    }
  }

  return (
    <form
      className="flex flex-col gap-4 border border-neutral-300 p-4 rounded-md bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <h2 className="w-full text-center text-xl font-semibold">
        Log in as Admin
      </h2>
      <div>
        <label htmlFor="" className="text-sm mb-1">
          Username
        </label>
        <input
          type="text"
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
          placeholder="Username..."
          className="w-full h-full outline outline-1 outline-neutral-300 transition-all ease-linear duration-[100ms] hover:shadow-sm hover:outline-neutral-600 focus:outline-black focus:outline-2 rounded-md p-2"
        />{" "}
      </div>
      <div>
        <label htmlFor="" className="text-sm bb-1">
          Password
        </label>
        <input
          type="password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          placeholder="Password..."
          className="w-full h-full outline outline-1 outline-neutral-300 transition-all ease-linear duration-[100ms] hover:shadow-sm hover:outline-neutral-600 focus:outline-black focus:outline-2 rounded-md p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-konfidens-darkGreen text-white p-2 rounded-md transition hover:scale-105 hover:brightness-95"
      >
        Log in
      </button>
    </form>
  );
}
