type Handler<T> = (payload: T) => void;

/** Petit émetteur d'événements typé. `on` renvoie la fonction de désabonnement. */
export class Emitter<Events> {
  private readonly handlers: {
    [Name in keyof Events]?: Set<Handler<Events[Name]>>;
  } = {};

  on<Name extends keyof Events>(name: Name, handler: Handler<Events[Name]>): () => void {
    const handlers = this.handlers[name] ?? (this.handlers[name] = new Set());
    handlers.add(handler);
    return () => handlers.delete(handler);
  }

  emit<Name extends keyof Events>(name: Name, payload: Events[Name]): void {
    this.handlers[name]?.forEach((handler) => handler(payload));
  }
}
