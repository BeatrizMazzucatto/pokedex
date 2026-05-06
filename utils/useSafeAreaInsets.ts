import { useState, useEffect } from "react";

type SafeAreaInsets = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

/**
 * Equivalente web do useSafeAreaInsets do react-native-safe-area-context.
 * Lê as variáveis CSS env(safe-area-inset-*) que são preenchidas pelo
 * navegador em dispositivos com notch, Dynamic Island, barra de status, etc.
 */
export function useSafeAreaInsets(): SafeAreaInsets {
  const [insets, setInsets] = useState<SafeAreaInsets>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    // Cria um elemento temporário para ler os valores computados das env vars
    const el = document.createElement("div");
    el.style.cssText = `
      position: fixed;
      top: env(safe-area-inset-top, 0px);
      right: env(safe-area-inset-right, 0px);
      bottom: env(safe-area-inset-bottom, 0px);
      left: env(safe-area-inset-left, 0px);
      pointer-events: none;
      visibility: hidden;
    `;
    document.body.appendChild(el);

    const computed = getComputedStyle(el);
    setInsets({
      top: parseFloat(computed.top) || 0,
      right: parseFloat(computed.right) || 0,
      bottom: parseFloat(computed.bottom) || 0,
      left: parseFloat(computed.left) || 0,
    });

    document.body.removeChild(el);
  }, []);

  return insets;
}