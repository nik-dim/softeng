import { Component, OnInit } from '@angular/core';
import { Blog } from '@models/blog';
import { BlogService } from '@services/blog.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogs: Blog[];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.getBlogs();
  }

  private getBlogs() {
    this.blogService.getBlogs()
    .subscribe(data => {
      this.blogs = data.map((blog) => {
        return new Blog(JSON.parse(JSON.stringify(blog)))
      });
      console.log(this.blogs);
    });
  }

}
