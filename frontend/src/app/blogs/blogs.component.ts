import { Component, OnInit } from '@angular/core';

import { Blog } from '../blog';
import { BlogDataService } from '../blog-data.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogs: Blog[];

  constructor(
    private blogService: BlogDataService
  ) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs()
    .subscribe(blogs => this.blogs = blogs);
  }

}
