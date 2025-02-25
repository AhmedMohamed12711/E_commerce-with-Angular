import { Component, WritableSignal, signal } from '@angular/core';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { NgIf } from '@angular/common';
import { brands } from '../../../shared/interface/brands/brand';

@Component({
  selector: 'app-brands',
  imports:[NgIf],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  constructor(private _BrandsService: BrandsService) {}

  brandList: WritableSignal<brands[]> = signal([]);
  selectedBrand: WritableSignal<any | null> = signal(null);
  isModalOpen: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandList.set(res.data);
      }
    });
  }

  openModal(brand: any) {
    this.selectedBrand.set(brand);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
