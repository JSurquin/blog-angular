import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogDataService } from 'src/app/core/services/blog-data.service';
import { IBlog } from 'src/app/core/models/blog.model';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article: IBlog | null = null;

  constructor(
    public appService: BlogDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.appService
      .getById(this.route.snapshot.paramMap.get('id'))
      .subscribe((data) => {
        this.article = data;
      });
  }
}
