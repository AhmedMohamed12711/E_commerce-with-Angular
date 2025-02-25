import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { Category } from '../../../shared/interface/category/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor, NgIf } from '@angular/common';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule, NgFor,NgIf],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit {

  CategoryList: Category[] = [];
  isLoading: boolean = true;
  errorMsg: string = '';

  constructor(private categoryService: CategoryService) {}

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe({
      next: (res) => {
        this.CategoryList = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMsg = 'Failed to load categories!';
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true, // ✅ تفعيل السحب بالماوس
    touchDrag: true, // ✅ تفعيل السحب باللمس
    pullDrag: true, 
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  };

}
