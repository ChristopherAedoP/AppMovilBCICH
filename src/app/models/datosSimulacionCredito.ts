export class datosSimulacionCredito {
  constructor(
    public rutCliente: String,
    public dvCliente: String,
    public nombreCliente: String,
    public apellidoCliente: String,
    public emailCliente: String,
    public valorPropiedadUf: Number,
    public montoCreditoUf: Number,
    public plazo: Number,

    public indDfl2: boolean,
    public renta: Number,
    public comuna: String,
    public region: String,

    public codSeguro: Number = 1,
    public codeudor: boolean = false,
    public codeudorConSeguroDesgravamen: boolean = false,
    public fonoCliente: String = "12345678"
  ) {

  }
}
