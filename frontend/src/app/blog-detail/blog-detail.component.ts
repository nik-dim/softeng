import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Blog } from '../blog';
import { BlogDataService } from '../blog-data.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  @Input() blog: Blog;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogDataService,
  ) { }

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.blogService.getBlog(id)
    .subscribe( blog => this.blog = blog );
  }

}
