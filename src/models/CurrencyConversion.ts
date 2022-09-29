export class CurrencyConversion {
    private _baseCurrency: string;
    private _conversionAmount: Number;
    private _ratesObject: { [key:string]: Number };

    constructor(baseCurrency?: string) {
        this._baseCurrency = baseCurrency || "USD";
        this._conversionAmount = 0;
        this._ratesObject = {};
    }

    public get baseCurrency() : string {
        return this._baseCurrency;
    }

    public get conversionAmount() : Number {
        return this._conversionAmount;
    }

    public get ratesObject() : { [key:string]: Number } {
        return this._ratesObject;
    }
    
    public set baseCurrency(baseCurrency: string) {
        this._baseCurrency= baseCurrency;
    }

    public set conversionAmount(conversionAmount: Number) {
        this._conversionAmount= conversionAmount;
    }

    public set ratesObject(ratesObject: {}) {
        this._ratesObject= ratesObject;
    }
  
    announce() {
      return `Hi my name is ${this._baseCurrency}`
    }
  }