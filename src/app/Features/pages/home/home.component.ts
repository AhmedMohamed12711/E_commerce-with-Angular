import { Component } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { HomeSlideComponent } from "../home-slide/home-slide.component";
import { CategorySliderComponent } from "../category-slider/category-slider.component";

@Component({
  selector: 'app-home',
  imports: [ProductsComponent, HomeSlideComponent, CategorySliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
