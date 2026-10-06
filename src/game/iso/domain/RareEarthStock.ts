/** Le stock de terres rares de la planète, en tonnes. */
export class RareEarthStock {
  constructor(private tonnes: number) {}

  canPay(costTonnes: number): boolean {
    return this.tonnes >= costTonnes;
  }

  pay(costTonnes: number): void {
    if (!this.canPay(costTonnes)) throw new Error('Pas assez de terres rares');
    this.tonnes -= costTonnes;
  }

  remaining(): number {
    return this.tonnes;
  }
}
