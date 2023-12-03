import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useEchoStore = create(
  devtools((set) => ({
    laravelEcho: null,
    setLaravelEcho: (e) => set(() => ({ laravelEcho: e })),
  }))
);

export default useEchoStore;
