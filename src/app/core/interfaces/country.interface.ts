export interface ICountryV2 {
  name: string;
  alpha3Code: string;
  borders: Array<string>;
  independent: boolean;
}

export interface ICountryV3 {
  name: ICountryName;
  cca3: string;
  borders: Array<string>;
  altSpellings: string[];
}

export interface ICountryName {
  common: string;
  official: string;
  nativeName: { [key: string]: ICountryNativeName };
}

export interface ICountryNativeName {
  official: string;
  common: string;
}
