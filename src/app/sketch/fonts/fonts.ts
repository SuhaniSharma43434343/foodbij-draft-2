// Font trial loaders (W1.1). All candidate families exist in next/font/google; no substitutions.
import { Bodoni_Moda, Cormorant, Fraunces, Hanken_Grotesk, Instrument_Serif, Jost } from "next/font/google";

export const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  axes: ["opsz"],
  style: ["normal", "italic"],
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const cormorant = Cormorant({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});

export const jost = Jost({ subsets: ["latin"], display: "swap", weight: ["400", "500"] });

export const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"], display: "swap", weight: ["400", "500"] });
