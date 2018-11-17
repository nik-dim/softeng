import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Blog } from '../blog';
import { BlogDataService } from '../blog-data.service';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.scss']
})
export class BlogAddComponent implements OnInit {

  messageForm: FormGroup;
  blog: Blog = new Blog();

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogDataService,
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
    console.log('valid');
    this.blog.title = this.messageForm.controls.title.value;
    this.blog.content = this.messageForm.controls.content.value;
    console.log(this.blog.title);
    console.log(this.blog.content);
    this.blogService.addBlog(this.blog)
    .subscribe( data => {
      this.router.navigate(['blogs'])
    } );
  }

  ngOnInit() {
    
  }

}
