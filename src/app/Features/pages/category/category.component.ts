import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { Category } from '../../../shared/interface/products/products';
import { subCate } from '../../../shared/interface/category/category';

@Component({
  selector: 'app-category',
  imports: [],
templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{
  constructor(private _CategoryService:CategoryService){}

  CategoryList:WritableSignal<Category[]> = signal([]);
  subCategory:WritableSignal<subCate[]>=signal([]);
  selectedCategoryName: WritableSignal<string> = signal('')

  ngOnInit(): void {
    this.getAllCategory();

  }

  getAllCategory(){
    this._CategoryService.getAllCategory().subscribe({
      next:(res)=>{
        this.CategoryList.set(res.data)
      }
    })
  }

  getSubcategory(categoryId: string){
    this._CategoryService.getAllSubcategoryOncategory(categoryId).subscribe({
      next:(res)=>{
        this.subCategory.set(res.data);
      }
    })
  }
  selectCategory(category: Category) {
    this.getSubcategory(category._id);
    this.selectedCategoryName.set(category.name); 
  }
  
  
}
