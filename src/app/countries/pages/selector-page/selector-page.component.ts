import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { count, switchMap, tap } from 'rxjs';
import { ICountryV2 } from 'src/app/core/interfaces/country.interface';
import { CountryService } from 'src/app/core/services/country.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css'],
})
export class SelectorPageComponent implements OnInit {
  loading: boolean = false;

  selectorForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    frontier: ['', [Validators.required]],
  });

  // Fill selectors
  regions: Array<string> = [];
  countries: Array<ICountryV2> = [];
  frontiers: Array<string> = [];
  frontierCountries: Array<ICountryV2> = [];

  constructor(
    private fb: FormBuilder,
    private countriesService: CountryService
  ) {}

  ngOnInit(): void {
    this.regions = this.countriesService.regions;

    this.selectorForm.controls['region']?.valueChanges
      .pipe(
        tap((region) => {
          this.selectorForm.get('country')?.reset('');
          this.loading = true;
        }),
        switchMap((region) =>
          this.countriesService.getCountriesByRegion<ICountryV2>(
            region,
            'name,alpha3Code,borders'
          )
        )
      )
      .subscribe((countries) => {
        this.countries = countries;
        this.loading = false;
      });

    this.selectorForm.controls['country']?.valueChanges
      .pipe(
        tap((country) => {
          this.selectorForm.get('frontier')?.reset('');
          this.loading = true;
        }),
        switchMap((country) =>
          this.countriesService.getFrontierCountriesByCountry<ICountryV2>(
            country,
            'name,alpha3Code,borders'
          )
        ),
        switchMap((country) =>
          this.countriesService.getCountriesByCode(
            country[0]?.borders,
            'name,alpha3Code'
          )
        )
      )
      .subscribe((countries) => {
        console.log(countries);
        this.frontierCountries = countries || [];
        this.loading = false;
      });
  }

  saveRegion() {}
}
