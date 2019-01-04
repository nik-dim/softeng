import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '@services/blog.service';
import { Blog } from '@models/blog';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.scss']
})
export class BlogAddComponent implements OnInit {

  messageForm: FormGroup;
  blog: Blog;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.messageForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if ( this.messageForm.invalid ) {
      return;
    }
    this.blog = new Blog(this.messageForm.value);
    this.blogService.addBlog(this.blog)
    .subscribe( data => {
      this.router.navigate(['blogs'])
    } );
  }

  ngOnInit() {
    
  }

}
