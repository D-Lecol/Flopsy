/** Fonction qui retire un écouteur d'événement. */
export type StopListening = () => void;

/** Ajoute un écouteur et renvoie de quoi le retirer : ajout et retrait au même endroit. */
export function listen<E extends Event>(
  target: EventTarget,
  type: string,
  handler: (event: E) => void,
  options?: AddEventListenerOptions,
): StopListening {
  const listener = handler as EventListener;
  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
}
