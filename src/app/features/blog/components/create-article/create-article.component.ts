import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlogDataService } from 'src/app/core/services/blog-data.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent {
  formArticle!: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogDataService) {
    this.formArticle = this.fb.group({
      title: '',
      content: '',
    });
  }

  create(): void {
    this.blogService
      .createArticle(this.formArticle.value)
      .subscribe((article) => {
        this.blogService
          .getById(article.id.toString())
          .subscribe((article) => console.log('mon article', article));
      });
  }
}
