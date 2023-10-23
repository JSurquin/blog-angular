import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BlogDataService } from 'src/app/core/services/blog-data.service';
import { IBlog } from 'src/app/core/models/blog.model';
import * as postsActions from 'src/app/core/store/actions/posts.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // blogData: IBlog[] | null = null;
  blogData!: Observable<IBlog[]>;
  constructor(public blogService: BlogDataService, private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(postsActions.loadPosts());
    this.blogData = this.store.select((state: any) => state.postsState.posts);
    // this.blogService.getAll().subscribe((blogData) => {
    //   console.log(blogData);
    //   this.blogData = blogData;
    // });
  }
}
