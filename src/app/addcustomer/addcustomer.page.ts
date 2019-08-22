import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import {Router, ActivatedRoute} from '@angular/router'
import { resolve } from 'path';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.page.html',
  styleUrls: ['./addcustomer.page.scss'],
})
export class AddcustomerPage implements OnInit {

  name_customer: string = "";
  desc_customer: string = "";
  address: string = "";
  email: string = "";
  phone: string = "";
  gender: string = "";
  id: number;

  constructor(
        private postProvider: PostProvider,
        private router: Router,
        private actRoute: ActivatedRoute
        ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.name_customer = data.name;
      this.desc_customer = data.desc;
      this.address = data.address;
      this.email = data.email;
      this.phone = data.phone;
      this.gender = data.gender;
      console.log(data)
    })
  }

  createProses() {
    return new Promise(resolve => {
      let body = {
        action: 'add',
        name_customer : this.name_customer,
        desc_customer : this.desc_customer,
        address : this.address,
        email : this.email,
        phone : this.phone,
        gender : this.gender
      };
      this.postProvider.postData(body, 'api.php').subscribe(data => {
        this.router.navigate(['/customers']);
        this.name_customer = ''
        this.desc_customer = ''
        console.log('Ok')
      });
    });
  }

  updateProses() {
    return new Promise(resolve => {
      let body = {
        action: 'update',
        id: this.id,
        name_customer : this.name_customer,
        desc_customer : this.desc_customer,
        address : this.address,
        email : this.email,
        phone : this.phone,
        gender : this.gender
      };
      this.postProvider.postData(body, 'api.php').subscribe(data => {
        this.router.navigate(['/customers']);
        this.name_customer = ''
        this.desc_customer = ''
        console.log(data)
      });
    });
  }

}
