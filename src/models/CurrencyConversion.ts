export default class CurrencyConversion {
    private _baseCurrency: string;
    private _conversionAmount: Number;
    private _targetCurrency: string;
    private _ratesObject: { [key:string]: Number };

    constructor(baseCurrency: string, targetCurrency: string, conversionAmount: Number) {
        this._conversionAmount = conversionAmount;
        this._targetCurrency = targetCurrency;
        this._baseCurrency = baseCurrency || "USD";
        this._ratesObject = {};
    }

    public get baseCurrency() : string {
        return this._baseCurrency;
    }

    public get targetCurrency() : string {
        return this._targetCurrency;
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

    public set targetCurrency(targetCurrency: string) {
        this._targetCurrency= targetCurrency;
    }

    public set conversionAmount(conversionAmount: Number) {
        this._conversionAmount= conversionAmount;
    }

    public set ratesObject(ratesObject: {}) {
        this._ratesObject= ratesObject;
    }
  
    convert() : Number {
      return Number(this._conversionAmount) * Number(this._ratesObject[this._targetCurrency]);
    }
  }